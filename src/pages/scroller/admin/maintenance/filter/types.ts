import type { DATE_PERIODS } from 'interfaces';
import type { MAINTENANCE_TYPE } from 'interfaces/admin';

/** Свойства полей формы фильтра журнала технических работ. */
export interface FilterValues {
  /** Начало периода. */
  dateFrom: string;
  /** Конец периода. */
  dateTo: string;
  /** Тип события технических работ. */
  maintenanceTypeDto: MAINTENANCE_TYPE;
  /** Тип периода. */
  periodType: DATE_PERIODS;
}
