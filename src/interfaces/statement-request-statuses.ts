/**
 * Статусы сущности "Запроса выписки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32247432
 * */
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
  /** Документ отменен клиентом. */
  CANCELED = 'CANCELED',
}
/**
 * Статусы сущности "Заявка на выписку по расписанию".
 */
export enum SCHEDULE_REQUEST_STATUSES {
  /** Запрос на выписку по расписанию "Подключено". */
  ACTIVE = 'ACTIVE',
  /** Запрос на выписку по расписанию "В обработке". */
  IN_WORK = 'IN_WORK',
  /** Запрос на выписку по расписанию "Отказано". */
  DENIED = 'DENIED',
  /** Запрос на выписку по расписанию "Отключено". */
  CANCELED = 'CANCELED',
}
