import type { IStatementHistoryRow } from 'interfaces/client';
import { locale } from 'localization';
import { addMaxWidthField } from 'utils';
import { AccountNumber, Actions, CreatedAtCell, Period, StatementFormat, Status } from './cells';
import { COLUMN_NAMES } from './constants';

/**
 * Возвращает значение для ячейки.
 *
 * @param row - Строка скроллера.
 */
const accessor = (row: IStatementHistoryRow): IStatementHistoryRow => row;

/** Конфигурация колонок таблицы. */
export const columns = addMaxWidthField<IStatementHistoryRow, { isVisible: boolean }>([
  {
    Header: locale.historyScroller.headers.createdAt,
    id: COLUMN_NAMES.CREATED_AT,
    accessor,
    Cell: CreatedAtCell,
    width: 156,
    maxWidth: 156,
    minWidth: 125,
    isVisible: true,
  },
  {
    Header: locale.historyScroller.headers.accountNumber,
    id: COLUMN_NAMES.ACCOUNT_NUMBER,
    accessor,
    Cell: AccountNumber,
    width: 390,
    maxWidth: 390,
    minWidth: 125,
    disableSortBy: true,
    isVisible: true,
  },
  {
    Header: locale.historyScroller.headers.period,
    id: COLUMN_NAMES.PERIOD_TYPE,
    accessor,
    Cell: Period,
    width: 268,
    maxWidth: 268,
    minWidth: 125,
    isVisible: true,
  },
  {
    Header: locale.historyScroller.headers.statementFormat,
    id: COLUMN_NAMES.STATEMENT_FORMAT,
    accessor,
    Cell: StatementFormat,
    width: 200,
    maxWidth: 200,
    minWidth: 125,
    isVisible: true,
  },
  {
    Header: locale.historyScroller.headers.status,
    id: COLUMN_NAMES.STATUS,
    accessor,
    Cell: Status,
    width: 210,
    maxWidth: 210,
    minWidth: 125,
    disableResizing: true,
    isVisible: true,
  },
  {
    id: COLUMN_NAMES.ACTIONS,
    accessor,
    Cell: Actions,
    disableResizing: true,
    disableSortBy: true,
    width: 96,
    maxWidth: 96,
    minWidth: 125,
    innerFocus: true,
    isVisible: true,
  },
]);
