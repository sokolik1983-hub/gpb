import { STATEMENT_REQUEST_STATUSES } from 'interfaces';
import type { IStatementHistoryRow } from 'interfaces/client';
import { ACTION } from 'interfaces/client';

/**
 * Гард для контроля доступности экспорта выписки.
 *
 * @throws Error.
 */
export const rowHistoryExportGuardian = ([doc]: [IStatementHistoryRow]) => {
  if (doc.action === ACTION.VIEW || doc.status !== STATEMENT_REQUEST_STATUSES.EXECUTED) {
    throw new Error('UNAVAILABLE_EXPORT_DOCUMENT');
  }
};
