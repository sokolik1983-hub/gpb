import { createContext } from 'react';
import type { ServiceBranch } from 'interfaces/admin';

/** Свойства контекста фильтра журнала закрытых дней. */
export interface FilterContextProps {
  /** Филиалы. */
  branches: ServiceBranch[];
}

/** Значения по умолчанию контекста фильтра журнала закрытых дней. */
const defaultValue: FilterContextProps = {
  branches: [],
};

export const FilterContext = createContext(defaultValue);
