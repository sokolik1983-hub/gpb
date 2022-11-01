import { createContext } from 'react';
import type { ClosedDayRow } from 'interfaces/admin';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';

/** Свойства контекста журнала закрытых дней. */
export interface ClosedDaysContextProps {
  /** Делает запрос по закрытым дням на сервер. */
  fetch(params: IFetchDataParams): Promise<IFetchDataResponse<ClosedDayRow>>;
  /** Общее количество записей закрытых дней. */
  total: number;
}

/** Значения по умолчанию контекста журнала закрытых дней. */
const defaultValue: ClosedDaysContextProps = {
  fetch: () => Promise.resolve({ rows: [], pageCount: 0 }),
  total: 0,
};

/** Контекст журнала закрытых дней. */
export const ClosedDaysContext = createContext<ClosedDaysContextProps>(defaultValue);

ClosedDaysContext.displayName = 'ClosedDaysContext';
