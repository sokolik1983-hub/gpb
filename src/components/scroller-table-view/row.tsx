import type { FC } from 'react';
import React from 'react';
import cn from 'classnames';
import type { Row } from 'react-table';
import { Box, WithClickable } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента TableRow. */
export interface ITableRowProps {
  /** Строка с оборотами по счёту. */
  row: Row<Record<string, any>>;
}

/** Строка с информацией по счёту в таблице Оборотов. */
export const TableRow: FC<ITableRowProps> = ({ row }) => {
  const { key, ...rowProps } = row.getRowProps();

  return (
    <WithClickable>
      {(ref, { hovered }) => (
        <Box ref={ref} {...rowProps} className={cn(css.clickableRow, css.borderedRow)} fill={hovered ? 'FAINT' : 'BASE'}>
          {row.cells.map(cell => {
            const { key: cellKey, ...cellProps } = cell.getCellProps();

            return (
              <Box key={cellKey} {...cellProps} className={css.cell}>
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