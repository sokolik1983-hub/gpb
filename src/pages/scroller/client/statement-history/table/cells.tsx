import type { FC } from 'react';
import React, { useContext, useMemo, Fragment } from 'react';
import { executor } from 'actions/client';
import { ItemWithRestInPopUp } from 'components';
import { StopPropagation } from 'components/stop-propagation';
import { DATE_PERIODS } from 'interfaces';
import type { IStatementHistoryRow } from 'interfaces/client';
import { ACTION } from 'interfaces/client';
import { locale } from 'localization';
import { HistoryScrollerContext } from 'pages/scroller/client/statement-history/history-scroller-context';
import type { CellProps } from 'react-table';
import { DATE_PERIOD_SCROLLER_LABELS, STATEMENT_FORMAT_LABELS } from 'stream-constants';
import { STATUS_LABELS, STATUS_COLOR } from 'stream-constants/client';
import { getActiveActionButtons } from 'utils';
import { DATE_FORMAT, DATE_TIME_FORMAT_WITHOUT_SEC } from '@platform/services';
import { useAuth } from '@platform/services/client';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import { Typography, Box, Horizon, Status as StatusMarker, Gap, ROLE } from '@platform/ui';
import { ROW_ACTIONS } from '../action-configs';
import css from './styles.scss';

/** Свойства ячеек таблицы истории. */
type HistoryCellProps = CellProps<IStatementHistoryRow, IStatementHistoryRow>;

/** Дата и время создания запроса выписки. */
export const CreatedAtCell: FC<HistoryCellProps> = ({ value: doc }) => {
  const { createdAt } = doc;
  const [date, time] = formatDateTime(createdAt, { keepLocalTime: true, format: DATE_TIME_FORMAT_WITHOUT_SEC }).split(' ');

  return (
    <>
      <Typography.Text data-field={'createdAtDate'}>{date}</Typography.Text>
      <Typography.SmallText data-field={'createdAtTime'}>{time}</Typography.SmallText>
    </>
  );
};

CreatedAtCell.displayName = 'CreatedAtCell';

/** Информация по счёту и по организации. */
export const AccountNumber: FC<HistoryCellProps> = ({ value: doc }) => {
  const { accountsIds, accountNumbers, organizationNames } = doc;
  const { accounts } = useContext(HistoryScrollerContext);

  const formattedAccounts = useMemo(() => accountNumbers.map(item => formatAccountCode(item)), [accountNumbers]);

  if (accountsIds.length === accounts.length) {
    return <Typography.Text>{locale.historyScroller.table.allAccounts}</Typography.Text>;
  }

  return (
    <>
      <Box>
        <ItemWithRestInPopUp component={Typography.Text} items={formattedAccounts} />
      </Box>
      <Box>
        <ItemWithRestInPopUp component={Typography.SmallText} items={organizationNames} />
      </Box>
    </>
  );
};

AccountNumber.displayName = 'AccountNumber';

/** Тип периода. */
export const Period: FC<HistoryCellProps> = ({ value: doc }) => {
  const { periodType, periodStart, periodEnd } = doc;

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
      <Typography.Text data-field={'periodType'}>{DATE_PERIOD_SCROLLER_LABELS[periodType]}</Typography.Text>
      <Typography.SmallText data-field={'dateText'}>{dateText}</Typography.SmallText>
    </>
  );
};

Period.displayName = 'Period';

/** Формат запроса выписки. */
export const StatementFormat: FC<HistoryCellProps> = ({ value: doc }) => {
  const { statementFormat, action } = doc;

  if (action === ACTION.VIEW) {
    return <Typography.Text>{locale.historyScroller.statementFormat.labels.onScreen}</Typography.Text>;
  }

  return <Typography.Text data-field={'statementFormat'}>{STATEMENT_FORMAT_LABELS[statementFormat]}</Typography.Text>;
};

StatementFormat.displayName = 'StatementFormat';

/** Статус запроса выписки. */
export const Status: FC<HistoryCellProps> = ({ value: doc }) => {
  const { status } = doc;

  return (
    <Horizon align="TOP">
      <StatusMarker className={css.status} type={STATUS_COLOR[status]} />
      <Typography.Text data-field={'status'} line="BREAK">
        {STATUS_LABELS[status]}
      </Typography.Text>
    </Horizon>
  );
};

Status.displayName = 'Status';

/** Действия со строкой. */
export const Actions: FC<HistoryCellProps> = ({ value: doc }) => {
  const { getAvailableActions } = useAuth();
  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(ROW_ACTIONS), executor, [[doc]]), [getAvailableActions, doc]);

  return (
    <Horizon align="TOP">
      <Horizon.Spacer />
      {actions.map((action, index) => {
        const { icon: Icon, onClick, name } = action;

        return (
          <Fragment key={name}>
            {index !== 0 && <Gap.LG />}
            <StopPropagation>
              <Icon clickable fill={'FAINT'} role={ROLE.BUTTON} scale={'MD'} onClick={onClick} />
            </StopPropagation>
          </Fragment>
        );
      })}
    </Horizon>
  );
};

Actions.displayName = 'Actions';
