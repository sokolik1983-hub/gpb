import type React from 'react';
import type { RecordCell } from 'components/scroller-table-view/types';

/** Возможные значения табиндекса. */
export type TabindexValue = -1 | 0 | undefined;

/** Свойства для обеспечения аксессабилити ячейки. */
export interface CellAccessibilityProps {
  onFocus: React.FocusEventHandler;
  onKeyDown: React.KeyboardEventHandler;
  onKeyUp: React.KeyboardEventHandler;
  tabindex: TabindexValue;
  'aria-colindex': number;
  'data-column': number;
  'data-row': number;
  'data-table': string;
}

/** Свойства для обеспечения аксессабилити строки. */
interface RowAccessibilityProps {
  'aria-rowindex': number;
}

/** Свойства для обеспечения аксессабилити таблицы. */
interface TableAccessibilityProps {
  'aria-colcount': number;
  'aria-rowcount': number;
}

/** Типы сортировки колонки. */
export enum ARIA_SORT {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
  NONE = 'none',
}

/** Свойства для обеспечения аксессабилити строки заголовка. */
interface HeaderCellAccessibilityProps extends CellAccessibilityProps {
  'aria-sort': ARIA_SORT;
}

/** Свойства для обеспечения аксесабилити навигации внутри ячейки. */
interface CellInnerFocusProps {
  tabindex: TabindexValue;
  'data-inner-focus': boolean;
  'data-inner-focus-index'?: number;
}

/** Данные, отдаваемые хуком аксессабилити таблицы. */
export interface UseAccessibility<Row extends Record<string, unknown> = RecordCell> {
  getCellAccessibilityProps(row: number, columnId: keyof Row): CellAccessibilityProps;
  getHeaderCellAccessibilityProps(props: { columnId: keyof Row; depth?: number; descending?: boolean }): HeaderCellAccessibilityProps;
  getCellAccessibilityInnerFocusProps(row: number, columnId: keyof Row, index?: number): CellInnerFocusProps;
  getRowAccessibilityProps(): RowAccessibilityProps;
  getTableAccessibilityProps(): TableAccessibilityProps;
}

export interface CellAccessibilityInnerFocusProps {
  getCellAccessibilityInnerFocusProps?(row: number, column: string, index?: number): Record<string, unknown>;
}
