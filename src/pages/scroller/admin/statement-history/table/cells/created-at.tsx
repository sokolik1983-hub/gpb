import type { FC } from 'react';
import React from 'react';
import { DATE_TIME_FORMAT_WITHOUT_SEC } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { Typography } from '@platform/ui';
import type { StatementHistoryCellProps } from './types';

/** Ячейка таблицы с датой и временем создания запроса выписки. */
export const CreatedAt: FC<StatementHistoryCellProps> = ({ value: { createdAt } }) => {
  const [date, time] = formatDateTime(createdAt, {
    keepLocalTime: true,
    format: DATE_TIME_FORMAT_WITHOUT_SEC,
  }).split(' ');

  return (
    <>
      <Typography.P data-field={'createdAtDate'}>{date}</Typography.P>
      <Typography.Text data-field={'createdAtTime'}>{time}</Typography.Text>
    </>
  );
};

CreatedAt.displayName = 'CreatedAt';
