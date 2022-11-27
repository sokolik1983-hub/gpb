import type { MaintenanceRow } from 'interfaces/admin';
import type { CellProps } from 'react-table';

/** Свойства ячеек таблицы журнала технических работ. */
export type MaintenanceCellProps = CellProps<MaintenanceRow, MaintenanceRow>;
