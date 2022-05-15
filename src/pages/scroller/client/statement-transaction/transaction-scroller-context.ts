import { createContext } from 'react';
import type { IFilterPanel, ITagsPanel, Sorting, IPagination } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import type { IGetCounterpartiesResponseDto, IStatementSummaryInfoResponseDto } from 'interfaces/dto';
import { DEFAULT_PAGINATION } from 'stream-constants';
import { noop } from 'utils';
import type { IFormState } from './filter/interfaces';
import { COLUMN_NAMES } from './table/constants';

/** Состояние сортровки по умолчанию. */
export const DEFAULT_SORTING: Sorting = [
  { id: COLUMN_NAMES.OPERATION_DATE, desc: true },
  { id: COLUMN_NAMES.INCOME, desc: false },
  { id: COLUMN_NAMES.OUTCOME, desc: false },
];

/** Контекст скроллера "Проводки". */
export interface ITransactionScrollerContext {
  /** Ошибка сетевого запроса. */
  hasError: boolean;
  /** Устанавливает ошибку. */
  setHasError(value: boolean): void;
  /** Признак обновления проводок. */
  transactionsUpdating?: boolean;
  /** Свойства панели фильтрации. */
  filterPanel: IFilterPanel<IFormState>;
  /** Свойства тегов. */
  tagsPanel: ITagsPanel;
  /** Контрагенты. */
  counterparties: IGetCounterpartiesResponseDto[];
  /** Сортировка. */
  sorting?: Sorting;
  /** Установить сортировку. */
  setSorting(value: Sorting): void;
  /** Стейт пагинации. */
  pagination: IPagination;
  /** Устанавливает стейт пагинации. */
  setPagination(value: IPagination): void;
  /** Проводки для отображения в скроллере проводок. */
  transactions: IStatementTransactionRow[];
  /** Общее количество проводок, удовлетворяющих условиям фильтрации. */
  transactionsAmountByFilter: number;
  /** Общее количество проводок, без учёта фильтрации. */
  totalTransactionsAmount: number;
  /** Сводная информация по выписке. */
  statementSummaryInfo?: IStatementSummaryInfoResponseDto;
  /** Выбранные строки в таблице скроллера. */
  selectedRows: IStatementTransactionRow[];
  /** Устанавливает выбранные строки в таблице скроллера. */
  setSelectedRows(value: IStatementTransactionRow[]): void;
  /** Признак получения новых данных по проводкам с бэка. */
  fetchedNewTransactions: boolean;
}

/** Дефолтное состояние контекста скроллера. */
const DEFAULT_CONTEXT_VALUE: ITransactionScrollerContext = {
  hasError: false,
  setHasError: noop,
  transactionsUpdating: false,
  tagsPanel: {
    tags: [],
    onRemoveAllTags: noop,
    onRemoveTag: noop,
    onClick: noop,
  },
  filterPanel: {
    values: {},
    onClose: noop,
    onOk: noop,
    onClear: noop,
    opened: false,
  },
  counterparties: [],
  sorting: DEFAULT_SORTING,
  setSorting: noop,
  pagination: DEFAULT_PAGINATION,
  setPagination: noop,
  transactions: [],
  transactionsAmountByFilter: 0,
  totalTransactionsAmount: 0,
  selectedRows: [],
  setSelectedRows: noop,
  fetchedNewTransactions: false,
};

/** Контекст скроллера "Проводки". */
export const TransactionScrollerContext = createContext<ITransactionScrollerContext>(DEFAULT_CONTEXT_VALUE);
