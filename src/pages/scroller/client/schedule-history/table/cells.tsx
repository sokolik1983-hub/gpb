import type { FC } from 'react';
import React, { useContext, useMemo } from 'react';
import { executor } from 'actions/client';
import { ItemWithRestInPopUp } from 'components/common';
import { StopPropagation } from 'components/common/stop-propagation';
import { DATE_PERIODS } from 'interfaces';
import type { IStatementScheduleRow } from 'interfaces/client';
import { DATA_ACTION } from 'interfaces/data-action';
import { locale } from 'localization';
import { HistoryScrollerContext } from 'pages/scroller/client/statement-history/history-scroller-context';
import type { CellProps } from 'react-table';
import { DATE_PERIOD_SCHEDULE_SCROLLER_LABELS, STATEMENT_FORMAT_LABELS, STATEMENT_REQUEST_STATUS_FOR_SCHEDULE } from 'stream-constants';
import { SCHEDULE_METHOD, SCHEDULE_STATUS_COLOR } from 'stream-constants/client';
import { getActiveActionButtons } from 'utils/common';
import { DATE_FORMAT } from '@platform/services';
import { useAuth } from '@platform/services/client';
import { formatDateTime } from '@platform/tools/date-time';
import { Box, Horizon, RegularButton, Status as StatusMarker, Typography, Gap, WithDropDown, ServiceIcons } from '@platform/ui';
import { ROW_ACTIONS } from '../action-config';
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
  const { getAvailableActions } = useAuth();
  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(ROW_ACTIONS), executor, [[doc]]), [getAvailableActions, doc]);

  return (
    <StopPropagation>
      {status === 'ACTIVE' && (
        <Box className={css.rowActions}>
          <Gap.XS />
          <WithDropDown extraSmall actions={actions} offset={6} radius="XS" shadow="LG">
            {(ref, _, toggleOpen) => (
              <RegularButton
                ref={ref}
                extraSmall
                className={css.action}
                data-action={DATA_ACTION.MORE}
                dimension={'MC'}
                icon={ServiceIcons.ActionMenuHorizontal}
                onClick={toggleOpen}
              />
            )}
          </WithDropDown>
        </Box>
      )}
    </StopPropagation>
  );
};

Actions.displayName = 'Actions';
