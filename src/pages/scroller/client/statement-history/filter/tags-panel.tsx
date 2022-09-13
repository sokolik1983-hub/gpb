import React, { useCallback, useContext } from 'react';
import { TagsPanelView } from 'components';
import type { ITagsPanelProps } from 'interfaces/client';
import { useForm, useFormState } from 'react-final-form';
import { DATE_PERIOD_OPTIONS } from 'stream-constants';
import { STATUS_LABELS } from 'stream-constants/client';
import { orderTags } from 'utils';
import { Gap } from '@platform/ui';
import { HistoryScrollerContext } from '../history-scroller-context';
import { FIELDS_WITH_TAGS, FORM_FIELDS } from './constants';
import type { IFormState } from './interfaces';

/**
 * Возвращает новые значения формы фильтрации, где будут удалены значения, которые отображаются на форме.
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
  const { change, restart, submit } = useForm();
  const { valid, values } = useFormState<IFormState>();

  const {
    filterPanel: { opened },
    tagsPanel: { onClick: expandAdditionalFilters, tags },
  } = useContext(HistoryScrollerContext);

  const tagValueFormatter = (name: keyof IFormState, formValues: IFormState): string[] | string => {
    const value = formValues[name];

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

  /** Действие над открытой панелью. */
  const actionPanelReOpening = useCallback(() => {
    // В хуке useFilter, после обновления стейта, чтобы избежать закрытия формы на UI, вызывается открытие формы.
    if (opened) {
      expandAdditionalFilters();
    }
  }, [expandAdditionalFilters, opened]);

  /** Сброс всех полей. */
  const handleRemoveAllTags = useCallback(() => {
    const newValues = { ...getValuesAfterResetTags(values, FIELDS_WITH_TAGS), ...defaultAdditionalFilterValues };

    restart(newValues);

    if (valid) {
      // Логичнее было использование onRemoveAllTags, но внутри себя он вызывает onOk({}).
      // onOk({}) сбрасывает и основной фильтр, в результате чего запрос уходит с пустым значением фильтра.
      // onOk - это submit формы.
      void submit();

      actionPanelReOpening();
    }
  }, [actionPanelReOpening, defaultAdditionalFilterValues, restart, submit, valid, values]);

  /**
   * Сброс одного поля по имени.
   *
   * @param name - Имя поля.
   */
  const handleRemoveTag = useCallback(
    (name: string) => {
      change(name, defaultAdditionalFilterValues[name]);

      if (valid) {
        // Логичнее было использование onRemoveTag, но внутри себя он вызывает onOk. onOk - это submit формы.
        void submit();

        actionPanelReOpening();
      }
    },
    [actionPanelReOpening, change, defaultAdditionalFilterValues, submit, valid]
  );

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
        onRemoveTags={handleRemoveAllTags}
        onTagClick={expandAdditionalFilters}
      />
    </>
  );
};

TagsPanel.displayName = 'TagsPanel';
