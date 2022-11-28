import { createContext } from 'react';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { asyncNoop } from 'utils/common';

/** Контекст скроллера проводок. */
export interface ITransactionsScrollerContext {
  /** Метод получения проводок. */
  fetch(params: IFetchDataParams): Promise<IFetchDataResponse<BankAccountingEntryCard>>;
  /** Общее количество проводок. */
  total: number;
  /** Строка поиска из фильтра. */
  searchQuery: string;
  /** Признак получения новых проводок с сервера. */
  newTransactionsFetched: boolean;
}

/** Значение по-умолчанию контекста скроллера проводок. */
export const defaultValue: ITransactionsScrollerContext = {
  fetch: asyncNoop,
  total: 0,
  searchQuery: '',
  newTransactionsFetched: false,
};

/** Контекст скроллера проводок. */
export const TransactionsScrollerContext = createContext<ITransactionsScrollerContext>(defaultValue);
