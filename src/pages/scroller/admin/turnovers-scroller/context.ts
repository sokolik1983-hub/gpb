import type React from 'react';
import { createContext } from 'react';
import type { ITurnoverMockDto } from 'interfaces/admin/dto/turnover-mock-dto';
import { noop } from 'utils/common';

/** Свойства конекста скроллера. */
export interface ScrollerContextProps {
  /** Выбранные записи скроллера. */
  selectedRows: ITurnoverMockDto[];
  /** Установить выбранные записи. */
  setSelectedRows: React.Dispatch<React.SetStateAction<ITurnoverMockDto[]>>;
}

/** Начальное значение контекста. */
export const defaultValue: ScrollerContextProps = {
  selectedRows: [],
  setSelectedRows: noop,
};

/** Контекст скроллера. */
export const ScrollerContext = createContext<ScrollerContextProps>(defaultValue);

ScrollerContext.displayName = 'TurnoversScrollerContext';
