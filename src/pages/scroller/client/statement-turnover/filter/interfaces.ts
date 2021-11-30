import type { DATE_PERIODS, GROUPING_VALUES } from 'interfaces/client';

/** Стейт формы фильтрации. */
export interface IFormState {
  /** Начало периода.  */
  dateFrom?: string;
  /** Конец периода. */
  dateTo?: string;
  /** Выбранные счета клиента. */
  accounts: string[];
  /** Группировка записей. */
  groupBy: GROUPING_VALUES;
  /** Только активные счета. */
  onlyActiveAccounts: boolean;
  /** Временной период. */
  datePeriod: DATE_PERIODS;
}
