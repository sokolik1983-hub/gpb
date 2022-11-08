import type { RECONCILIATION_STATUS } from 'interfaces/admin';

/** Свойства полей формы фильтрации скроллера сверки остатков/оборотов. */
export interface FilterValues {
  /** Идентификатор счета. */
  accountId: string;
  /** Начало периода. */
  dateFrom: string;
  /** Конец периода. */
  dateTo: string;
  /** Статус сверки. */
  status: RECONCILIATION_STATUS;
}
