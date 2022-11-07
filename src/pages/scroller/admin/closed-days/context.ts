import { createContext } from 'react';
import { noop } from '@platform/ui';

/** Свойства контекста журнала закрытых дней. */
export interface ClosedDaysContextProps {
  /** Устанавливает признак завершения получения периода. */
  setDatePeriodFetched(): void;
}

/** Значения по умолчанию контекста журнала закрытых дней. */
const defaultValue: ClosedDaysContextProps = {
  setDatePeriodFetched: noop,
};

/** Контекст журнала закрытых дней. */
export const ClosedDaysContext = createContext<ClosedDaysContextProps>(defaultValue);

ClosedDaysContext.displayName = 'ClosedDaysContext';
