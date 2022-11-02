import type { DATE_PERIODS } from 'interfaces';

/** Свойства полей формы фильтрации скроллера журнала закрытых дней. */
export interface FilterValues {
  /** Филиал. */
  branchId: string;
  /** Начало периода. */
  dateFrom: string;
  /** Конец периода. */
  dateTo: string;
  /** Тип периода. */
  periodType: DATE_PERIODS;
}
