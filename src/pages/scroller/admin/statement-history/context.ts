import { createContext } from 'react';
import type { StatementHistoryRow } from 'interfaces/admin';
import type { IGetAccountsResponseDto } from 'interfaces/dto';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { noop } from '@platform/ui';

/** Свойства контекста скроллера "История запросов". */
export interface StatementHistoryScrollerContextProps {
  /** Счета. */
  accounts: IGetAccountsResponseDto[];
  /** Делает запрос выписок на сервер. */
  fetchStatements(params: IFetchDataParams): Promise<IFetchDataResponse<StatementHistoryRow>>;
  /** Организации. */
  organizations: any[];
  /** Филиалы. */
  serviceBranch: any[];
  /** Метод установки/снятия признака загрузки. */
  setLoading(value: boolean): void;
  /** Общее количество выписок по запросу. */
  totalStatements: number;
  /** Пользователи. */
  users: any[];
}

/** Дефолтные значения контекста скроллера "История запросов". */
const defaultValue = {
  accounts: [],
  fetchStatements: () => Promise.resolve({ rows: [], pageCount: 0 }),
  organizations: [],
  serviceBranch: [],
  setLoading: noop,
  totalStatements: 0,
  users: [],
};

/** Контекст скроллера "История запросов". */
export const StatementHistoryScrollerContext = createContext<StatementHistoryScrollerContextProps>(defaultValue);

StatementHistoryScrollerContext.displayName = 'StatementHistoryScrollerContext';
