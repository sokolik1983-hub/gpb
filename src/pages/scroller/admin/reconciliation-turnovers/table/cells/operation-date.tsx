import type { FC } from 'react';
import React from 'react';
import type { ReconciliationTurnoverCellProps } from 'pages/scroller/admin/reconciliation-turnovers/table/cells/types';
import { Typography } from '@platform/ui';

/** Ячейка таблицы с операционной датой. */
export const OperationDate: FC<ReconciliationTurnoverCellProps> = ({ value: { operationDate } }) => (
  <Typography.P>{operationDate}</Typography.P>
);

OperationDate.displayName = 'OperationDate';
