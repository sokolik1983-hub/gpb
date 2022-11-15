import type { StatementHistoryRow } from 'interfaces/admin';
import type { CellProps } from 'react-table';

/** Свойства ячеек таблицы истории. */
export type StatementHistoryCellProps = CellProps<StatementHistoryRow, StatementHistoryRow>;
