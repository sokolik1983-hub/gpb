import { ADMIN_STREAM_URL as PLATFORM_ADMIN_STREAM_URL } from '@platform/services/admin';

export const ADMIN_STREAM_URL = {
  ...PLATFORM_ADMIN_STREAM_URL,
  /** Скроллер журнала закрытых дней. */
  CLOSED_DAYS: '/account-statement/closed-days',
  /** Скроллер журнала сверки остатков/оборотов. */
  RECONCILIATION_TURNOVERS: '/account-statement/reconciliation-turnovers',
  /** ЭФ просмотра параметров запроса на выписку. */
  STATEMENT_REQUEST: '/account-statement/:id',
  /** Скроллер проводок на основании запроса. */
  STATEMENT_ENTRY: '/account-statement/entry',
  /** Скроллер проводок. */
  STATEMENT_TRANSACTIONS: '/account-statement/transactions',
  /** Скроллер истории запросов выписок. */
  STATEMENT_HISTORY: '/account-statement/history',
  /** Скроллер остатков и оборотов. */
  STATEMENT_TURNOVERS: '/account-statement/turnovers',
};

/** Префикс для использования в ключах для хранилищ и т.п. */
export const PREFIX = 'admin';

export * from './statuses';
