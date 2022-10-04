import { useCallback, useMemo } from 'react';
import { useForm, useFormState } from 'react-final-form';

/** Входные аргументы хука действия с тэгами. */
interface FilterTagsArgs<FormValues> {
  /** Список полей дополнительного фильтра. */
  defaultAdditionalFilterValues: Partial<FormValues>;
  /** Список полей с тэгами. */
  fieldsWithTags: string[];
  /** Изменяет состояние видимости дополнительного фильтра. */
  onChangeVisibleAdditionalFilter(visible: boolean): void;
  /** Данные формы. */
  values: FormValues;
}

/** Выходные данные хука действия над тегами. */
interface FilterTagsResponse {
  /** Открывает дополнительный фильтр. */
  onOpenAdditionalFilter(): void;
  /**
   * Удаляет тег по имени поля.
   *
   * @param name - Имя поля.
   */
  onRemoveTag(name: string): void;
  /** Удаляет все теги.  */
  onRemoveAllTags(): void;
}

/**
 * Возвращает новые значения формы фильтрации, где будут удалены значения, которые отображаются на форме.
 *
 * @param values - Значения формы.
 * @param fieldsWithTags - Массив, с именами полей для которых отображаются тэги.
 */
export const getValuesAfterResetTags = <FormValues>(values: FormValues, fieldsWithTags: string[]): FormValues => {
  const newValues = { ...values };

  fieldsWithTags.forEach(item => {
    newValues[item] = undefined;
  });

  return newValues;
};

/** Возвращает обработчики над тегами. */
export const useFilterTags = <FormValues>({
  defaultAdditionalFilterValues,
  fieldsWithTags,
  onChangeVisibleAdditionalFilter,
  values,
}: FilterTagsArgs<FormValues>): FilterTagsResponse => {
  const { change, restart, submit } = useForm();
  const { errors, valid } = useFormState();

  const errorAdditionalFilter = useMemo(() => Object.keys(defaultAdditionalFilterValues).some(item => errors?.[item]), [
    defaultAdditionalFilterValues,
    errors,
  ]);

  /** Отправка данных формы. */
  const submitForm = useCallback(() => {
    // Логичнее было использование onRemoveAllTags, но внутри себя он вызывает onOk({}).
    // onOk({}) сбрасывает и основной фильтр, в результате чего запрос уходит с пустым значением фильтра.
    // onOk - это submit формы.
    if (errorAdditionalFilter) {
      void submit();

      return;
    }

    if (valid) {
      void submit();
    }
  }, [errorAdditionalFilter, submit, valid]);

  /** Сброс всех полей дополнительного фильтра. */
  const handleRemoveAllTags = useCallback(() => {
    const newValues = { ...getValuesAfterResetTags(values, fieldsWithTags), ...defaultAdditionalFilterValues };

    restart(newValues);

    submitForm();
  }, [defaultAdditionalFilterValues, fieldsWithTags, restart, submitForm, values]);

  /**
   * Сброс одного поля дополнительного фильтра по имени.
   *
   * @param name - Имя поля.
   */
  const handleRemoveTag = useCallback(
    (name: string) => {
      change(name, defaultAdditionalFilterValues[name]);

      submitForm();
    },
    [change, defaultAdditionalFilterValues, submitForm]
  );

  /** Открывает дополнительный фильтр. */
  const handleOpenAdditionalFilter = useCallback(() => onChangeVisibleAdditionalFilter(true), [onChangeVisibleAdditionalFilter]);

  return {
    onOpenAdditionalFilter: handleOpenAdditionalFilter,
    onRemoveTag: handleRemoveTag,
    onRemoveAllTags: handleRemoveAllTags,
  };
};
