import type { FC } from 'react';
import React from 'react';
import cn from 'classnames';
import type { IAccountTurnoversInfo } from 'interfaces/client';
import type { Row } from 'react-table';
import { Box, WithClickable } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента AccountInfoRow. */
export interface IAccountInfoRowProps {
  /** Строка с оборотами по счёту. */
  accountInfoRow: Row<IAccountTurnoversInfo>;
}

/** Строка с информацией по счёту в таблице Оборотов. */
export const AccountInfoRow: FC<IAccountInfoRowProps> = ({ accountInfoRow }) => {
  const { key, ...rowProps } = accountInfoRow.getRowProps();

  return (
    <WithClickable>
      {(ref, { hovered }) => (
        <Box ref={ref} {...rowProps} className={cn(css.clickableRow, css.borderedRow)} fill={hovered ? 'FAINT' : 'BASE'}>
          {accountInfoRow.cells.map(cell => {
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

AccountInfoRow.displayName = 'AccountInfoRow';
