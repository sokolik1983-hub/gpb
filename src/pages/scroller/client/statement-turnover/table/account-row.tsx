import type { FC } from 'react';
import React, { useCallback, useContext, useMemo } from 'react';
import { createStatement, executor } from 'actions/client';
import cn from 'classnames';
import type { IFocusParentNodeProps } from 'components/common/focus-tree';
import { FocusNode, NODE_TYPE } from 'components/common/focus-tree';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { ACTION, CREATION_TYPE, OPERATIONS, TYPE } from 'interfaces/common';
import type { IAccountTurnoversInfo, ICreateRequestStatementDto } from 'interfaces/dto';
import { GROUPING_VALUES } from 'interfaces/dto';
import type { Row } from 'react-table';
import { DATA_TABLE_ROW_CELL_NODE } from 'stream-constants/a11y-nodes';
import { COMMON_STREAM_URL, PRIVILEGE } from 'stream-constants/client';
import { getHandlerDependingOnSelection, isFunctionAvailability } from 'utils/common';
import { Line, ROLE, WithClickable } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import css from './styles.scss';

/** Свойства компонента AccountInfoRow. */
export interface IAccountInfoRowProps extends IFocusParentNodeProps {
  /** Строка с оборотами по счёту. */
  accountInfoRow: Row<IAccountTurnoversInfo>;
}

/** Строка с информацией по счёту в таблице Оборотов. */
export const AccountInfoRow: FC<IAccountInfoRowProps> = ({ accountInfoRow, nodesIds: [nodeId, parentId] }) => {
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

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();

      // TODO: в дальнейшем заменить на платформенный аналог
      if (!isFunctionAvailability(PRIVILEGE.STATEMENT_REQUEST)) {
        return;
      }

      const handler = getHandlerDependingOnSelection(executor.execute);

      await handler(createStatement(EXPORT_PARAMS_USE_CASES.EIGHTEEN), [doc]);
    },
    [doc]
  );

  const hasThirdLevelMargin = groupByForRender === GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES;
  const hasSecondLevelMargin = ![GROUPING_VALUES.NO_GROUPING, GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES].includes(groupByForRender);

  const hasMargin = hasSecondLevelMargin || hasThirdLevelMargin;

  return (
    <React.Fragment key={key}>
      <WithClickable>
        {(ref, { hovered }) => (
          <FocusNode
            key={key}
            ref={ref}
            {...rowProps}
            preferBorder
            className={cn(css.clickableRow, { [css.borderedRow]: !hasMargin, [css.hoveredRow]: hovered })}
            nodeId={nodeId}
            parentId={parentId}
            role={ROLE.ROW}
            onClick={handleClick}
          >
            {cells.map(cell => {
              const { key: cellKey, ...cellProps } = cell.getCellProps({ role: ROLE.GRIDCELL });

              return (
                <FocusNode
                  key={cellKey}
                  preferBorder
                  {...cellProps}
                  className={css.cell}
                  nodeId={`${DATA_TABLE_ROW_CELL_NODE}-${cellKey}`}
                  parentId={nodeId}
                  type={NODE_TYPE.HORIZONTAL}
                >
                  {cell.render('Cell')}
                </FocusNode>
              );
            })}
          </FocusNode>
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
