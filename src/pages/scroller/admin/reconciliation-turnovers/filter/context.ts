import { createContext } from 'react';
import type { Account } from 'interfaces/admin';
import { noop } from '@platform/ui';

/** Свойства контекста фильтра сверки остатков/оборотов. */
export interface FilterContextProps {
  /** Счета. */
  accounts: Account[];
  /** Выбранные счета (из Session Storage). */
  selectedAccounts: Account[];
  /** Установить подстроку поиска счета. */
  setAccountSearchValue(value: string): void;
}

/** Значения по умолчанию контекста фильтра сверки остатков/оборотов. */
const defaultValue: FilterContextProps = {
  accounts: [],
  selectedAccounts: [],
  setAccountSearchValue: noop,
};

export const FilterContext = createContext<FilterContextProps>(defaultValue);
