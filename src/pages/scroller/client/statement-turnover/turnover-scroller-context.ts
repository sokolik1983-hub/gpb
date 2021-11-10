import { createContext } from 'react';
import type { IFilterPanel, ITagsPanel } from 'interfaces';
import type { IGetAccountsResponseDto } from 'interfaces/client';
import { noop } from 'utils';

/** Контекст скроллера "Обороты". */
export interface ITurnoverScrollerContext {
  /** Ошибка сетевого запроса. */
  hasError: boolean;
  /** Устанавливает ошибку. */
  setHasError(value: boolean): void;
  /** Флаг ожидания выполнения запроса. */
  isLoading: boolean;
  /** Устанавливает флаг ожидания выполнения запроса. */
  setIsLoading(value: boolean): void;
  /** Свойства панели фильтрации. */
  filterPanel: IFilterPanel;
  /** Свойства тегов. */
  tagsPanel: ITagsPanel;
  /** Счета пользователя, для использования в селекте выбора счёта. */
  accounts: IGetAccountsResponseDto[];
}

/** Дефолтное состояние контекста скроллера. */
const DEFAULT_CONTEXT_VALUE: ITurnoverScrollerContext = {
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
    values: {},
    onClose: noop,
    onOk: noop,
    onClear: noop,
    opened: false,
  },
};

/** Реакт контекст скроллера "Обороты". */
export const TurnoverScrollerContext = createContext<ITurnoverScrollerContext>(DEFAULT_CONTEXT_VALUE);
