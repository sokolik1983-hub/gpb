import { STATEMENT_REQUEST_STATUSES } from 'interfaces';
import { locale } from 'localization';

/** Лейблы статусов запроса выписки. */
export const STATEMENT_REQUEST_STATUS_FOR_CLIENT_LABEL = {
  /** Документ заполнен, контроли пройдены. Документ ожидает отправки. */
  [STATEMENT_REQUEST_STATUSES.NEW]: locale.client.statementStatuses.new,
  /** Документ отправлен сотрудником Клиента в Банк. */
  [STATEMENT_REQUEST_STATUSES.DELIVERED]: locale.client.statementStatuses.delivered,
  /** Документ прошел повторную проверку реквизитов. */
  [STATEMENT_REQUEST_STATUSES.DETAILS_VALID]: locale.client.statementStatuses.detailsValid,
  /** Документ принят. */
  [STATEMENT_REQUEST_STATUSES.RECEIVED]: locale.client.statementStatuses.received,
  /** Исполнен. */
  [STATEMENT_REQUEST_STATUSES.EXECUTED]: locale.client.statementStatuses.executed,
  /** Отклонен. */
  [STATEMENT_REQUEST_STATUSES.DENIED]: locale.client.statementStatuses.denied,
  /** Отменен. */
  [STATEMENT_REQUEST_STATUSES.CANCELED]: locale.client.statementStatuses.canceled,
};

/** Соответствие статусов запроса выписки для отображения. */
export const STATEMENT_REQUEST_STATUS_FOR_CLIENT_BY_SELECTED = {
  [STATEMENT_REQUEST_STATUSES.NEW]: [STATEMENT_REQUEST_STATUSES.NEW],
  [STATEMENT_REQUEST_STATUSES.DELIVERED]: [STATEMENT_REQUEST_STATUSES.DELIVERED],
  [STATEMENT_REQUEST_STATUSES.RECEIVED]: [STATEMENT_REQUEST_STATUSES.RECEIVED, STATEMENT_REQUEST_STATUSES.DETAILS_VALID],
  [STATEMENT_REQUEST_STATUSES.EXECUTED]: [STATEMENT_REQUEST_STATUSES.EXECUTED],
  [STATEMENT_REQUEST_STATUSES.DENIED]: [STATEMENT_REQUEST_STATUSES.DENIED],
  [STATEMENT_REQUEST_STATUSES.CANCELED]: [STATEMENT_REQUEST_STATUSES.CANCELED],
};
