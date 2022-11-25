import { createContext } from 'react';
import type { StatementBranch } from 'interfaces/admin';
import { noop } from '@platform/ui';

/** Свойства контекста фильтра журнала закрытых дней. */
export interface FilterContextProps {
  /** Все филиалы. */
  allBranches: StatementBranch[];
  /** Устанавливает признак завершения расчитывания периода. */
  setDatePeriodFetched(): void;
}

/** Значения по умолчанию контекста фильтра журнала закрытых дней. */
const defaultValue: FilterContextProps = {
  allBranches: [],
  setDatePeriodFetched: noop,
};

export const FilterContext = createContext(defaultValue);
