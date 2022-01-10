/** Статусы Выписки. */
export enum STATEMENT_STATUSES {
  /** Не исполнен. */
  NOT_EXECUTED = 'NOT_EXECUTED',
  /** Исполнен. */
  EXECUTED = 'EXECUTED',
  /** Ошибка. */
  ERROR = 'ERROR',
  /** Данные не актуальны. */
  NOT_RELEVANT = 'NOT_RELEVANT',
}
