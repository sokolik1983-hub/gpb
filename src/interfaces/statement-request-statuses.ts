/** Статусы сущности "Запроса выписки". */
export enum STATEMENT_REQUEST_STATUSES {
  /** Документ заполнен, контроли пройдены. Документ ожидает отправки. */
  NEW = 'NEW',
  /** Документ отправлен сотрудником Клиента в Банк. */
  DELIVERED = 'DELIVERED',
  /** Документ прошел повторную проверку реквизитов. */
  DETAILS_VALID = 'DETAILS_VALID',
  /** Документ принят. */
  RECEIVED = 'RECEIVED',
  /** Исполнен. */
  EXECUTED = 'EXECUTED',
  /** Отклонен. */
  DENIED = 'DENIED',
}
