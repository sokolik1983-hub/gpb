import type { FC } from 'react';
import React from 'react';
import type { StatementHistoryCellProps } from 'pages/scroller/admin/statements/components/table/cells/types';
import { STATEMENT_STATUS_COLOR, STATEMENT_STATUS_LABEL } from 'stream-constants/admin';
import { Horizon, Typography } from '@platform/ui';
import { Status as StatusMarker } from '@platform/ui/dist-types/status/status';

/** Ячейка таблицы со статусом выписки. */
export const StatementStatus: FC<StatementHistoryCellProps> = ({ value: { statementStatus } }) => (
  <Horizon align="CENTER">
    <StatusMarker type={STATEMENT_STATUS_COLOR[statementStatus]} />
    <Typography.P data-field={'statementStatus'}>{STATEMENT_STATUS_LABEL[statementStatus]}</Typography.P>
  </Horizon>
);

StatementStatus.displayName = 'StatementStatus';
