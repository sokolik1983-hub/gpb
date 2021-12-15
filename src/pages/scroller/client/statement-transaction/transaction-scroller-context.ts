import { createContext } from 'react';
import type { IFilterPanel, ITagsPanel } from 'interfaces';
import type { IGetCounterpartiesResponseDto } from 'interfaces/client';
import { noop } from 'utils';
import type { IFormState } from './filter/interfaces';

/** Контекст скроллера "Проводки". */
export interface ITransactionScrollerContext {
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
  /** Контрагенты. */
  counterparties: IGetCounterpartiesResponseDto[];
}

/** Дефолтное состояние контекста скроллера. */
const DEFAULT_CONTEXT_VALUE: ITransactionScrollerContext = {
  hasError: false,
  setHasError: noop,
  isLoading: false,
  setIsLoading: noop,
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
};

/** Контекст скроллера "История запросов". */
export const TransactionScrollerContext = createContext<ITransactionScrollerContext>(DEFAULT_CONTEXT_VALUE);
