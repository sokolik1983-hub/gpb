import type { FC } from 'react';
import React from 'react';
import type { ReconciliationTurnoverCellProps } from 'pages/scroller/admin/reconciliation-turnovers/table/cells/types';
import { Typography } from '@platform/ui';

/** Ячейка таблицы с датой и временем сверки остатков/оборотов. */
export const ReconciliationDate: FC<ReconciliationTurnoverCellProps> = ({
  value: {
    reconciliationDate: { date, time },
  },
}) => (
  <>
    <Typography.P>{date}</Typography.P>
    <Typography.Text fill={'FAINT'}>{time}</Typography.Text>
  </>
);

ReconciliationDate.displayName = 'ReconciliationDate';
