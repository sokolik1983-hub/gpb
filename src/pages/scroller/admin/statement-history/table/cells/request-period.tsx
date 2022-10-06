import type { FC } from 'react';
import React from 'react';
import { DATE_PERIODS } from 'interfaces';
import { locale } from 'localization';
import { DATE_PERIOD_SCROLLER_LABELS } from 'stream-constants';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { Typography } from '@platform/ui';
import type { StatementHistoryCellProps } from './types';

/** Ячейка таблицы с периодом запроса выписки. */
export const RequestPeriod: FC<StatementHistoryCellProps> = ({ value: { periodEnd, periodType, periodStart } }) => {
  let date: string;

  switch (periodType) {
    case DATE_PERIODS.YESTERDAY:
    case DATE_PERIODS.TODAY:
      date = formatDateTime(periodStart, { keepLocalTime: true, format: DATE_FORMAT });
      break;
    default:
      date = locale.historyScroller.table.separatedByDashes({
        dateTo: formatDateTime(periodEnd, { keepLocalTime: true, format: DATE_FORMAT }),
        dateFrom: formatDateTime(periodStart, { keepLocalTime: true, format: DATE_FORMAT }),
      });
      break;
  }

  return (
    <>
      <Typography.P data-field={'periodType'}>{DATE_PERIOD_SCROLLER_LABELS[periodType]}</Typography.P>
      <Typography.Text data-field={'dateText'}>{date}</Typography.Text>
    </>
  );
};

RequestPeriod.displayName = 'RequestPeriod';
