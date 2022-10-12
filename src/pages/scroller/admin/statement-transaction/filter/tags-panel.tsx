import React, { useContext, useMemo } from 'react';
import { TagsPanelView } from 'components/common';
import { useFilterTags } from 'hooks/common';
import type { ITagsPanelProps } from 'interfaces';
import { useFormState } from 'react-final-form';
import { TRANSACTION_TYPE_LABELS } from 'stream-constants';
import { orderTags, stringifyCounterparty } from 'utils/common';
import { DATE_FORMAT } from '@platform/services/client';
import { formatDateTime } from '@platform/tools/date-time';
import { Gap } from '@platform/ui';
import { FIELDS_WITH_TAGS, FORM_FIELDS } from './constants';
import type { IFilterContext } from './filter-context';
import { FilterContext } from './filter-context';
import type { IFormState } from './interfaces';

/** Панель тегов фильтра. */
export const TagsPanel: React.FC<ITagsPanelProps> = ({ defaultAdditionalFilterValues, onChangeVisibleAdditionalFilter }) => {
  const { valid, values: formValues } = useFormState<IFormState>();

  const {
    counterparties,
    filterPanel: { values: storageValues },
    tagsPanel: { tags },
  } = useContext<IFilterContext>(FilterContext);

  const values = valid ? storageValues : formValues;

  const counterpartyNameById = useMemo(
    () =>
      counterparties.reduce((acc, item) => {
        const { name } = item;

        acc[stringifyCounterparty(item)] = name;

        return acc;
      }, {}),
    [counterparties]
  );

  const tagValueFormatter = (name: keyof IFormState, formState: IFormState): string[] | string => {
    const value = formState[name];

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

  const { onOpenAdditionalFilter, onRemoveTag, onRemoveAllTags } = useFilterTags<IFormState>({
    defaultAdditionalFilterValues,
    fieldsWithTags: FIELDS_WITH_TAGS,
    onChangeVisibleAdditionalFilter,
    values,
  });

  if (preparedTags.length === 0) {
    return null;
  }

  return (
    <>
      <Gap.SM />
      <TagsPanelView<IFormState>
        tagValueFormatter={tagValueFormatter}
        tags={preparedTags}
        values={values}
        onRemoveTag={onRemoveTag}
        onRemoveTags={onRemoveAllTags}
        onTagClick={onOpenAdditionalFilter}
      />
    </>
  );
};

TagsPanel.displayName = 'TagsPanel';
