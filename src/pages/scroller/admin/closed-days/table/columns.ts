import type { ClosedDayRow } from 'interfaces/admin';
import { locale } from 'localization';
import { Branch, OperationDate, SecondPhase, ThirdPhase } from 'pages/scroller/admin/closed-days/table/cells';
import { COLUMN_NAMES } from 'pages/scroller/admin/closed-days/table/constants';
import { accessor, addMaxWidthField } from 'utils/common';

/** Конфигурация колонок таблицы журнала закрытых дней. */
export const columns = addMaxWidthField<ClosedDayRow, { isVisible: boolean }>([
  {
    Cell: OperationDate,
    Header: locale.admin.closedDaysScroller.table.header.operationDate,
    accessor,
    id: COLUMN_NAMES.OPERATION_DATE,
    isVisible: true,
    maxWidth: 258,
    minWidth: 138,
    width: 188,
  },
  {
    Cell: Branch,
    Header: locale.admin.closedDaysScroller.table.header.branch,
    accessor,
    disableSortBy: true,
    id: COLUMN_NAMES.BRANCH,
    isVisible: true,
    maxWidth: 430,
    minWidth: 280,
    width: 380,
  },
  {
    Cell: SecondPhase,
    Header: locale.admin.closedDaysScroller.table.header.secondPhase,
    accessor,
    disableSortBy: true,
    id: COLUMN_NAMES.SECOND_PHASE,
    isVisible: true,
    maxWidth: 430,
    minWidth: 280,
    width: 380,
  },
  {
    Cell: ThirdPhase,
    Header: locale.admin.closedDaysScroller.table.header.thirdPhase,
    accessor,
    disableSortBy: true,
    id: COLUMN_NAMES.THIRD_PHASE,
    isVisible: true,
    maxWidth: 430,
    minWidth: 280,
    width: 380,
  },
]);
