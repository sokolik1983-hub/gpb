import { createContext } from 'react';
import type { BankAccountingChangedEntry } from 'interfaces/admin/dto/bank-accounting-changed-entry';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { asyncNoop } from 'utils/common';

/** Контекст ЭФ Банка "Журнал проводок удаленных/добавленных". */
export interface IChangedEntriesScrollerContext {
  /** Метод получения проводок. */
  fetch(params: IFetchDataParams): Promise<IFetchDataResponse<BankAccountingChangedEntry>>;
  /** Общее количество проводок. */
  total: number;
}

/** Значение по-умолчанию контекста ЭФ Банка "Журнал проводок удаленных/добавленных". */
export const defaultValue: IChangedEntriesScrollerContext = {
  fetch: asyncNoop,
  total: 0,
};

/** Контекст ЭФ Банка "Журнал проводок удаленных/добавленных". */
export const ChangedEntriesScrollerContext = createContext<IChangedEntriesScrollerContext>(defaultValue);
