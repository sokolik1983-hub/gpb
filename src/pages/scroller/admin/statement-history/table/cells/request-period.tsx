import type { FC } from 'react';
import React from 'react';
import { DATE_PERIOD_SCROLLER_LABELS } from 'stream-constants';
import { Typography } from '@platform/ui';
import type { StatementHistoryCellProps } from './types';

/** Ячейка таблицы с периодом запроса выписки. */
export const RequestPeriod: FC<StatementHistoryCellProps> = ({ value: { periodType, periodDate } }) => (
  <>
    <Typography.P data-field={'periodType'}>{DATE_PERIOD_SCROLLER_LABELS[periodType]}</Typography.P>
    <Typography.Text data-field={'periodDate'}>{periodDate}</Typography.Text>
  </>
);

RequestPeriod.displayName = 'RequestPeriod';
