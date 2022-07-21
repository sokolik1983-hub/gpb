import { createContext } from 'react';
import type { IFilterPanel, ITagsPanel } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import type { IGetCounterpartiesResponseDto, IStatementSummaryInfoResponseDto } from 'interfaces/dto';
import { noop } from 'utils';
import { SORT_DIRECTION } from '@platform/services';
import type { IFormState } from './filter/interfaces';
import { COLUMN_NAMES } from './table/constants';

/** Состояние сортровки по умолчанию. */
export const DEFAULT_SORTING = {
  [COLUMN_NAMES.OPERATION_DATE]: SORT_DIRECTION.DESC,
  [COLUMN_NAMES.INCOME]: SORT_DIRECTION.ASC,
};

/** Контекст скроллера "Проводки". */
export interface ITransactionScrollerContext {
  /** Признак обновления проводок. */
  transactionsUpdating?: boolean;
  /** Свойства панели фильтрации. */
  filterPanel: IFilterPanel<IFormState>;
  /** Свойства тегов. */
  tagsPanel: ITagsPanel;
  /** Контрагенты. */
  counterparties: IGetCounterpartiesResponseDto[];
  /** Общее количество проводок, без учёта фильтрации. */
  totalTransactions: number;
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
  totalTransactions: 0,
  selectedRows: [],
  setSelectedRows: noop,
  fetchedNewTransactions: false,
};

/** Контекст скроллера "Проводки". */
export const TransactionScrollerContext = createContext<ITransactionScrollerContext>(DEFAULT_CONTEXT_VALUE);
