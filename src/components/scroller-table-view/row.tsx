import type { FC } from 'react';
import React from 'react';
import cn from 'classnames';
import type { Row } from 'react-table';
import { Box, WithClickable } from '@platform/ui';
import css from './styles.scss';
import { SELECT_COLUMN_ID } from './use-checkbox-column';

/** Свойства компонента TableRow. */
export interface ITableRowProps {
  /** Строка с оборотами по счёту. */
  row: Row<Record<string, any>>;
  /** Обработчик клика по строке. */
  onDoubleClick?(row: Record<string, any>): void;
}

/** Строка с информацией по счёту в таблице Оборотов. */
export const TableRow: FC<ITableRowProps> = ({ row, onDoubleClick }) => {
  const { getRowProps, original, cells } = row;

  const { key, ...rowProps } = getRowProps();

  return (
    <WithClickable>
      {(ref, { hovered }) => (
        <Box
          ref={ref}
          {...rowProps}
          className={cn(css.clickableRow, css.borderedRow)}
          fill={hovered ? 'FAINT' : 'BASE'}
          onDoubleClick={() => onDoubleClick?.(original)}
        >
          {cells.map(cell => {
            const { key: cellKey, ...cellProps } = cell.getCellProps();

            const isCondensedColumn = cell.column.id === SELECT_COLUMN_ID;

            return (
              <Box key={cellKey} {...cellProps} className={isCondensedColumn ? css.condensedCell : css.headerCell}>
                {cell.render('Cell')}
              </Box>
            );
          })}
        </Box>
      )}
    </WithClickable>
  );
};

TableRow.displayName = 'TableRow';
