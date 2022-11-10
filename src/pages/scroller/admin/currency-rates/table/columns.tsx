import React from 'react';
import type { CurrencyRateRow } from 'interfaces/admin';
import { locale } from 'localization';
import { Cell } from 'pages/scroller/admin/currency-rates/table/cell';
import { COLUMN_NAMES } from 'pages/scroller/admin/currency-rates/table/constants';
import type { CurrencyRateCellProps } from 'pages/scroller/admin/currency-rates/table/types';
import { accessor, addMaxWidthField } from 'utils/common';

/** Конфигурация колонок таблицы справочника курсов валют. */
export const columns = addMaxWidthField<CurrencyRateRow, { isVisible: boolean }>([
  {
    // eslint-disable-next-line react/display-name
    Cell: ({ value: { letterCode } }: CurrencyRateCellProps) => <Cell value={letterCode} />,
    Header: locale.admin.currencyRatesScroller.table.header.letterCode,
    accessor,
    id: COLUMN_NAMES.LETTER_CODE,
    isVisible: true,
    maxWidth: 200,
    minWidth: 100,
    width: 150,
  },
  {
    // eslint-disable-next-line react/display-name
    Cell: ({ value: { units } }: CurrencyRateCellProps) => <Cell value={units} />,
    Header: locale.admin.currencyRatesScroller.table.header.units,
    accessor,
    disableSortBy: true,
    id: COLUMN_NAMES.UNITS,
    isVisible: true,
    maxWidth: 170,
    minWidth: 80,
    width: 120,
  },
  {
    // eslint-disable-next-line react/display-name
    Cell: ({ value: { rateValue } }: CurrencyRateCellProps) => <Cell value={rateValue} />,
    Header: locale.admin.currencyRatesScroller.table.header.rateValue,
    accessor,
    disableSortBy: true,
    id: COLUMN_NAMES.RATE_VALUE,
    isVisible: true,
    maxWidth: 320,
    minWidth: 120,
    width: 220,
  },
  {
    // eslint-disable-next-line react/display-name
    Cell: ({ value: { rateDate } }: CurrencyRateCellProps) => <Cell value={rateDate} />,
    Header: locale.admin.currencyRatesScroller.table.header.rateDate,
    accessor,
    id: COLUMN_NAMES.RATE_DATE,
    isVisible: true,
    maxWidth: 240,
    minWidth: 140,
    width: 190,
  },
]);
