import type { FC } from 'react';
import React, { useContext } from 'react';
import { ItemWithRestInPopUp } from 'components/common';
import { StopPropagation } from 'components/common/stop-propagation';
import { DATE_PERIODS } from 'interfaces';
import type { IStatementScheduleRow } from 'interfaces/client';
import { DATA_ACTION } from 'interfaces/data-action';
import { locale } from 'localization';
import { HistoryScrollerContext } from 'pages/scroller/client/statement-history/history-scroller-context';
import type { CellProps } from 'react-table';
import { DATE_PERIOD_SCHEDULE_SCROLLER_LABELS, STATEMENT_FORMAT_LABELS, STATEMENT_REQUEST_STATUS_FOR_SCHEDULE } from 'stream-constants';
import { COMMON_STREAM_URL, SCHEDULE_METHOD, SCHEDULE_STATUS_COLOR } from 'stream-constants/client';
import { DATE_FORMAT, useRedirect } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { Box, Horizon, RegularButton, Status as StatusMarker, Typography, Gap, ServiceIcons } from '@platform/ui';
import css from './styles.scss';

/** Свойства ячеек таблицы истории выписки по расписанию. */
type HistoryCellProps = CellProps<IStatementScheduleRow, IStatementScheduleRow>;

/** Дата и время создания запроса выписки. */
export const CreatedAtCell: FC<HistoryCellProps> = ({ value: { createdAt, scheduleTime } }) => (
  <>
    <Typography.P data-field={'createdAtDate'}>{createdAt}</Typography.P>
    <Typography.P data-field={'scheduleTime'}>{scheduleTime}</Typography.P>
  </>
);

CreatedAtCell.displayName = 'CreatedAtCell';

/** Дата и время окончания выписки. */
export const ScheduleEndDate: FC<HistoryCellProps> = (
  { value: { scheduleTime } } // createdAt
) => (
  <>
    {/* <Typography.P data-field={'createdAtDate'}>{createdAt}</Typography.P> */}
    <Typography.P data-field={'scheduleTime'}>{scheduleTime}</Typography.P>
  </>
);

CreatedAtCell.displayName = 'CreatedAtCell';

/** Информация по счёту и по организации. */
export const AccountNumber: FC<HistoryCellProps> = ({ value: { accountsIds, accountNumbers, organizationNames } }) => {
  const { accounts } = useContext(HistoryScrollerContext);

  if (accountsIds.length === accounts.length) {
    return <Typography.P>{locale.historyScroller.table.allAccounts}</Typography.P>;
  }

  return (
    <>
      <Box>
        <ItemWithRestInPopUp component={Typography.P} items={accountNumbers} />
      </Box>
      <Gap.XS />
      <Box>
        <ItemWithRestInPopUp component={Typography.SmallText} items={organizationNames} />
      </Box>
    </>
  );
};

AccountNumber.displayName = 'AccountNumber';

/** Тип периода. */
export const Period: FC<HistoryCellProps> = ({ value: { periodType, periodStart, periodEnd } }) => {
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
      <Typography.P data-field={'periodType'}>{DATE_PERIOD_SCHEDULE_SCROLLER_LABELS[periodType]}</Typography.P>
      <Gap.XS />
      <Typography.P data-field={'dateText'}>{dateText}</Typography.P>
    </>
  );
};

Period.displayName = 'Period';

/** Формат запроса выписки. */
export const StatementFormat: FC<HistoryCellProps> = ({ value: { statementFormat } }) => (
  <Typography.P data-field={'statementFormat'}>{STATEMENT_FORMAT_LABELS[statementFormat]}</Typography.P>
);

StatementFormat.displayName = 'StatementFormat';

/** Статус запроса выписки. */
export const Status: FC<HistoryCellProps> = ({ value: { status } }) => (
  <Horizon align="TOP">
    <StatusMarker className={css.status} type={SCHEDULE_STATUS_COLOR[status]} />
    <Typography.P data-field={'status'} line="BREAK">
      {STATEMENT_REQUEST_STATUS_FOR_SCHEDULE[status]}
    </Typography.P>
  </Horizon>
);

Status.displayName = 'Status';

/** Способы получения выписки по расписанию. */
export const Method: FC<HistoryCellProps> = ({ value: { scheduleMethod } }) => (
  <Typography.P>{SCHEDULE_METHOD[scheduleMethod]}</Typography.P>
);

Method.displayName = 'Method';

/** Действия со строкой. */
export const Actions: FC<HistoryCellProps> = ({ value: doc }) => {
  const { status } = doc;
  const redirectToStatementPage = useRedirect(COMMON_STREAM_URL.STATEMENT_SCHEDULE);

  return (
    <StopPropagation>
      {status === 'ACTIVE' && (
        <Box className={css.rowActions}>
          <Gap.XS />
          <RegularButton
            extraSmall
            className={css.action}
            data-action={DATA_ACTION.VIEW}
            dimension={'MC'}
            icon={ServiceIcons.EyeOpened}
            onClick={redirectToStatementPage}
          />
        </Box>
      )}
    </StopPropagation>
  );
};

Actions.displayName = 'Actions';
