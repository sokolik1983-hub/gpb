import type { STATEMENT_STATUSES, DATE_PERIODS } from 'interfaces';
import type { EMPTY_VALUE } from 'stream-constants';

/** Стейт формы фильтрации. */
export interface IFormState {
  /** Дата. */
  createdAt: string;
  /** Дата с. */
  dateFrom?: string;
  /** Дата по. */
  dateTo?: string;
  /** Счета. */
  accountIds: string[];
  /** Временной период. */
  periodType: DATE_PERIODS | typeof EMPTY_VALUE;
  /** Статус. */
  status: STATEMENT_STATUSES | typeof EMPTY_VALUE;
  /** Наличие ЭП. */
  signed: boolean;
}
