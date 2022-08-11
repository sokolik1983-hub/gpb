import React from 'react';
import { COLUMN_PADDING_TYPES, HEADER_ALIGN } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import { locale } from 'localization';
import type { Column } from 'react-table';
import { addMaxWidthField } from 'utils';
import { Typography } from '@platform/ui';
import { Actions, CounterpartyInfo, DocumentInfo, Income, OperationDate, Outcome, Summary } from './cells';
import { COLUMN_NAMES } from './constants';
import css from './styles.scss';

/**
 * Возвращает значение для ячейки.
 *
 * @param row - Строка скроллера.
 */
const accessor = (row: IStatementTransactionRow): IStatementTransactionRow => row;

const HeaderNationalCurrency = ({ children }) => (
  <Typography.TextBold align="RIGHT" className={css.natCurrencyHeader}>
    {children}
    <Typography.Text className={css.natCurrencyHeaderText} fill="FAINT">
      {locale.transactionsScroller.labels.nationalCurrency}
    </Typography.Text>
  </Typography.TextBold>
);

/** Возвращает конфигурацию колонок таблицы. */
export const getColumns = (
  isNationalCurrency: boolean
): Array<Column<IStatementTransactionRow> & { isVisible: boolean; optionLabel?: string }> =>
  addMaxWidthField<IStatementTransactionRow, { isVisible: boolean; optionLabel?: string }>([
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
      Header: isNationalCurrency ? (
        <HeaderNationalCurrency>{locale.transactionsScroller.headers.outcome}</HeaderNationalCurrency>
      ) : (
        locale.transactionsScroller.headers.outcome
      ),
      optionLabel: locale.transactionsScroller.headers.outcome,
      id: COLUMN_NAMES.OUTCOME,
      accessor,
      Cell: Outcome,
      width: 218,
      headerAlign: HEADER_ALIGN.RIGHT,
      isVisible: true,
    },
    {
      Header: isNationalCurrency ? (
        <HeaderNationalCurrency>{locale.transactionsScroller.headers.income}</HeaderNationalCurrency>
      ) : (
        locale.transactionsScroller.headers.income
      ),
      optionLabel: locale.transactionsScroller.headers.income,
      id: COLUMN_NAMES.INCOME,
      accessor,
      Cell: Income,
      width: 239,
      headerAlign: HEADER_ALIGN.RIGHT,
      isVisible: true,
    },
    {
      Header: isNationalCurrency ? (
        <HeaderNationalCurrency>{locale.transactionsScroller.headers.summary}</HeaderNationalCurrency>
      ) : (
        locale.transactionsScroller.headers.summary
      ),
      id: COLUMN_NAMES.SUMMARY,
      accessor,
      Cell: Summary,
      optionLabel: locale.transactionsScroller.labels.summary,
      width: 457,
      headerAlign: HEADER_ALIGN.RIGHT,
      isVisible: false,
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
