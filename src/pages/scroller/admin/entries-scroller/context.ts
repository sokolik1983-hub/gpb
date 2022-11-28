import type React from 'react';
import { createContext } from 'react';
import type { StatementSummary } from 'interfaces/admin';
import type { BankAccountingEntryTurnoverCard } from 'interfaces/admin/dto/bank-accounting-entry-turnover-card';
import { noop } from 'utils/common';
import type { IFilters } from '@platform/core';
import { GROUP_BY } from './constants';

/** Контекст скроллера проводок. */
export interface IEntriesScrollerContext {
  /** Общее количество проводок. */
  total: number;
  /** Выбранные строки в таблице скроллера. */
  selectedRows: BankAccountingEntryTurnoverCard[];
  /** Устанавливает выбранные строки в таблице скроллера. */
  setSelectedRows: React.Dispatch<React.SetStateAction<BankAccountingEntryTurnoverCard[]>>;
  /** Тип группировки проводок в таблице. */
  groupBy: GROUP_BY;
  /** Установливает новое значение группировки. */
  setGroupBy: React.Dispatch<React.SetStateAction<GROUP_BY>>;
  /** Признак отображения только выбранных строк. */
  visibleOnlySelectedRows: boolean;
  /** Устанавливает признак отображения только выбранных строк. */
  setVisibleOnlySelectedRows: React.Dispatch<React.SetStateAction<boolean>>;
  /** Сводная информация по выписке. */
  statementSummary: StatementSummary;
  /** Свойства формы фильтрации. */
  filters: IFilters;
  /** Признак получения новых записей с сервера. */
  newEntriesFetched: boolean;
}

/** Значение по-умолчанию контекста скроллера проводок. */
export const defaultValue: IEntriesScrollerContext = {
  total: 0,
  selectedRows: [],
  setSelectedRows: noop,
  groupBy: GROUP_BY.BY_ACCOUNT,
  setGroupBy: noop,
  visibleOnlySelectedRows: false,
  setVisibleOnlySelectedRows: noop,
  statementSummary: {
    accountNumbers: [],
    currencyGroups: [],
    incomingCount: 0,
    organizationNames: [],
    outgoingCount: 0,
    statement: { dateFrom: '', dateTo: '', id: '' },
  },
  filters: {},
  newEntriesFetched: false,
};

/** Контекст скроллера проводок. */
export const EntriesScrollerContext = createContext<IEntriesScrollerContext>(defaultValue);
