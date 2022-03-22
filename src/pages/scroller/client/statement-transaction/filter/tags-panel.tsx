import React, { useContext, useMemo } from 'react';
import { TagsPanelView } from 'components';
import type { ITagsPanelProps } from 'interfaces/client';
import { useForm, useFormState } from 'react-final-form';
import { TRANSACTION_TYPE_LABELS } from 'stream-constants';
import { orderTags, stringifyCounterparty } from 'utils';
import { DATE_FORMAT } from '@platform/services/client';
import { formatDateTime } from '@platform/tools/date-time';
import { Gap } from '@platform/ui';
import type { ITransactionScrollerContext } from '../transaction-scroller-context';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import { FIELDS_WITH_TAGS, FORM_FIELDS } from './constants';
import type { IFormState } from './interfaces';

/**
 * Возвращает новые значения формы фильтрации, в которых будут удалены значения для тех полей,
 * теги для которых отображаются на форме.
 *
 * @param values - Значения формы.
 * @param fieldsWithTags - Массив, с именами полей для которых отображаются тэги.
 */
const getValuesAfterResetTags = (values: IFormState, fieldsWithTags: string[]) => {
  const newValues = { ...values };

  fieldsWithTags.forEach(item => {
    newValues[item] = undefined;
  });

  return newValues;
};

/** Панель тегов фильтра. */
export const TagsPanel: React.FC<ITagsPanelProps> = ({ defaultAdditionalFilterValues }) => {
  const { restart } = useForm();

  const { counterparties } = useContext<ITransactionScrollerContext>(TransactionScrollerContext);

  const { values } = useFormState<IFormState>();

  const counterpartyNameById = useMemo(
    () =>
      counterparties.reduce((acc, item) => {
        const { name } = item;

        acc[stringifyCounterparty(item)] = name;

        return acc;
      }, {}),
    [counterparties]
  );

  const {
    filterPanel: { onOk, opened },
    tagsPanel: { onClick: expandAdditionalFilters, tags, onRemoveTag },
  } = useContext<ITransactionScrollerContext>(TransactionScrollerContext);

  const tagValueFormatter = (name: keyof IFormState, formValues: IFormState): string[] | string => {
    const value = formValues[name];

    switch (name) {
      case FORM_FIELDS.PAYMENT_DATE_FROM:
      case FORM_FIELDS.PAYMENT_DATE_TO:
        return formatDateTime(value as string, { keepLocalTime: true, format: DATE_FORMAT });
      case FORM_FIELDS.TRANSACTION_TYPE:
        return TRANSACTION_TYPE_LABELS[value as string];
      case FORM_FIELDS.COUNTERPARTY:
        return (value as string[]).map(item => counterpartyNameById[item]);
      default:
        return value!;
    }
  };

  const preparedTags = orderTags(tags, FIELDS_WITH_TAGS).filter(tag => {
    const value = values[tag.value];

    if (Array.isArray(value) && value.length === 0) {
      return false;
    }

    return Boolean(value);
  });

  const resetFilters = () => {
    const newValues = { ...getValuesAfterResetTags(values, FIELDS_WITH_TAGS), ...defaultAdditionalFilterValues };

    restart(newValues);
    onOk(newValues);

    // В хуке useFilter, после обновления стейта,
    // чтобы избежать закрытия формы на UI, вызывается открытие формы.
    if (opened) {
      expandAdditionalFilters();
    }
  };

  const handleRemoveTag = (name: string) => {
    onRemoveTag(name);

    // В хуке useFilter, после удаления тега форма закрывается,
    // чтобы избежать закрытия формы на UI, вызывается открытие формы.
    if (opened) {
      expandAdditionalFilters();
    }
  };

  if (preparedTags.length === 0) {
    return null;
  }

  return (
    <>
      <Gap.SM />
      <TagsPanelView
        tagValueFormatter={tagValueFormatter}
        tags={preparedTags}
        onRemoveTag={handleRemoveTag}
        onRemoveTags={resetFilters}
        onTagClick={expandAdditionalFilters}
      />
    </>
  );
};

TagsPanel.displayName = 'TagsPanel';
