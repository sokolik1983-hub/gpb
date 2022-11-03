import React, { useMemo } from 'react';
import { executor } from 'actions/admin';
import { StopPropagation } from 'components/common';
import type { ITurnoverMockDto } from 'interfaces/admin/dto/turnover-mock-dto';
import { DATA_ACTION } from 'interfaces/data-action';
import { locale } from 'localization';
import type { CellProps } from 'react-table';
import { getActionButtons } from '@platform/core';
import { DATE_FORMAT, useAuth } from '@platform/services/admin';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import { Gap, Horizon, RegularButton, ServiceIcons, Typography, WithDropDown } from '@platform/ui';
import { ROW_ACTIONS } from '../action-config';
import css from './styles.scss';

/** Компонент с ячейкой для отображения информации о дате. */
export const OperationDateCell: React.FC<CellProps<ITurnoverMockDto>> = ({ value: { operationDate } }) => {
  const formattedEntryDate = formatDateTime(operationDate, { keepLocalTime: true, format: DATE_FORMAT });

  return <Typography.P line="COLLAPSE">{formattedEntryDate}</Typography.P>;
};

OperationDateCell.displayName = 'OperationDateCell';

/** Компонент с ячейкой для отображения номера счета. */
export const AccountNumberCell: React.FC<CellProps<ITurnoverMockDto>> = ({
  value: {
    account: { number },
  },
}) => {
  const accountNumber = formatAccountCode(number);

  return <Typography.P line={'COLLAPSE'}>{accountNumber}</Typography.P>;
};

AccountNumberCell.displayName = 'AccountNumberCell';

/** Компонент с ячейкой для отображения информации об организации. */
export const OrganizationCell: React.FC<CellProps<ITurnoverMockDto>> = ({
  value: {
    account: {
      bankClient: { inn, name },
    },
  },
}) => (
  <>
    <Typography.P line="COLLAPSE">{locale.common.inn({ inn })}</Typography.P>
    <Typography.Text>{name}</Typography.Text>
  </>
);

OrganizationCell.displayName = 'OrganizationCell';

/** Компонент с ячейкой для отображения о филиале баланса счёта. */
export const AccountBranchCell: React.FC<CellProps<ITurnoverMockDto>> = ({
  value: {
    serviceBranch: { absCode, filialName },
  },
}) => (
  <>
    <Typography.P line="COLLAPSE">{absCode}</Typography.P>
    <Typography.Text>{filialName}</Typography.Text>
  </>
);

AccountBranchCell.displayName = 'AccountBranchCell';

/** Компонент с ячейкой для отображения информации о филиале обслуживания. */
export const ServiceBranchCell: React.FC<CellProps<ITurnoverMockDto>> = ({
  value: {
    accountBranch: { absCode, filialName },
  },
  // eslint-disable-next-line sonarjs/no-identical-functions
}) => (
  <>
    <Typography.P line="COLLAPSE">{absCode}</Typography.P>
    <Typography.Text>{filialName}</Typography.Text>
  </>
);

ServiceBranchCell.displayName = 'ServiceBranchCell';

/** Компонент с ячейкой для экшонов для строки. */
export const ActionsCell: React.FC<CellProps<ITurnoverMockDto>> = ({ row: { original: doc } }) => {
  const { getAvailableActions } = useAuth();

  const params = useMemo(() => [[doc], '', ''], [doc]);
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
