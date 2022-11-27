import type { ReconciliationTurnoverRow } from 'interfaces/admin';
import type { CellProps } from 'react-table';

/** Свойства ячеек таблицы сверки остатков/оборотов. */
export type ReconciliationTurnoverCellProps = CellProps<ReconciliationTurnoverRow, ReconciliationTurnoverRow>;
