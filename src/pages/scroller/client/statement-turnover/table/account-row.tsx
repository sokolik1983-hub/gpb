import type { FC } from 'react';
import React, { useContext, useMemo, useCallback } from 'react';
import { executor, createStatement } from 'actions/client';
import cn from 'classnames';
import type { IAccountTurnoversInfo, ICreateRequestStatementDto } from 'interfaces/client';
import { TYPE, CREATION_TYPE, ACTIONS, OPERATIONS } from 'interfaces/client';
import type { Row } from 'react-table';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { Box, WithClickable } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import css from './styles.scss';

/** Свойства компонента AccountInfoRow. */
export interface IAccountInfoRowProps {
  /** Строка с оборотами по счёту. */
  accountInfoRow: Row<IAccountTurnoversInfo>;
}

/** Строка с информацией по счёту в таблице Оборотов. */
export const AccountInfoRow: FC<IAccountInfoRowProps> = ({ accountInfoRow }) => {
  const { original, getRowProps, cells } = accountInfoRow;
  const { key, ...rowProps } = getRowProps();

  const {
    filterPanel: {
      values: { datePeriod, dateFrom = '', dateTo = '' },
    },
  } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const requestDto: Partial<ICreateRequestStatementDto> = useMemo(
    () => ({
      action: ACTIONS.VIEW,
      type: TYPE.HIDDEN_VIEW,
      creationType: CREATION_TYPE.NEW,
      sourcePage: COMMON_STREAM_URL.STATEMENT_TURNOVER,
      accountsIds: [original.accountId],
      periodType: datePeriod,
      dateFrom,
      dateTo,
      operations: OPERATIONS.ALL,
      creationParams: {
        includeCreditOrders: false,
        includeCreditStatements: false,
        includeDebitOrders: false,
        includeDebitStatements: false,
        separateDocumentsFiles: false,
      },
      hideEmptyTurnovers: false,
      separateAccountsFiles: false,
      sign: false,
    }),
    [dateFrom, datePeriod, dateTo, original.accountId]
  );

  const handleCLick = useCallback(async () => {
    await executor.execute(createStatement, [requestDto]);
  }, [requestDto]);

  return (
    <WithClickable>
      {(ref, { hovered }) => (
        <Box
          ref={ref}
          {...rowProps}
          className={cn(css.clickableRow, css.borderedRow)}
          fill={hovered ? 'FAINT' : 'BASE'}
          onClick={handleCLick}
        >
          {cells.map(cell => {
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
