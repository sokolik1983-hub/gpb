import type React from 'react';
import { createContext } from 'react';
import type { TurnoverCard } from 'interfaces/admin/dto/turnover';
import { noop } from 'utils/common';
import type { IFilters } from '@platform/core';

/** Свойства конекста скроллера. */
export interface ScrollerContextProps {
  /** Выбранные записи скроллера. */
  selectedRows: TurnoverCard[];
  /** Установить выбранные записи. */
  setSelectedRows: React.Dispatch<React.SetStateAction<TurnoverCard[]>>;
  /** Фильтры скроллера. */
  filters: IFilters;
  /** Установить новое состояние фильтров. */
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
}

/** Начальное значение контекста. */
export const defaultValue: ScrollerContextProps = {
  selectedRows: [],
  setSelectedRows: noop,
  filters: {},
  setFilters: noop,
};

/** Контекст скроллера. */
export const ScrollerContext = createContext<ScrollerContextProps>(defaultValue);

ScrollerContext.displayName = 'TurnoversScrollerContext';
