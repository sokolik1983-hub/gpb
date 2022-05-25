import type { FC } from 'react';
import React, { useContext, useMemo, useCallback } from 'react';
import { executor, createStatement } from 'actions/client';
import cn from 'classnames';
import { TYPE, CREATION_TYPE, ACTION, OPERATIONS } from 'interfaces/client';
import type { IAccountTurnoversInfo, ICreateRequestStatementDto } from 'interfaces/dto';
import { GROUPING_VALUES } from 'interfaces/dto';
import type { Row } from 'react-table';
import { COMMON_STREAM_URL, PRIVILEGE } from 'stream-constants/client';
import { getHandlerDependingOnSelection, isFunctionAvailability } from 'utils';
import { Box, WithClickable, ROLE, Line } from '@platform/ui';
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
    groupByForRender,
  } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const doc: Partial<ICreateRequestStatementDto> = useMemo(
    () => ({
      action: ACTION.VIEW,
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

  const handleClick = useCallback(async () => {
    // TODO: в дальнейшем заменить на платформенный аналог
    if (!isFunctionAvailability(PRIVILEGE.STATEMENT_REQUEST)) {
      return;
    }

    const handler = getHandlerDependingOnSelection(executor.execute);

    await handler(createStatement, [doc]);
  }, [doc]);

  const hasThirdLevelMargin = groupByForRender === GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES;
  const hasSecondLevelMargin = ![GROUPING_VALUES.NO_GROUPING, GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES].includes(groupByForRender);

  const hasMargin = hasSecondLevelMargin || hasThirdLevelMargin;

  return (
    <React.Fragment key={key}>
      <WithClickable>
        {(ref, { hovered }) => (
          <Box
            key={key}
            ref={ref}
            {...rowProps}
            className={cn(css.clickableRow, { [css.borderedRow]: !hasMargin, [css.hoveredRow]: hovered })}
            role={ROLE.ROW}
            onClick={handleClick}
          >
            {cells.map(cell => {
              const { key: cellKey, ...cellProps } = cell.getCellProps({ role: ROLE.GRIDCELL });

              return (
                <Box key={cellKey} {...cellProps} className={css.cell}>
                  {cell.render('Cell')}
                </Box>
              );
            })}
          </Box>
        )}
      </WithClickable>
      {hasMargin && (
        <Line
          className={cn({ [css.thirdLevelLine]: hasThirdLevelMargin, [css.secondLevelLine]: hasSecondLevelMargin })}
          fill="FAINT"
          width={'100%'}
        />
      )}
    </React.Fragment>
  );
};

AccountInfoRow.displayName = 'AccountInfoRow';
