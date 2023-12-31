import type { IAccountTurnoversInfo, IGroupedAccounts, IGroupInfo } from 'interfaces/dto';
import { GROUPING_VALUES } from 'interfaces/dto';
import { locale } from 'localization';
import type { Column } from 'react-table';
import { addMaxWidthField } from 'utils/common';
import { AccountNumberCell, OrganizationCell, IncomingBalanceCell, OutcomeCell, IncomeCell, OutgoingBalanceCell } from './cells';
import { COLUMN_NAMES } from './constants';
import { isGroupedAccounts } from './utils';

/**
 * Возвращает значение для ячейки.
 *
 * @param row - Либо строка скроллера, с подстроками. Либо подстрока скроллера.
 */
const accessor = (row: IAccountTurnoversInfo | IGroupedAccounts): IAccountTurnoversInfo | IGroupInfo => {
  if (isGroupedAccounts(row)) {
    return row.groupInfo;
  }

  return row;
};

/**
 * Возвращает конфигурацию колонок таблицы.
 *
 * @param grouping - Значение группировки которое пользователь выбрал на форме фильтрации.
 */
export const getColumns = (grouping: GROUPING_VALUES): Array<Column<IGroupedAccounts> & { isVisible: boolean }> => {
  const isOrganizationColumnVisible = ![GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES, GROUPING_VALUES.ORGANIZATIONS].includes(grouping);

  return addMaxWidthField<IGroupedAccounts, { isVisible: boolean }>([
    ...(isOrganizationColumnVisible
      ? [
          {
            Header: locale.turnoverScroller.headers.organization,
            id: COLUMN_NAMES.ORGANIZATION_NAME,
            accessor,
            Cell: OrganizationCell,
            disableSortBy: true,
            width: 204,
            isVisible: true,
          },
        ]
      : []),
    {
      Header: locale.turnoverScroller.headers.accountNumber,
      id: COLUMN_NAMES.ACCOUNT_NUMBER,
      accessor,
      Cell: AccountNumberCell,
      disableSortBy: true,
      width: isOrganizationColumnVisible ? 266 : 432,
      isVisible: true,
    },
    {
      Header: locale.turnoverScroller.headers.incomingBalance,
      id: COLUMN_NAMES.INCOMING_BALANCE,
      accessor,
      Cell: IncomingBalanceCell,
      disableSortBy: false,
      width: isOrganizationColumnVisible ? 229 : 224,
      isVisible: true,
    },
    {
      Header: locale.turnoverScroller.headers.outcome,
      id: COLUMN_NAMES.OUTCOME,
      accessor,
      Cell: OutcomeCell,
      disableSortBy: false,
      width: isOrganizationColumnVisible ? 200 : 224,
      isVisible: true,
    },
    {
      Header: locale.turnoverScroller.headers.income,
      id: COLUMN_NAMES.INCOME,
      accessor,
      Cell: IncomeCell,
      disableSortBy: false,
      width: isOrganizationColumnVisible ? 200 : 224,
      isVisible: true,
    },
    {
      Header: locale.turnoverScroller.headers.outgoingBalance,
      id: COLUMN_NAMES.OUTGOING_BALANCE,
      accessor,
      Cell: OutgoingBalanceCell,
      disableSortBy: false,
      width: isOrganizationColumnVisible ? 229 : 224,
      isVisible: true,
    },
  ]);
};
