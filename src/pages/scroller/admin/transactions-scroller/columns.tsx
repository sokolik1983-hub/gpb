import { COLUMN_PADDING_TYPES, HEADER_ALIGN } from 'interfaces';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import { accessor, addMaxWidthField } from 'utils/common';
import { AccountInfo, Actions, CounterpartyInfo, EntryDate, DocumentInfo, Summary, Outcome, Income } from './cells';
import { COLUMN_NAMES } from './constants';

/** Колонки для подстрок таблицы. */
export const columns = addMaxWidthField<BankAccountingEntryCard, { isVisible: boolean; optionLabel?: string }>([
  {
    Header: locale.admin.transactionsScroller.columns.date,
    id: COLUMN_NAMES.DATE,
    Cell: EntryDate,
    width: 145,
    isVisible: true,
    accessor,
  },
  {
    Header: locale.admin.transactionsScroller.columns.account,
    id: COLUMN_NAMES.ACCOUNT,
    Cell: AccountInfo,
    width: 215,
    isVisible: true,
    accessor,
    disableSortBy: true,
  },
  {
    Header: locale.admin.transactionsScroller.columns.document,
    id: COLUMN_NAMES.DOCUMENT,
    Cell: DocumentInfo,
    width: 120,
    isVisible: true,
    accessor,
  },
  {
    Header: locale.admin.transactionsScroller.columns.counterparty,
    id: COLUMN_NAMES.COUNTERPARTY,
    Cell: CounterpartyInfo,
    width: 320,
    isVisible: true,
    accessor,
  },
  {
    Header: locale.admin.transactionsScroller.columns.outcome,
    optionLabel: locale.admin.transactionsScroller.columns.outcome,
    id: COLUMN_NAMES.OUTCOME,
    Cell: Outcome,
    width: 145,
    headerAlign: HEADER_ALIGN.RIGHT,
    isVisible: false,
    accessor,
  },
  {
    Header: locale.admin.transactionsScroller.columns.income,
    optionLabel: locale.admin.transactionsScroller.columns.income,
    id: COLUMN_NAMES.INCOME,
    Cell: Income,
    width: 145,
    headerAlign: HEADER_ALIGN.RIGHT,
    isVisible: false,
    accessor,
  },
  {
    Header: locale.admin.transactionsScroller.columns.summary,
    id: COLUMN_NAMES.SUMMARY,
    Cell: Summary,
    width: 290,
    headerAlign: HEADER_ALIGN.RIGHT,
    paddingType: COLUMN_PADDING_TYPES.RIGHT_REDUCED,
    isVisible: true,
    accessor,
  },
  {
    id: COLUMN_NAMES.ACTIONS,
    Cell: Actions,
    width: 100,
    disableSortBy: true,
    disableResizing: true,
    innerFocus: true,
    isVisible: true,
    accessor,
  },
]);
