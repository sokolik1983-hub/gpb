import React, { useContext, useMemo } from 'react';
import { TagsPanelView } from 'components/common';
import { useFilterTags } from 'hooks/common';
import type { ITagsPanelProps } from 'interfaces';
import { useFormState } from 'react-final-form';
import { TRANSACTION_TYPE_LABELS } from 'stream-constants';
import { CHANGED_ENTRIES_STATUS_LABEL } from 'stream-constants/admin';
import { orderTags, stringifyCounterparty } from 'utils/common';
import { DATE_FORMAT } from '@platform/services/client';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
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
    clients,
    filterPanel: { values: storageValues },
    tagsPanel: { tags },
  } = useContext<IFilterContext>(FilterContext);

  const values = valid ? storageValues : formValues;

  const organizationNameReducer = (acc, item) => {
    const { name } = item;

    acc[stringifyCounterparty(item)] = name;

    return acc;
  };

  const counterpartyNameById = useMemo(() => counterparties.reduce(organizationNameReducer, {}), [counterparties]);

  const clientNameById = useMemo(() => clients.reduce(organizationNameReducer, {}), [clients]);

  const tagValueFormatter = (name: keyof IFormState, formState: IFormState): string[] | string => {
    const value = formState[name];

    switch (name) {
      case FORM_FIELDS.PAYMENT_DATE_FROM:
      case FORM_FIELDS.PAYMENT_DATE_TO:
        return formatDateTime(value as string, { keepLocalTime: true, format: DATE_FORMAT });
      case FORM_FIELDS.TRANSACTION_TYPE:
        return TRANSACTION_TYPE_LABELS[value as string];
      case FORM_FIELDS.STATUS:
        return CHANGED_ENTRIES_STATUS_LABEL[value as string];
      case FORM_FIELDS.COUNTERPARTY:
        return (value as string[]).map(item => counterpartyNameById[item]);
      case FORM_FIELDS.CLIENT:
        return (value as string[]).map(item => clientNameById[item]);
      case FORM_FIELDS.COUNTERPARTY_ACCOUNT:
      case FORM_FIELDS.CLIENT_ACCOUNT:
        return (value as string[]).map(item => formatAccountCode(item));
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
