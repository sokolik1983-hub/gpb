import { STATEMENT_STATUSES, DATE_PERIODS, STATEMENT_FORMATS, STATEMENT_ACTION_TYPES } from 'interfaces';
import type { IStatementHistoryRow } from 'interfaces/client';
import { accounts } from 'mocks/accounts';
import { DATE_ISO_FORMAT } from 'stream-constants';
import { dateTime } from '@platform/tools/date-time';

const accountIds = accounts.map(item => item.id);
const accountNumbers = accounts.map(item => item.accountNumber);
const organizationNames = accounts.map(item => item.bankClient.shortName ?? item.bankClient.fullName);

// TODO: Заглушка. Удалить после подключения реста.
export const statementHistoryResponce: IStatementHistoryRow[] = [
  {
    id: '',
    createdAt: dateTime().toISOString(),
    accountIds,
    accountNumbers: [...accountNumbers, ...accountNumbers, ...accountNumbers],
    organizationNames,
    status: STATEMENT_STATUSES.NEW,
    periodType: DATE_PERIODS.SELECT_PERIOD,
    statementFormat: STATEMENT_FORMATS.RTF,
    periodStart: dateTime().format(DATE_ISO_FORMAT),
    periodEnd: dateTime().format(DATE_ISO_FORMAT),
    action: STATEMENT_ACTION_TYPES.PRINT,
  },
  {
    id: '',
    createdAt: dateTime().toISOString(),
    accountIds: [...accountIds, ...accountIds, ...accountIds],
    accountNumbers: [...accountNumbers, ...accountNumbers, ...accountNumbers],
    organizationNames: [...organizationNames, ...organizationNames, ...organizationNames],
    status: STATEMENT_STATUSES.DENIED,
    periodType: DATE_PERIODS.YESTERDAY,
    statementFormat: STATEMENT_FORMATS.RTF,
    periodStart: dateTime().format(DATE_ISO_FORMAT),
    periodEnd: dateTime().format(DATE_ISO_FORMAT),
    action: STATEMENT_ACTION_TYPES.VIEW,
  },
  {
    id: '',
    createdAt: dateTime().toISOString(),
    accountIds: accountIds.filter((_, index) => index > 2),
    accountNumbers: accountNumbers.filter((_, index) => index > 2),
    organizationNames: organizationNames.filter((_, index) => index > 2),
    status: STATEMENT_STATUSES.EXECUTED,
    periodType: DATE_PERIODS.CURRENT_MONTH,
    statementFormat: STATEMENT_FORMATS.PDF,
    periodStart: dateTime().format(DATE_ISO_FORMAT),
    periodEnd: dateTime().format(DATE_ISO_FORMAT),
    action: STATEMENT_ACTION_TYPES.PRINT,
  },
];
