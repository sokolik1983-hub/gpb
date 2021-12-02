import { locale } from 'localization';

/** Лейблы статусов запроса выписки. */
export const STATUS_LABELS = {
  /** Документ заполнен, контроли пройдены. Документ ожидает отправки. */
  NEW: locale.client.statementStatuses.new,
  /** Документ отправлен сотрудником Клиента в Банк. */
  DELIVERED: locale.client.statementStatuses.delivered,
  /** Документ прошел повторную проверку реквизитов. */
  DETAILS_VALID: locale.client.statementStatuses.detailsValid,
  /** Документ принят. */
  RECEIVED: locale.client.statementStatuses.received,
  /** Исполнен. */
  EXECUTED: locale.client.statementStatuses.executed,
  /** Отклонен. */
  DENIED: locale.client.statementStatuses.denied,
};
