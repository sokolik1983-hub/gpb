import { createContext } from 'react';
import type { IFilterPanel, IPagination, ITagsPanel } from 'interfaces';
import type { IStatementHistoryRow } from 'interfaces/client';
import type { IGetAccountsResponseDto } from 'interfaces/dto';
import { DEFAULT_PAGINATION } from 'stream-constants';
import { noop } from 'utils/common';
import type { ISortSettings } from '@platform/services/common/dist-types/interfaces';
import { SORT_DIRECTION } from '@platform/services/common/dist-types/interfaces';
import type { IFormState } from './filter/interfaces';
import { COLUMN_NAMES } from './table/constants';

/** Состояние сортировки по умолчанию. */
export const DEFAULT_SORTING = {
  [COLUMN_NAMES.CREATED_AT]: SORT_DIRECTION.DESC,
};

/** Контекст скроллера "История запросов". */
export interface IHistoryScrollerContext {
  /** Ошибка сетевого запроса. */
  hasError: boolean;
  /** Устанавливает ошибку. */
  setHasError(value: boolean): void;
  /** Признак обновления выписок. */
  statementsUpdating?: boolean;
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
  sorting?: ISortSettings;
  /** Установить сортировку. */
  setSorting(value: ISortSettings): void;
  /** Стейт пагинации. */
  pagination: IPagination;
  /** Устанавливает стейт пагинации. */
  setPagination(value: IPagination): void;
  /** Признак, что выписки получены. */
  isStatementsError: boolean;
  /** Признак ошибки получения выписок. */
  isStatementsFetched: boolean;
}

/** Дефолтное состояние контекста скроллера. */
const DEFAULT_CONTEXT_VALUE: IHistoryScrollerContext = {
  hasError: false,
  setHasError: noop,
  statementsUpdating: false,
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
  isStatementsError: false,
  isStatementsFetched: false,
};

/** Контекст скроллера "История запросов". */
export const HistoryScrollerContext = createContext<IHistoryScrollerContext>(DEFAULT_CONTEXT_VALUE);
