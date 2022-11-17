import type { FC } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-final-form';
import { uniqBy } from 'utils/common';
import type { IOption, OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Свойства выбора из списка с поиском. */
interface SelectWithSearchProps {
  /** Подгружаются ли данные в текущий момент. */
  isLoading?: boolean;
  /** Имя поля на форме. */
  name: string;
  /** Признак множественного выбора. */
  multi?: boolean;
  /** Компонент опции выбора. */
  optionTemplate?: React.ComponentType<any>;
  /** Подсказывающий текст. */
  placeholder?: string;
  /** Опции выбора при поиске. */
  searchOptions: IOption[];
  /** Выбранные ранее опции. */
  selectedOptions: IOption[];
  /** Устанавливает значение подстроки поиска опций выбора. */
  setSearchValue(value: string): void;
}

/** Выбор из списка с поиском. */
export const SelectWithSearch: FC<SelectWithSearchProps> = ({
  isLoading,
  name,
  multi,
  optionTemplate,
  placeholder,
  searchOptions,
  selectedOptions,
  setSearchValue,
}) => {
  const [currentSelectedOptions, setCurrentSelectedOptions] = useState<IOption[]>([]);

  const { change } = useForm();

  /** Обработчик изменения подстроки поиска. */
  const handleSearch = useCallback(
    value => {
      setSearchValue(value);

      return searchOptions;
    },
    [searchOptions, setSearchValue]
  );

  /** Обработчик изменения значения выбора. */
  const handleChange = useCallback<OnChangeType<string[]>>(
    event => {
      const selectedValues = event.value;
      const option = (event.event as unknown) as IOption;

      const newSelectedValues = selectedValues.includes(option.value)
        ? [...currentSelectedOptions, option]
        : currentSelectedOptions.filter(item => item.value !== option.value);

      setCurrentSelectedOptions(newSelectedValues);
    },
    [currentSelectedOptions]
  );

  /** Обработчие очищения поля выбора. */
  const handleClear = useCallback(() => change(name, ''), [change, name]);

  const options = useMemo(() => uniqBy<IOption>([...currentSelectedOptions, ...selectedOptions, ...searchOptions], 'value'), [
    currentSelectedOptions,
    searchOptions,
    selectedOptions,
  ]);

  const Field = multi ? Fields.MultiSelect : Fields.Select;

  return (
    <Field
      extraSmall
      useClearBtn
      useClearBtnInSearch
      withSearch
      filterFn={handleSearch}
      isLoading={isLoading}
      name={name}
      optionTemplate={optionTemplate}
      options={options}
      placeholder={placeholder}
      onChange={handleChange}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onClearClick={handleClear}
    />
  );
};

SelectWithSearch.displayName = 'SelectWithSearch';
