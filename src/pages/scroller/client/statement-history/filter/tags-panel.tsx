import React, { useContext } from 'react';
import { TagsPanelView } from 'components/common';
import { useFilterTags } from 'hooks';
import type { ITagsPanelProps } from 'interfaces/client';
import { useFormState } from 'react-final-form';
import { DATE_PERIOD_OPTIONS } from 'stream-constants';
import { STATUS_LABELS } from 'stream-constants/client';
import { orderTags } from 'utils';
import { Gap } from '@platform/ui';
import { HistoryScrollerContext } from '../history-scroller-context';
import { FIELDS_WITH_TAGS, FORM_FIELDS } from './constants';
import type { IFormState } from './interfaces';

/** Панель тегов фильтра. */
export const TagsPanel: React.FC<ITagsPanelProps> = ({ defaultAdditionalFilterValues, onChangeVisibleAdditionalFilter }) => {
  const { valid, values: formValues } = useFormState<IFormState>();

  const {
    filterPanel: { values: storageValues },
    tagsPanel: { tags },
  } = useContext(HistoryScrollerContext);

  const values = valid ? storageValues : formValues;

  const tagValueFormatter = (name: keyof IFormState, formState: IFormState): string[] | string => {
    const value = formState[name];

    switch (name) {
      case FORM_FIELDS.PERIOD_TYPE:
        return DATE_PERIOD_OPTIONS.find(item => item.value === value)!.label;
      case FORM_FIELDS.STATUS:
        return STATUS_LABELS[value as string];
      case FORM_FIELDS.SIGNED:
        return '';
      default:
        return value as string[] | string;
    }
  };

  const preparedTags = orderTags(tags, FIELDS_WITH_TAGS).filter(tag => Boolean(values[tag.value]));

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
