import type { FC } from 'react';
import React, { useContext, useMemo } from 'react';
import { executor } from 'actions/client';
import { ItemWithRestInPopUp } from 'components/common';
import { StopPropagation } from 'components/common/stop-propagation';
import { DATE_PERIODS } from 'interfaces';
import type { IStatementHistoryRow } from 'interfaces/client';
import { ACTION } from 'interfaces/common';
import { locale } from 'localization';
import { HistoryScrollerContext } from 'pages/scroller/client/statement-history/history-scroller-context';
import type { CellProps } from 'react-table';
import { DATE_PERIOD_SCROLLER_LABELS, STATEMENT_FORMAT_LABELS } from 'stream-constants';
import { STATUS_COLOR, STATUS_LABELS } from 'stream-constants/client';
import { getActiveActionButtons } from 'utils/common';
import { DATE_FORMAT, DATE_TIME_FORMAT_WITHOUT_SEC } from '@platform/services';
import { useAuth } from '@platform/services/client';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import { Box, Horizon, RegularButton, Status as StatusMarker, Typography, Gap } from '@platform/ui';
import { ROW_ACTIONS } from '../action-configs';
import css from './styles.scss';

/** Свойства ячеек таблицы истории. */
type HistoryCellProps = CellProps<IStatementHistoryRow, IStatementHistoryRow>;

/** Дата и время создания запроса выписки. */
export const CreatedAtCell: FC<HistoryCellProps> = ({ value: doc }) => {
  const { createdAt } = doc;
  const [date, time] = formatDateTime(createdAt, {
    keepLocalTime: true,
    format: DATE_TIME_FORMAT_WITHOUT_SEC,
  }).split(' ');

  return (
    <>
      <Typography.P data-field={'createdAtDate'}>{date}</Typography.P>
      <Typography.P data-field={'createdAtTime'}>{time}</Typography.P>
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
    return <Typography.P>{locale.historyScroller.table.allAccounts}</Typography.P>;
  }

  return (
    <>
      <Box>
        <ItemWithRestInPopUp component={Typography.P} items={formattedAccounts} />
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
      <Typography.P data-field={'periodType'}>{DATE_PERIOD_SCROLLER_LABELS[periodType]}</Typography.P>
      <Gap.XS />
      <Typography.P data-field={'dateText'}>{dateText}</Typography.P>
    </>
  );
};

Period.displayName = 'Period';

/** Формат запроса выписки. */
export const StatementFormat: FC<HistoryCellProps> = ({ value: doc }) => {
  const { statementFormat, action } = doc;

  if (action === ACTION.VIEW) {
    return <Typography.P>{locale.historyScroller.statementFormat.labels.onScreen}</Typography.P>;
  }

  return <Typography.P data-field={'statementFormat'}>{STATEMENT_FORMAT_LABELS[statementFormat]}</Typography.P>;
};

StatementFormat.displayName = 'StatementFormat';

/** Статус запроса выписки. */
export const Status: FC<HistoryCellProps> = ({ value: doc }) => {
  const { status } = doc;

  return (
    <Horizon align="TOP">
      <StatusMarker className={css.status} type={STATUS_COLOR[status]} />
      <Typography.P data-field={'status'} line="BREAK">
        {STATUS_LABELS[status]}
      </Typography.P>
    </Horizon>
  );
};

Status.displayName = 'Status';

/** Действия со строкой. */
export const Actions: FC<HistoryCellProps> = ({ value: doc }) => {
  const { getAvailableActions } = useAuth();
  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(ROW_ACTIONS), executor, [[doc]]), [getAvailableActions, doc]);

  if (actions.length === 0) {
    return null;
  }

  return (
    <StopPropagation>
      <Box className={css.rowActions}>
        {actions.map(({ icon, name, onClick, dataAction }) => (
          <RegularButton
            key={name}
            extraSmall
            className={css.rowActionButton}
            data-action={dataAction}
            dimension={'MC'}
            icon={icon}
            onClick={onClick}
          />
        ))}
      </Box>
    </StopPropagation>
  );
};

Actions.displayName = 'Actions';
