import { ADMIN_STREAM_URL as PLATFORM_ADMIN_STREAM_URL } from '@platform/services/admin';

export const ADMIN_STREAM_URL = {
  ...PLATFORM_ADMIN_STREAM_URL,
  /** Скроллер журнала закрытых дней. */
  CLOSED_DAYS: '/account-statement/closed-days',
  /** Скроллер журнала сверки остатков/оборотов. */
  RECONCILIATION_TURNOVERS: '/account-statement/reconciliation-turnovers',
  /** Скроллер журнала курсов валют. */
  CURRENCY_RATES: '/account-statement/currency-rates',
  /** ЭФ просмотра параметров запроса на выписку. */
  STATEMENT_REQUEST: '/account-statement/:id',
  /** ЭФ просмотра журнала удаленных или добавленных проводок. */
  CHANGED_ENTRIES: '/account-statement/:id/changed-entries',
  /** Скроллер проводок на основании запроса. */
  STATEMENT_ENTRY: '/account-statement/entry',
  /** Скроллер проводок. */
  STATEMENT_TRANSACTIONS: '/account-statement/transactions',
  /** Скроллер истории запросов выписок. */
  STATEMENT_HISTORY: '/account-statement/history',
  /** Скроллер связанных запросов. */
  RELATED_QUERIES: '/account-statement/related-queries',
  /** Скроллер остатков и оборотов. */
  STATEMENT_TURNOVERS: '/account-statement/turnovers',
  /** Скроллер технических работ. */
  MAINTENANCE: '/account-statement/maintenance',
};

/** Префикс для использования в ключах для хранилищ и т.п. */
export const PREFIX = 'admin';

export * from './statuses';
