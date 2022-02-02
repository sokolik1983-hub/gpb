import { STATEMENT_ACTION_TYPES, STATEMENT_REQUEST_STATUSES } from 'interfaces';
import type { IStatementHistoryRow } from 'interfaces/client';

/**
 * Гард для контроля доступности экспорта выписки.
 *
 * @throws Error.
 */
export const exportGuardian = ([doc]: [IStatementHistoryRow]) => {
  if (doc.action === STATEMENT_ACTION_TYPES.VIEW || doc.status !== STATEMENT_REQUEST_STATUSES.EXECUTED) {
    throw new Error('UNAVAILABLE_EXPORT_DOCUMENT');
  }
};
