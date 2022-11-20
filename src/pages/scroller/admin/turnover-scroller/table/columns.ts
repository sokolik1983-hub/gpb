import type { TurnoverCard } from 'interfaces/admin/dto/turnover';
import { locale } from 'localization';
import { accessor, addMaxWidthField } from 'utils/common';
import { OperationDateCell, AccountNumberCell, OrganizationCell, AccountBranchCell, ServiceBranchCell, ActionsCell } from './cells';
import { COLUMN_NAMES } from './constants';

/** Колонки таблмцы. */
export const columns = addMaxWidthField<TurnoverCard, { isVisible: boolean }>([
  {
    Cell: OperationDateCell,
    Header: locale.admin.turnoverScroller.columns.operationDate,
    accessor,
    id: COLUMN_NAMES.CREATION_DATE,
    width: 132,
    disableSortBy: true,
    isVisible: true,
  },
  {
    Cell: AccountNumberCell,
    Header: locale.admin.turnoverScroller.columns.accountNumber,
    accessor,
    id: COLUMN_NAMES.ACCOUNT_NUMBER,
    width: 216,
    isVisible: true,
  },
  {
    Cell: OrganizationCell,
    Header: locale.admin.turnoverScroller.columns.organization,
    accessor,
    id: COLUMN_NAMES.ORGANIZATION,
    width: 216,
    disableSortBy: true,
    isVisible: true,
  },
  {
    Cell: AccountBranchCell,
    Header: locale.admin.turnoverScroller.columns.accountBranch,
    accessor,
    id: COLUMN_NAMES.ACCOUNT_BRANCH,
    width: 200,
    disableSortBy: true,
    isVisible: true,
  },
  {
    Cell: ServiceBranchCell,
    Header: locale.admin.turnoverScroller.columns.serviceBranch,
    accessor,
    id: COLUMN_NAMES.SERVICE_BRANCH,
    width: 200,
    disableSortBy: true,
    isVisible: true,
  },
  {
    Cell: ActionsCell,
    disableResizing: true,
    disableSortBy: true,
    id: COLUMN_NAMES.ACTIONS,
    isVisible: true,
    width: 100,
  },
]);
