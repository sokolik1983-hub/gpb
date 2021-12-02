import React, { useContext } from 'react';
import { TagsPanelView } from 'components';
import { locale } from 'localization';
import { useForm, useFormState } from 'react-final-form';
import { DATE_PERIOD_OPTIONS } from 'stream-constants';
import { STATUS_LABELS } from 'stream-constants/client/statuses';
import { orderTags } from 'utils';
import { Gap } from '@platform/ui';
import { HistoryScrollerContext } from '../history-scroller-context';
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
export const TagsPanel = () => {
  const { restart } = useForm();

  const { values } = useFormState<IFormState>();

  const {
    filterPanel: { onOk },
    tagsPanel: { onClick: expandAdditionalFilters, tags, onRemoveTag },
  } = useContext(HistoryScrollerContext);

  const tagValueFormatter = (name: string, formValues: IFormState) => {
    const value = formValues[name];

    switch (name) {
      case FORM_FIELDS.DATE_PERIOD:
        return DATE_PERIOD_OPTIONS.find(item => item.value === value)?.label;
      case FORM_FIELDS.STATUS:
        return STATUS_LABELS[value];
      case FORM_FIELDS.SIGNATURE_PRESENCE:
        return locale.historyScroller.tags.values.signaturePresence.yes;
      default:
        return value;
    }
  };

  const preparedTags = orderTags(tags, FIELDS_WITH_TAGS).filter(
    // Для чекбоксов, в значении false теги не отображаются.
    tag => values[tag.value] !== false
  );

  const resetFilters = () => {
    const newValues = getValuesAfterResetTags(values, FIELDS_WITH_TAGS);

    restart(newValues);
    onOk(newValues);
    // В хуке useFilter, после обновления стейта,
    // чтобы избежать закрытия формы на UI, вызывается открытие формы.
    expandAdditionalFilters();
  };

  const handleRemoveTag = (name: string) => {
    onRemoveTag(name);
    // В хуке useFilter, после удаления тега форма закрывается,
    // чтобы избежать закрытия формы на UI, вызывается открытие формы.
    expandAdditionalFilters();
  };

  if (preparedTags.length === 0) {
    return null;
  }

  return (
    <>
      <Gap.SM />
      <TagsPanelView<IFormState>
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
