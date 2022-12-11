import type { IStatementScheduleRow } from 'interfaces/client';
import { locale } from 'localization';
import { addMaxWidthField } from 'utils/common';
import { CreatedAtCell, AccountNumber, Period, Method, Actions, ScheduleEndDate } from './cells';
import { COLUMN_NAMES } from './constants';

/**
 * Возвращает значение для ячейки.
 *
 * @param row - Строка скроллера.
 */
const accessor = (row: IStatementScheduleRow): IStatementScheduleRow => row;

/** Возвращает конфигурацию колонок таблицы. */
export const columns = addMaxWidthField<IStatementScheduleRow, { isVisible: boolean; optionLabel?: string }>([
  {
    Header: locale.client.scheduleScroller.columns.createdAt,
    id: COLUMN_NAMES.CREATED_AT,
    accessor,
    Cell: CreatedAtCell,
    width: 140,
    isVisible: true,
  },
  {
    Header: locale.client.scheduleScroller.columns.accountsIds,
    id: COLUMN_NAMES.ACCOUNTS,
    accessor,
    Cell: AccountNumber,
    width: 430,
    isVisible: true,
  },
  {
    Header: locale.client.scheduleScroller.columns.periodType,
    id: COLUMN_NAMES.PERIOD,
    accessor,
    Cell: Period,
    width: 230,
    isVisible: true,
  },
  {
    Header: locale.client.scheduleScroller.columns.scheduleMethod,
    id: COLUMN_NAMES.SCHEDULE_METHOD,
    accessor,
    Cell: Method,
    width: 330,
    isVisible: true,
  },
  {
    Header: locale.client.scheduleScroller.columns.scheduleEndDate,
    id: COLUMN_NAMES.SCHEDULE_END_DATE,
    accessor,
    Cell: ScheduleEndDate,
    width: 330,
    isVisible: true,
  },
  {
    id: COLUMN_NAMES.ACTIONS,
    accessor,
    Cell: Actions,
    width: 60,
    disableSortBy: true,
    disableResizing: true,
    isVisible: true,
  },
]);
