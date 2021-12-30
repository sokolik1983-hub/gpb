import { STATEMENT_REQUEST_STATUSES } from 'interfaces';
import { locale } from 'localization';
import { DOCUMENT_STATUS_TYPE } from '@platform/ui';

/** Лейблы статусов запроса выписки. */
export const STATUS_LABELS = {
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
};

/** Цвета клиентских статусов. */
export const STATUS_COLOR = {
  /** Документ заполнен, контроли пройдены. Документ ожидает отправки. */
  [STATEMENT_REQUEST_STATUSES.NEW]: DOCUMENT_STATUS_TYPE.INPROGRESS,
  /** Документ отправлен сотрудником Клиента в Банк. */
  [STATEMENT_REQUEST_STATUSES.DELIVERED]: DOCUMENT_STATUS_TYPE.INPROGRESS,
  /** Документ прошел повторную проверку реквизитов. */
  [STATEMENT_REQUEST_STATUSES.DETAILS_VALID]: DOCUMENT_STATUS_TYPE.INPROGRESS,
  /** Документ принят. */
  [STATEMENT_REQUEST_STATUSES.RECEIVED]: DOCUMENT_STATUS_TYPE.INPROGRESS,
  /** Исполнен. */
  [STATEMENT_REQUEST_STATUSES.EXECUTED]: DOCUMENT_STATUS_TYPE.SUCCESS,
  /** Отклонен. */
  [STATEMENT_REQUEST_STATUSES.DENIED]: DOCUMENT_STATUS_TYPE.ERROR,
};
