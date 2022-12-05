import { createContext } from 'react';
import type { IFilterPanel, IPagination, ITagsPanel } from 'interfaces';
import type { IStatementScheduleRow } from 'interfaces/client';
import type { IGetAccountsResponseDto } from 'interfaces/dto';
import { DEFAULT_SORTING } from 'pages/scroller/client/statement-history/history-scroller-context';
import { DEFAULT_PAGINATION } from 'stream-constants';
import { noop } from 'utils/common';
import type { ISortSettings } from '@platform/services/common/dist-types/interfaces';
import type { IFormState } from './filter/interfaces';

/** Дефолтное состояние контекста скроллера. */
const DEFAULT_CONTEXT_VALUE: IScheduleScrollerContext = {
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

/** Контекст скроллера "Заявки на выписку по расписанию. */
export interface IScheduleScrollerContext {
  /** Ошибка сетевого запроса. */
  hasError?: boolean;
  /** Устанавливает ошибку. */
  setHasError?(value: boolean): void;
  /** Признак обновления выписок. */
  statementsUpdating?: boolean;
  /** Свойства панели фильтрации. */
  filterPanel?: IFilterPanel<IFormState>;
  /** Свойства тегов. */
  tagsPanel?: ITagsPanel;
  /** Счета пользователя, для использования в селекте выбора счёта. */
  accounts?: IGetAccountsResponseDto[];
  /** Выписки. Строки скроллера. */
  statements: IStatementScheduleRow[];
  /** Общее количество выписок, подходящих под условия фильтрации. */
  totalStatementsAmount: number;
  /** Сортировка. */
  sorting?: ISortSettings;
  /** Установить сортировку. */
  setSorting?(value: ISortSettings): void;
  /** Стейт пагинации. */
  pagination: IPagination;
  /** Устанавливает стейт пагинации. */
  setPagination?(value: IPagination): void;
  /** Признак, что выписки получены. */
  isStatementsError?: boolean;
  /** Признак ошибки получения выписок. */
  isStatementsFetched: boolean;
}

/** Контекст скроллера "История запросов выписки по расписанию". */
export const ScheduleScrollerContext = createContext(DEFAULT_CONTEXT_VALUE);
