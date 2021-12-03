import { createContext } from 'react';
import type { IFilterPanel, ITagsPanel } from 'interfaces';
import type { IGetAccountsResponseDto } from 'interfaces/client';
import { noop } from 'utils';
import type { IFormState } from './filter/interfaces';

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
      date: '',
      dateFrom: '',
      dateTo: '',
      selectedAccounts: [],
      datePeriod: '',
      status: '',
      signaturePresence: false,
    },
    onClose: noop,
    onOk: noop,
    onClear: noop,
    opened: false,
  },
};

/** Контекст скроллера "История запросов". */
export const HistoryScrollerContext = createContext<IHistoryScrollerContext>(DEFAULT_CONTEXT_VALUE);
