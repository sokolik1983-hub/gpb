import type { Dispatch, SetStateAction } from 'react';
import type { IFilters } from '@platform/core';

/** Свойства фильтра скроллера. */
export interface ScrollerFilter {
  /** Метод устанавливает состояние фильтра. */
  setFilter: Dispatch<SetStateAction<IFilters>>;
}

/** Свойства таблицы скроллера. */
export interface ScrollerTable {
  /** Значения формы фильтрации. */
  filter: IFilters;
  /** Занимаемая высота таблицей. */
  height: number;
  /** Признак, что можно показать таблицу. */
  show?: boolean;
}
