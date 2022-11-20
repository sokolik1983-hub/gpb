import type React from 'react';
import { createContext } from 'react';
import type { ITurnoverMockDto } from 'interfaces/admin/dto/turnover-mock-dto';
import { noop } from 'utils/common';
import type { IFilters } from '@platform/core';

/** Свойства конекста скроллера. */
export interface ScrollerContextProps {
  /** Выбранные записи скроллера. */
  selectedRows: ITurnoverMockDto[];
  /** Установить выбранные записи. */
  setSelectedRows: React.Dispatch<React.SetStateAction<ITurnoverMockDto[]>>;
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
