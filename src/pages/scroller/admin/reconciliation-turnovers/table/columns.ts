import type { ReconciliationTurnoverRow } from 'interfaces/admin';
import { locale } from 'localization';
import {
  AccountNumber,
  OperationDate,
  ReconciliationDate,
  RecordSource,
  Status,
} from 'pages/scroller/admin/reconciliation-turnovers/table/cells';
import { COLUMN_NAMES } from 'pages/scroller/admin/reconciliation-turnovers/table/constants';
import { accessor, addMaxWidthField } from 'utils/common';

/** Конфигурация колонок таблицы журнала сверки остатков/оборотов. */
export const columns = addMaxWidthField<ReconciliationTurnoverRow, { isVisible: boolean }>([
  {
    Cell: OperationDate,
    Header: locale.admin.reconciliationTurnoversScroller.table.header.operationDate,
    accessor,
    id: COLUMN_NAMES.OPERATION_DATE,
    isVisible: true,
    maxWidth: 208,
    minWidth: 138,
    width: 188,
  },
  {
    Cell: AccountNumber,
    Header: locale.admin.reconciliationTurnoversScroller.table.header.accountNumber,
    accessor,
    id: COLUMN_NAMES.ACCOUNT_NUMBER,
    isVisible: true,
    maxWidth: 350,
    minWidth: 230,
    width: 300,
  },
  {
    Cell: ReconciliationDate,
    Header: locale.admin.reconciliationTurnoversScroller.table.header.reconciliationDate,
    accessor,
    disableSortBy: true,
    id: COLUMN_NAMES.RECONCILIATION_DATE,
    isVisible: true,
    maxWidth: 208,
    minWidth: 138,
    width: 188,
  },
  {
    Cell: RecordSource,
    Header: locale.admin.reconciliationTurnoversScroller.table.header.recordSource,
    accessor,
    disableSortBy: true,
    id: COLUMN_NAMES.RECORD_SOURCE,
    isVisible: true,
    maxWidth: 390,
    minWidth: 190,
    width: 362,
  },
  {
    Cell: Status,
    Header: locale.admin.reconciliationTurnoversScroller.table.header.status,
    accessor,
    disableSortBy: true,
    id: COLUMN_NAMES.STATUS,
    isVisible: true,
    maxWidth: 310,
    minWidth: 150,
    width: 260,
  },
]);
