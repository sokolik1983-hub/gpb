import { COLUMN_PADDING_TYPES, HEADER_ALIGN } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import { locale } from 'localization';
import { addMaxWidthField } from 'utils';
import { OperationDate, DocumentInfo, CounterpartyInfo, Outcome, Income, Actions } from './cells';
import { COLUMN_NAMES } from './constants';

/**
 * Возвращает значение для ячейки.
 *
 * @param row - Строка скроллера.
 */
const accessor = (row: IStatementTransactionRow): IStatementTransactionRow => row;

/** Конфигурация колонок таблицы. */
export const columns = addMaxWidthField<IStatementTransactionRow, { isVisible: boolean }>([
  {
    Header: locale.transactionsScroller.headers.operationDate,
    id: COLUMN_NAMES.OPERATION_DATE,
    accessor,
    Cell: OperationDate,
    width: 160,
    paddingType: COLUMN_PADDING_TYPES.LEFT_REDUCED,
    isVisible: true,
  },
  {
    Header: locale.transactionsScroller.headers.documentInfo,
    id: COLUMN_NAMES.DOCUMENT_INFO,
    accessor,
    Cell: DocumentInfo,
    width: 148,
    isVisible: true,
  },
  {
    Header: locale.transactionsScroller.headers.counterparty,
    id: COLUMN_NAMES.COUNTERPARTY_INFO,
    accessor,
    Cell: CounterpartyInfo,
    width: 433,
    isVisible: true,
  },
  {
    Header: locale.transactionsScroller.headers.outcome,
    id: COLUMN_NAMES.OUTCOME,
    accessor,
    Cell: Outcome,
    width: 218,
    headerAlign: HEADER_ALIGN.RIGHT,
    isVisible: true,
  },
  {
    Header: locale.transactionsScroller.headers.income,
    id: COLUMN_NAMES.INCOME,
    accessor,
    Cell: Income,
    width: 239,
    headerAlign: HEADER_ALIGN.RIGHT,
    isVisible: true,
  },
  {
    id: COLUMN_NAMES.ACTIONS,
    accessor,
    Cell: Actions,
    width: 100,
    disableSortBy: true,
    disableResizing: true,
    paddingType: COLUMN_PADDING_TYPES.LEFT_REDUCED,
    innerFocus: true,
    isVisible: true,
  },
]);
