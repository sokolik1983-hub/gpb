import type { FC } from 'react';
import React from 'react';
import type { ReconciliationTurnoverCellProps } from 'pages/scroller/admin/reconciliation-turnovers/table/cells/types';
import { Typography } from '@platform/ui';

/** Ячейка таблицы с номером счета. */
export const AccountNumber: FC<ReconciliationTurnoverCellProps> = ({ value: { accountNumber } }) => (
  <Typography.P>{accountNumber}</Typography.P>
);

AccountNumber.displayName = 'AccountNumber';
