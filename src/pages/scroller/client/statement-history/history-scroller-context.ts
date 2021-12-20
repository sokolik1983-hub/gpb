import { createContext } from 'react';
import type { IFilterPanel, ITagsPanel, Sorting, IPagination } from 'interfaces';
import type { IGetAccountsResponseDto, IStatementHistoryRow } from 'interfaces/client';
import { DEFAULT_PAGINATION } from 'stream-constants';
import { noop } from 'utils';
import type { IFormState } from './filter/interfaces';
import { COLUMN_NAMES } from './table/constants';

/** Состояние сортровки по умолчанию. */
export const DEFAULT_SORTING: Sorting = [{ id: COLUMN_NAMES.CREATED_AT, desc: true }];

/** Контекст скроллера "История запросов". */
export interface IHistoryScrollerContext {
  /** Ошибка сетевого запроса. */
  hasError: boolean;
  /** Устанавливает ошибку. */
  setHasError(value: boolean): void;
  /** Флаг ожидания выполнения запроса. */
  isLoading: boolean;
  /** Устанавливает флаг ожидания выполнения запроса. */
  setIsLoading(value: boolean): void;
  /** Свойства панели фильтрации. */
  filterPanel: IFilterPanel<IFormState>;
  /** Свойства тегов. */
  tagsPanel: ITagsPanel;
  /** Счета пользователя, для использования в селекте выбора счёта. */
  accounts: IGetAccountsResponseDto[];
  /** Выписки. Строки скроллера. */
  statements: IStatementHistoryRow[];
  /** Общее количество выписок, подходящих под условия фильтрации. */
  totalStatementsAmount: number;
  /** Сортировка. */
  sorting?: Sorting;
  /** Установить сортировку. */
  setSorting(value: Sorting): void;
  /** Стейт пагинации. */
  pagination: IPagination;
  /** Устанавливает стейт пагинации. */
  setPagination(value: IPagination): void;
}

/** Дефолтное состояние контекста скроллера. */
const DEFAULT_CONTEXT_VALUE: IHistoryScrollerContext = {
  hasError: false,
  setHasError: noop,
  isLoading: false,
  setIsLoading: noop,
  accounts: [],
  tagsPanel: {
    tags: [],
    onRemoveAllTags: noop,
    onRemoveTag: noop,
    onClick: noop,
  },
  filterPanel: {
    values: {
      createdAt: '',
      dateFrom: '',
      dateTo: '',
      accountIds: [],
      periodType: '',
      status: '',
      signed: false,
    },
    onClose: noop,
    onOk: noop,
    onClear: noop,
    opened: false,
  },
  statements: [],
  totalStatementsAmount: 0,
  sorting: DEFAULT_SORTING,
  setSorting: noop,
  pagination: DEFAULT_PAGINATION,
  setPagination: noop,
};

/** Контекст скроллера "История запросов". */
export const HistoryScrollerContext = createContext<IHistoryScrollerContext>(DEFAULT_CONTEXT_VALUE);
