import { createContext } from 'react';
import type { Currency } from 'interfaces/admin';
import { noop } from '@platform/ui';

/** Свойства контекста фильтра справочника курсов валют. */
export interface FilterContextProps {
  /** Валюты. */
  currencies: Currency[];
  /** Выбранные валюты. */
  selectedCurrencies: Currency[];
  /** Установить подстроку поиска кода валюты. */
  setCurrencyCodeSearchValue(value: string): void;
}

/** Значения по умолчанию контекста для фильтра справочника курсов валют. */
const defaultValue: FilterContextProps = {
  currencies: [],
  selectedCurrencies: [],
  setCurrencyCodeSearchValue: noop,
};

/** Контекст фильтра справочника курсов валют. */
export const FilterContext = createContext<FilterContextProps>(defaultValue);
