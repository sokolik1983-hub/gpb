import type { ReconciliationTurnoverRow, ReconciliationTurnoverDto } from 'interfaces/admin';
import { getDateAndTime } from 'services/admin/mappers/utils';
import { DATE_FORMAT } from '@platform/services/admin';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';

/**
 * Мап dto в представление сверки остатков/оборотов.
 *
 * @param reconciliationTurnovers - Список сверки остатков/оборотов.
 */
export const mapDtoToViewForReconciliationTurnovers = (reconciliationTurnovers: ReconciliationTurnoverDto[]): ReconciliationTurnoverRow[] =>
  reconciliationTurnovers.map(({ accountNumber, operationDate, reconciliationDate, ...rest }) => ({
    ...rest,
    accountNumber: formatAccountCode(accountNumber),
    operationDate: formatDateTime(operationDate, { keepLocalTime: true, format: DATE_FORMAT }),
    reconciliationDate: getDateAndTime(reconciliationDate),
  }));
