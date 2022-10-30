import type { StatementHistoryRow } from 'interfaces/admin';
import { ACTION, FORMAT } from 'interfaces/common';

/** Доступные форматы выписки для экспорта. */
const availableStatementFormats = [FORMAT.C1, FORMAT.TXT, FORMAT.EXCEL, FORMAT.PDF];

/**
 * Гард доступности экспорта выписки.
 *
 * @param statement - Данные выписки.
 * @param statement.action - Тип действия.
 * @param statement.format - Формат выписки.
 *
 * @throws Error.
 */
export const statementExport = ({ action, format }: StatementHistoryRow) => {
  const exportAvailable = action === ACTION.DOWNLOAD && availableStatementFormats.includes(format);

  if (!exportAvailable) {
    throw new Error('UNAVAILABLE_EXPORT_DOCUMENT');
  }
};
