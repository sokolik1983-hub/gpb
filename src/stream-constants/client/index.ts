import { COMMON_STREAM_URL as PLATFORM_COMMON_STREAM_URL } from '@platform/services';

export const COMMON_STREAM_URL = {
  ...PLATFORM_COMMON_STREAM_URL,
  /** [Выписки] Запрос выписки. */
  STATEMENT: '/account-statement',
  /** [Выписки] Обороты (ОСВ). */
  STATEMENT_TURNOVER: '/account-statement/turnover',
  /** [Выписки] История запросов. */
  STATEMENT_HISTORY: '/account-statement/history',
  /** [Выписки] Проводки. */
  STATEMENT_TRANSACTIONS: '/account-statement/transaction',
  /** [Выписки по расписанию] История запросов. */
  STATEMENT_SCHEDULE_HISTORY: '/account-statement/schedule-history',
  /** [Выписки по расписанию] Новый запрос. */
  STATEMENT_SCHEDULE_NEW: '/account-statement/schedule-new',
  /** [Выписки по расписанию] Нередактируемая форма. */
  STATEMENT_SCHEDULE_CONFIRM: '/account-statement/schedule-confirm',
  /** [Выписки по расписанию] Нередактируемая форма. */
  STATEMENT_SCHEDULE: '/account-statement/schedule-statement',
};

export * from './statuses';
export * from './privilege';
export * from './methods';
