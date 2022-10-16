import type { FC } from 'react';
import React from 'react';
import { Typography } from '@platform/ui';
import type { StatementHistoryCellProps } from './types';

/** Ячейка таблицы с датой и временем создания запроса выписки. */
export const CreatedAt: FC<StatementHistoryCellProps> = ({
  value: {
    createdAt: { date, time },
  },
}) => (
  <>
    <Typography.P data-field={'createdAtDate'}>{date}</Typography.P>
    <Typography.Text data-field={'createdAtTime'}>{time}</Typography.Text>
  </>
);

CreatedAt.displayName = 'CreatedAt';
