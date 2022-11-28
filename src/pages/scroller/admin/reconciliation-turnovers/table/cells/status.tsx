import type { FC } from 'react';
import React from 'react';
import type { ReconciliationTurnoverCellProps } from 'pages/scroller/admin/reconciliation-turnovers/table/cells/types';
import { TURNOVER_RECONCILIATION_STATUS_COLOR, TURNOVER_RECONCILIATION_STATUS_LABEL } from 'stream-constants/admin';
import { Horizon, Typography, Status as StatusMarker } from '@platform/ui';

/** Ячейка таблицы со статусом сверки остатков/оборотов. */
export const Status: FC<ReconciliationTurnoverCellProps> = ({ value: { status } }) => (
  <Horizon>
    <StatusMarker type={TURNOVER_RECONCILIATION_STATUS_COLOR[status]} />
    <Typography.P>{TURNOVER_RECONCILIATION_STATUS_LABEL[status]}</Typography.P>
  </Horizon>
);

Status.displayName = 'Status';
