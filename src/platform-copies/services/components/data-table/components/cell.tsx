import React from 'react';
import cn from 'classnames';
import type { Cell as CellPure } from 'react-table';
import { Adjust, Box } from '@platform/ui';
import css from '../styles.scss';
import type { RecordCell } from '../types';

/** Свойства компонента ячейки таблицы. */
interface CellProps extends CellPure<RecordCell> {
  /** Признак первой ячейки в строке. */
  first?: boolean;
  /** Функция запроса данных с сервера. */
  refetch(): void;
}

/** Отступы первой ячейки. */
const firstCellPadding = Adjust.getPadClass(['XS', null]);

/** Компонент ячейки таблицы. */
export const Cell: React.FC<CellProps> = ({ column, first, getCellProps, refetch, render }) => (
  <Box className={cn(first ? firstCellPadding : css.cellPadding)} data-field={column.id} {...getCellProps()}>
    {render('Cell', { refetch })}
  </Box>
);

Cell.displayName = 'Cell';
