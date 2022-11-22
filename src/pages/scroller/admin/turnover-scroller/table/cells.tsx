import React, { useContext, useMemo } from 'react';
import { executor } from 'actions/admin';
import { StopPropagation } from 'components/common';
import type { TurnoverCard } from 'interfaces/admin/dto/turnover';
import { DATA_ACTION } from 'interfaces/data-action';
import { locale } from 'localization';
import type { CellProps } from 'react-table';
import { getActionButtons } from '@platform/core';
import { DATE_FORMAT, useAuth } from '@platform/services/admin';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import { Gap, Horizon, RegularButton, ServiceIcons, Typography, WithDropDown } from '@platform/ui';
import { ROW_ACTIONS } from '../action-config';
import type { ScrollerContextProps } from '../context';
import { ScrollerContext } from '../context';
import { FORM_FIELDS } from '../filter/constants';
import css from './styles.scss';

/** Компонент с ячейкой для отображения информации о дате. */
export const OperationDateCell: React.FC<CellProps<TurnoverCard>> = ({ value: { turnoverDate } }) => {
  const formattedDate = formatDateTime(turnoverDate, { keepLocalTime: true, format: DATE_FORMAT });

  return <Typography.P line="COLLAPSE">{formattedDate}</Typography.P>;
};

OperationDateCell.displayName = 'OperationDateCell';

/** Компонент с ячейкой для отображения номера счета. */
export const AccountNumberCell: React.FC<CellProps<TurnoverCard>> = ({ value: { account } }) => {
  const accountNumber = formatAccountCode(account?.number);

  return account ? <Typography.P line={'COLLAPSE'}>{accountNumber}</Typography.P> : null;
};

AccountNumberCell.displayName = 'AccountNumberCell';

/** Компонент с ячейкой для отображения информации об организации. */
export const OrganizationCell: React.FC<CellProps<TurnoverCard>> = ({ value: { account } }) =>
  account ? (
    <>
      <Typography.P line="COLLAPSE">{locale.common.inn({ inn: account?.bankClient?.inn })}</Typography.P>
      <Typography.Text>{account?.bankClient?.name}</Typography.Text>
    </>
  ) : null;

OrganizationCell.displayName = 'OrganizationCell';

/** Компонент с ячейкой для отображения о филиале баланса счёта. */
export const AccountBranchCell: React.FC<CellProps<TurnoverCard>> = ({ value: { balanceBranchCode } }) => (
  <Typography.P line="COLLAPSE">{balanceBranchCode}</Typography.P>
);

AccountBranchCell.displayName = 'AccountBranchCell';

/** Компонент с ячейкой для отображения информации о филиале обслуживания. */
export const ServiceBranchCell: React.FC<CellProps<TurnoverCard>> = ({ value: { serviceBranchCode } }) => (
  <Typography.P line="COLLAPSE">{serviceBranchCode}</Typography.P>
);

ServiceBranchCell.displayName = 'ServiceBranchCell';

/** Компонент с ячейкой для экшонов для строки. */
export const ActionsCell: React.FC<CellProps<TurnoverCard>> = ({ row: { original: doc } }) => {
  const { getAvailableActions } = useAuth();
  const { filters } = useContext<ScrollerContextProps>(ScrollerContext);

  const params = useMemo(() => [[doc], filters[FORM_FIELDS.DATE_FROM]?.value, filters[FORM_FIELDS.DATE_TO]?.value], [doc, filters]);
  const actions = useMemo(() => getActionButtons(getAvailableActions(ROW_ACTIONS), executor, params), [getAvailableActions, params]);

  if (actions.length === 0) {
    return null;
  }

  const visibleActions = actions.slice(0, 1);
  const dropDownActions = actions.slice(1);

  return (
    <StopPropagation>
      <Horizon allHeight={false}>
        {visibleActions.map(({ icon, name, onClick }) => (
          <RegularButton key={name} extraSmall className={css.action} data-action={name} dimension={'MC'} icon={icon} onClick={onClick} />
        ))}

        {dropDownActions.length > 0 && (
          <>
            <Gap.XS />
            <WithDropDown extraSmall actions={dropDownActions} offset={6} radius="XS" shadow="LG">
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
          </>
        )}
      </Horizon>
    </StopPropagation>
  );
};

ActionsCell.displayName = 'ActionsCell';
