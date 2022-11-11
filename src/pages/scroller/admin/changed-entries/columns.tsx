import { COLUMN_PADDING_TYPES, HEADER_ALIGN } from 'interfaces';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import { accessor, addMaxWidthField } from 'utils/common';
import { AccountInfo, Actions, CounterpartyInfo, EntryDate, DocumentInfo, Summary, Outcome, Income, Status } from './cells';
import { COLUMN_NAMES } from './constants';

/** Колонки для подстрок таблицы. */
export const columns = addMaxWidthField<BankAccountingEntryCard, { isVisible: boolean; optionLabel?: string }>([
  {
    Header: locale.admin.changedEntriesScroller.columns.date,
    id: COLUMN_NAMES.DATE,
    Cell: EntryDate,
    width: 125,
    isVisible: true,
    accessor,
  },
  {
    Header: locale.admin.changedEntriesScroller.columns.account,
    id: COLUMN_NAMES.ACCOUNT,
    Cell: AccountInfo,
    width: 215,
    isVisible: true,
    accessor,
    disableSortBy: true,
  },
  {
    Header: locale.admin.changedEntriesScroller.columns.document,
    id: COLUMN_NAMES.DOCUMENT,
    Cell: DocumentInfo,
    width: 120,
    isVisible: true,
    accessor,
  },
  {
    Header: locale.admin.changedEntriesScroller.columns.counterparty,
    id: COLUMN_NAMES.COUNTERPARTY,
    Cell: CounterpartyInfo,
    width: 216,
    isVisible: true,
    accessor,
  },
  {
    Header: locale.admin.changedEntriesScroller.columns.status,
    id: COLUMN_NAMES.STATUS,
    Cell: Status,
    width: 120,
    isVisible: true,
    accessor,
  },
  {
    Header: locale.admin.changedEntriesScroller.columns.outcome,
    optionLabel: locale.admin.changedEntriesScroller.columns.outcome,
    id: COLUMN_NAMES.OUTCOME,
    Cell: Outcome,
    width: 120,
    headerAlign: HEADER_ALIGN.RIGHT,
    isVisible: false,
    accessor,
  },
  {
    Header: locale.admin.changedEntriesScroller.columns.income,
    optionLabel: locale.admin.changedEntriesScroller.columns.income,
    id: COLUMN_NAMES.INCOME,
    Cell: Income,
    width: 120,
    headerAlign: HEADER_ALIGN.RIGHT,
    isVisible: false,
    accessor,
  },
  {
    Header: locale.admin.changedEntriesScroller.columns.summary,
    id: COLUMN_NAMES.SUMMARY,
    Cell: Summary,
    width: 240,
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
