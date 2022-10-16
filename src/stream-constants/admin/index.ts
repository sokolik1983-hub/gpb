import { ADMIN_STREAM_URL as PLATFORM_ADMIN_STREAM_URL } from '@platform/services/admin';

export const ADMIN_STREAM_URL = {
  ...PLATFORM_ADMIN_STREAM_URL,
  STATEMENT: '/account-statement/new',
  STATEMENT_REQUESTS: '/account-statement/requests',
  TRANSACTION_REQUESTS: '/account-statement/transactions',
  /** [Выписки_ЗВ] ЭФ Банка "Журнал запросов выписки". */
  STATEMENT_HISTORY: '/account-statement/history',
};

/** Префикс для использования в ключах для хранилищ и т.п. */
export const PREFIX = 'admin';

export * from './statuses';
