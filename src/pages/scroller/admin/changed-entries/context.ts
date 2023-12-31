import { createContext } from 'react';
import type { BankAccountingEntryTurnoverCard } from 'interfaces/admin/dto/bank-accounting-entry-turnover-card';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { asyncNoop } from 'utils/common';

/** Контекст ЭФ Банка "Журнал проводок удаленных/добавленных". */
export interface IChangedEntriesScrollerContext {
  /** Метод получения проводок. */
  fetch(params: IFetchDataParams): Promise<IFetchDataResponse<BankAccountingEntryTurnoverCard>>;
  /** Общее количество проводок. */
  total: number;
  /** Строка поиска из фильтра. */
  searchQuery: string;
  /** Признак получения новых записей с сервера. */
  newEntriesFetched: boolean;
}

/** Значение по-умолчанию контекста ЭФ Банка "Журнал проводок удаленных/добавленных". */
export const defaultValue: IChangedEntriesScrollerContext = {
  fetch: asyncNoop,
  total: 0,
  searchQuery: '',
  newEntriesFetched: false,
};

/** Контекст ЭФ Банка "Журнал проводок удаленных/добавленных". */
export const ChangedEntriesScrollerContext = createContext<IChangedEntriesScrollerContext>(defaultValue);
