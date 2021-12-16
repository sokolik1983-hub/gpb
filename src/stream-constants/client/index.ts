import { COMMON_STREAM_URL as PLATFORM_COMMON_STREAM_URL } from '@platform/services';

export const COMMON_STREAM_URL = {
  ...PLATFORM_COMMON_STREAM_URL,
  STATEMENT: '/statement',
  STATEMENT_TURNOVER: '/statement/turnover',
  STATEMENT_HISTORY: '/statement/history',
  /** [Выписки] Проводки. */
  STATEMENT_TRANSACTIONS: '/statement/transactions',
};

export * from './statuses';
