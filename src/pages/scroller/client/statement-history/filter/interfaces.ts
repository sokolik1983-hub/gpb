import type { STATEMENT_STATUSES } from 'interfaces';
import type { DATE_PERIODS } from 'interfaces/client';
import type { EMPTY_VALUE } from 'stream-constants';

/** Стейт формы фильтрации. */
export interface IFormState {
  /** Дата. */
  date: string;
  /** Дата с. */
  dateFrom?: string;
  /** Дата по. */
  dateTo?: string;
  /** Счета. */
  selectedAccounts: string[];
  /** Временной период. */
  datePeriod: DATE_PERIODS | typeof EMPTY_VALUE;
  /** Статус. */
  status: STATEMENT_STATUSES | typeof EMPTY_VALUE;
  /** Наличие ЭП. */
  signaturePresence: boolean;
}
