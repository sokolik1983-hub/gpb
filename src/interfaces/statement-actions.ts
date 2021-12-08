/** Типы действий запроса выписки. */
export enum STATEMENT_ACTION_TYPES {
  /** Скачать. */
  DOWNLOAD = 'DOWNLOAD',
  /** Отправить на почту. */
  SEND_TO_EMAIL = 'SEND_TO_EMAIL',
  /** Печать. */
  PRINT = 'PRINT',
  /** Показать на экране. */
  VIEW = 'VIEW',
}
