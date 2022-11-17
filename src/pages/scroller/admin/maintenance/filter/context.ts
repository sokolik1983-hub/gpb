import { createContext } from 'react';
import { noop } from '@platform/ui';

/** Свойства контекста фильтра журнала технических работ. */
export interface FilterContextProps {
  /** Устанавливает признак завершения расчитывания периода. */
  setDatePeriodFetched(): void;
}

/** Значения по умолчанию контекста фильтра журнала технических работ. */
const defaultValue: FilterContextProps = {
  setDatePeriodFetched: noop,
};

/** Контекст фильтра журнала технических работ. */
export const FilterContext = createContext(defaultValue);
