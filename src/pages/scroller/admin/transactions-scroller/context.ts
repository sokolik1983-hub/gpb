import { createContext } from 'react';

/** Контекст скроллера проводок. */
export interface ITransactionsScrollerContext {
  /** Строка поиска из фильтра. */
  searchQuery: string;
  /** Признак получения новых проводок с сервера. */
  newTransactionsFetched: boolean;
}

/** Значение по-умолчанию контекста скроллера проводок. */
export const defaultValue: ITransactionsScrollerContext = {
  searchQuery: '',
  newTransactionsFetched: false,
};

/** Контекст скроллера проводок. */
export const TransactionsScrollerContext = createContext<ITransactionsScrollerContext>(defaultValue);
