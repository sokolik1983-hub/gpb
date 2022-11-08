import type { CurrencyRateRow } from 'interfaces/admin';
import type { CellProps } from 'react-table';

/** Свойства ячеек таблицы справочника курсов валют. */
export type CurrencyRateCellProps = CellProps<CurrencyRateRow, CurrencyRateRow>;
