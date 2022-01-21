import type { IStatementTransactionRow } from 'interfaces/client';
import { locale } from 'localization';
import type { Column } from 'react-table';
import { OperationDate, DocumentInfo, CounterpartyInfo, Outcome, Income, Purpose } from './cells';
import { COLUMN_NAMES } from './constants';

/**
 * Возвращает значение для ячейки.
 *
 * @param row - Строка скроллера.
 */
const accessor = (row: IStatementTransactionRow): IStatementTransactionRow => row;

/** Конфигурация колонок таблицы. */
export const columns: Array<Column<IStatementTransactionRow>> = [
  {
    Header: locale.transactionsScroller.headers.operationDate,
    id: COLUMN_NAMES.OPERATION_DATE,
    accessor,
    Cell: OperationDate,
    width: 160,
    maxWidth: Number.POSITIVE_INFINITY, // Без этой строки react-table в IE рассчитывает ширину колонки как "NaNpx"
  },
  {
    Header: locale.transactionsScroller.headers.documentInfo,
    id: COLUMN_NAMES.DOCUMENT_INFO,
    accessor,
    Cell: DocumentInfo,
    width: 148,
    maxWidth: Number.POSITIVE_INFINITY, // Без этой строки react-table в IE рассчитывает ширину колонки как "NaNpx"
  },
  {
    Header: locale.transactionsScroller.headers.counterparty,
    id: COLUMN_NAMES.COUNTERPARTY_INFO,
    accessor,
    Cell: CounterpartyInfo,
    width: 259,
    maxWidth: Number.POSITIVE_INFINITY, // Без этой строки react-table в IE рассчитывает ширину колонки как "NaNpx"
  },
  {
    Header: locale.transactionsScroller.headers.outcome,
    id: COLUMN_NAMES.OUTCOME,
    accessor,
    Cell: Outcome,
    width: 239,
    maxWidth: Number.POSITIVE_INFINITY, // Без этой строки react-table в IE рассчитывает ширину колонки как "NaNpx"
    disableSortBy: true,
  },
  {
    Header: locale.transactionsScroller.headers.income,
    id: COLUMN_NAMES.INCOME,
    accessor,
    Cell: Income,
    width: 239,
    maxWidth: Number.POSITIVE_INFINITY, // Без этой строки react-table в IE рассчитывает ширину колонки как "NaNpx"
    disableSortBy: true,
  },
  {
    Header: locale.transactionsScroller.headers.purpose,
    id: COLUMN_NAMES.PURPOSE,
    accessor,
    Cell: Purpose,
    width: 251,
    maxWidth: Number.POSITIVE_INFINITY, // Без этой строки react-table в IE рассчитывает ширину колонки как "NaNpx"
    disableSortBy: true,
  },
];
