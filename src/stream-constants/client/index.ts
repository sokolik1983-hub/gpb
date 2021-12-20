import { COMMON_STREAM_URL as PLATFORM_COMMON_STREAM_URL } from '@platform/services';

export const COMMON_STREAM_URL = {
  ...PLATFORM_COMMON_STREAM_URL,
  /** [Выписки] Запрос выписки. */
  STATEMENT: '/statement',
  /** [Выписки] Обороты (ОСВ). */
  STATEMENT_TURNOVER: '/statement/turnover',
  /** [Выписки] История запросов. */
  STATEMENT_HISTORY: '/statement/history',
  /** [Выписки] Проводки. */
  STATEMENT_TRANSACTIONS: '/statement/transaction',
};

export * from './statuses';
