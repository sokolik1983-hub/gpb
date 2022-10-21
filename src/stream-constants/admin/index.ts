import { ADMIN_STREAM_URL as PLATFORM_ADMIN_STREAM_URL } from '@platform/services/admin';

export const ADMIN_STREAM_URL = {
  ...PLATFORM_ADMIN_STREAM_URL,
  /** ЭФ просмотра параметров запроса на выписку. */
  STATEMENT_REQUEST: '/account-statement',
  /** Скроллер проводок на основании запроса. */
  STATEMENT_ENTRY: '/account-statement/entry',
  /** Скроллер истории запросов выписок. */
  STATEMENT_HISTORY: '/account-statement/history',
};

/** Префикс для использования в ключах для хранилищ и т.п. */
export const PREFIX = 'admin';

export * from './statuses';
