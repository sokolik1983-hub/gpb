import type { FC } from 'react';
import React, { useContext, useMemo } from 'react';
import { DATE_PERIODS, STATEMENT_ACTION_TYPES } from 'interfaces';
import type { IStatementHistoryRow } from 'interfaces/client';
import { locale } from 'localization';
import { HistoryScrollerContext } from 'pages/scroller/client/statement-history/history-scroller-context';
import type { CellProps } from 'react-table';
import { DATE_PERIOD_SCROLLER_LABELS, STATEMENT_FORMAT_LABELS } from 'stream-constants';
import { STATUS_LABELS, STATUS_COLOR } from 'stream-constants/client';
import { DATE_FORMAT, DATE_TIME_FORMAT_WITHOUT_SEC } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import { Typography, Box, Horizon, Status as StatusMarker } from '@platform/ui';
import { AccountNumberWithRest } from './account-number-with-rest';
import css from './styles.scss';

/** Дата и время создания запроса выписки. */
export const CreatedAtCell: FC<CellProps<IStatementHistoryRow, IStatementHistoryRow>> = ({ value }) => {
  const [date, time] = formatDateTime(value.createdAt, { keepLocalTime: true, format: DATE_TIME_FORMAT_WITHOUT_SEC }).split(' ');

  return (
    <>
      <Typography.Text>{date}</Typography.Text>
      <Typography.SmallText>{time}</Typography.SmallText>
    </>
  );
};

CreatedAtCell.displayName = 'CreatedAtCell';

/** Информация по счёту и по организации. */
export const AccountNumber: FC<CellProps<IStatementHistoryRow, IStatementHistoryRow>> = ({ value }) => {
  const { accountsIds, accountNumbers, organizationNames } = value;
  const { accounts } = useContext(HistoryScrollerContext);

  const formattedAccounts = useMemo(() => accountNumbers.map(item => formatAccountCode(item)), [accountNumbers]);

  if (accountsIds.length === accounts.length) {
    return <Typography.Text>{locale.historyScroller.table.allAccounts}</Typography.Text>;
  }

  return (
    <>
      <Box>
        <AccountNumberWithRest items={formattedAccounts} />
      </Box>
      <Box>
        <AccountNumberWithRest small items={organizationNames} />
      </Box>
    </>
  );
};

AccountNumber.displayName = 'AccountNumber';

/** Тип периода. */
export const Period: FC<CellProps<IStatementHistoryRow, IStatementHistoryRow>> = ({ value }) => {
  const { periodType, periodStart, periodEnd } = value;

  let dateText: string;

  switch (periodType) {
    case DATE_PERIODS.YESTERDAY:
    case DATE_PERIODS.TODAY:
      dateText = formatDateTime(periodStart, { keepLocalTime: true, format: DATE_FORMAT });
      break;
    default:
      dateText = locale.historyScroller.table.separatedByDashes({
        dateTo: formatDateTime(periodEnd, { keepLocalTime: true, format: DATE_FORMAT }),
        dateFrom: formatDateTime(periodStart, { keepLocalTime: true, format: DATE_FORMAT }),
      });
      break;
  }

  return (
    <>
      <Typography.Text>{DATE_PERIOD_SCROLLER_LABELS[periodType]}</Typography.Text>
      <Typography.SmallText>{dateText}</Typography.SmallText>
    </>
  );
};

Period.displayName = 'Period';

/** Формат запроса выписки. */
export const StatementFormat: FC<CellProps<IStatementHistoryRow, IStatementHistoryRow>> = ({ value }) => {
  const { statementFormat, action } = value;

  if (action === STATEMENT_ACTION_TYPES.VIEW) {
    return <Typography.Text>{locale.historyScroller.statementFormat.labels.onScreen}</Typography.Text>;
  }

  return <Typography.Text>{STATEMENT_FORMAT_LABELS[statementFormat]}</Typography.Text>;
};

StatementFormat.displayName = 'StatementFormat';

/** Статус запроса выписки. */
export const Status: FC<CellProps<IStatementHistoryRow, IStatementHistoryRow>> = ({ value }) => {
  const { status } = value;

  return (
    <Horizon align="TOP">
      <StatusMarker className={css.status} type={STATUS_COLOR[status]} />
      <Typography.Text line="BREAK">{STATUS_LABELS[status]}</Typography.Text>
    </Horizon>
  );
};

Status.displayName = 'Status';
