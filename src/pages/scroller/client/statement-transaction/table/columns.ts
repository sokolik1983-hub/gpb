import { COLUMN_PADDING_TYPES, HEADER_ALIGN } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import { locale } from 'localization';
import type { Column } from 'react-table';
import { addMaxWidthField } from 'utils';
import { OperationDate, DocumentInfo, CounterpartyInfo, Outcome, Income, Purpose, Actions } from './cells';
import { COLUMN_NAMES } from './constants';

/**
 * Возвращает значение для ячейки.
 *
 * @param row - Строка скроллера.
 */
const accessor = (row: IStatementTransactionRow): IStatementTransactionRow => row;

/** Конфигурация колонок таблицы. */
export const columns: Array<Column<IStatementTransactionRow>> = addMaxWidthField([
  {
    Header: locale.transactionsScroller.headers.operationDate,
    id: COLUMN_NAMES.OPERATION_DATE,
    accessor,
    Cell: OperationDate,
    width: 160,
    paddingType: COLUMN_PADDING_TYPES.LEFT_REDUCED,
  },
  {
    Header: locale.transactionsScroller.headers.documentInfo,
    id: COLUMN_NAMES.DOCUMENT_INFO,
    accessor,
    Cell: DocumentInfo,
    width: 148,
  },
  {
    Header: locale.transactionsScroller.headers.counterparty,
    id: COLUMN_NAMES.COUNTERPARTY_INFO,
    accessor,
    Cell: CounterpartyInfo,
    width: 259,
  },
  {
    Header: locale.transactionsScroller.headers.outcome,
    id: COLUMN_NAMES.OUTCOME,
    accessor,
    Cell: Outcome,
    width: 239,
    headerAlign: HEADER_ALIGN.RIGHT,
  },
  {
    Header: locale.transactionsScroller.headers.income,
    id: COLUMN_NAMES.INCOME,
    accessor,
    Cell: Income,
    width: 239,
    headerAlign: HEADER_ALIGN.RIGHT,
  },
  {
    Header: locale.transactionsScroller.headers.purpose,
    id: COLUMN_NAMES.PURPOSE,
    accessor,
    Cell: Purpose,
    width: 205,
    disableSortBy: true,
    disableResizing: true,
    paddingType: COLUMN_PADDING_TYPES.RIGHT_REDUCED,
  },
  {
    id: COLUMN_NAMES.ACTIONS,
    accessor,
    Cell: Actions,
    width: 46,
    disableSortBy: true,
    disableResizing: true,
    paddingType: COLUMN_PADDING_TYPES.LEFT_REDUCED,
    innerFocus: true,
  },
]);
