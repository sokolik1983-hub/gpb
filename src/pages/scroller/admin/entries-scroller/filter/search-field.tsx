import React, { useCallback } from 'react';
import { InputWithHistory } from 'components/common';
import { locale } from 'localization';
import { useForm } from 'react-final-form';
import type { IOption } from '@platform/ui';
import { FORM_FIELDS } from './constants';

/** Свойства поля поиска по таблице. */
interface SearchFieldProps {
  /** Массив значений истории поиска. */
  historyOptions: IOption[];
  /** Обработчик изменения поля поиска. */
  onSearch(value: string): void;
}

/** Компонент "Поиск по таблице". */
export const SearchField: React.FC<SearchFieldProps> = ({ historyOptions, onSearch }) => {
  const { change } = useForm();

  /** Выбор значения из истории поиска по таблице. */
  const handleSelectOption = useCallback(option => change(FORM_FIELDS.TABLE_SEARCH, option.value), [change]);

  return (
    <InputWithHistory
      name={FORM_FIELDS.TABLE_SEARCH}
      options={historyOptions}
      placeholder={locale.transactionsScroller.placeholder.tableSearch}
      onChange={onSearch}
      onSelectOption={handleSelectOption}
    />
  );
};

SearchField.displayName = 'SearchField';
