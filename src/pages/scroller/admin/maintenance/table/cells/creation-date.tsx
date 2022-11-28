import type { FC } from 'react';
import React from 'react';
import type { MaintenanceCellProps } from 'pages/scroller/admin/maintenance/table/cells/types';
import { Typography } from '@platform/ui';

/** Ячейка таблицы с датой и временем создания записи. */
export const CreationDate: FC<MaintenanceCellProps> = ({
  value: {
    creationDate: { date, time },
  },
}) => (
  <>
    <Typography.P>{date}</Typography.P>
    <Typography.Text>{time}</Typography.Text>
  </>
);

CreationDate.displayName = 'CreationDate';
