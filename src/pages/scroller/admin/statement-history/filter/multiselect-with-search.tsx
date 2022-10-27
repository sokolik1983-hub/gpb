import type { FC } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import { uniqBy } from 'utils/common';
import type { IOption, OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Свойства мультиселекта с поиском. */
interface MultiselectWithSearchProps {
  /** Имя поля на форме. */
  name: string;
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

/** Мультиселект с поиском. */
export const MultiselectWithSearch: FC<MultiselectWithSearchProps> = ({
  name,
  optionTemplate,
  placeholder,
  searchOptions,
  selectedOptions,
  setSearchValue,
}) => {
  const [currentSelectedOptions, setCurrentSelectedOptions] = useState<IOption[]>([]);

  /** Обработчик изменения подстроки поиска. */
  const handleSearch = useCallback(
    value => {
      setSearchValue(value);

      return searchOptions;
    },
    [searchOptions, setSearchValue]
  );

  /** Обработчик изменения значения мультиселекта. */
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

  const options = useMemo(() => uniqBy<IOption>([...currentSelectedOptions, ...selectedOptions, ...searchOptions], 'value'), [
    currentSelectedOptions,
    searchOptions,
    selectedOptions,
  ]);

  return (
    <Fields.MultiSelect
      extraSmall
      withSearch
      filterFn={handleSearch}
      name={name}
      optionTemplate={optionTemplate}
      options={options}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

MultiselectWithSearch.displayName = 'MultiselectWithSearch';
