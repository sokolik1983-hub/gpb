import type { FC } from 'react';
import React from 'react';
import cn from 'classnames';
import type { Row } from 'react-table';
import { Box, WithClickable } from '@platform/ui';
import css from './styles.scss';
import { getCellPaddingClass } from './utils';

/** Свойства компонента TableRow. */
export interface ITableRowProps {
  /** Строка с оборотами по счёту. */
  row: Row<Record<string, any>>;
  /** Обработчик клика по строке. */
  onClick?(row: Record<string, any>): void;
}

/** Строка с информацией по счёту в таблице Оборотов. */
export const TableRow: FC<ITableRowProps> = ({ row, onClick }) => {
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
          onClick={() => onClick?.(original)}
        >
          {cells.map(cell => {
            const { getCellProps, column, render } = cell;

            const { key: cellKey, ...cellProps } = getCellProps();

            return (
              <Box key={cellKey} {...cellProps} className={cn(getCellPaddingClass(column.paddingType))}>
                {render('Cell')}
              </Box>
            );
          })}
        </Box>
      )}
    </WithClickable>
  );
};

TableRow.displayName = 'TableRow';
