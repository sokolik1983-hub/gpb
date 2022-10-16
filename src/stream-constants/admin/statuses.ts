import { STATEMENT_REQUEST_STATUSES, STATEMENT_STATUSES, STATEMENT_TYPE } from 'interfaces';
import { USER_TYPE } from 'interfaces/admin';
import { locale } from 'localization';
import { DOCUMENT_STATUS_TYPE } from '@platform/ui';

/** Лейблы статусов запроса выписки. */
export const STATEMENT_REQUEST_STATUS_LABEL = {
  /** Документ заполнен, контроли пройдены. Документ ожидает отправки. */
  [STATEMENT_REQUEST_STATUSES.NEW]: locale.admin.requestStatus.new,
  /** Документ отправлен сотрудником Клиента в Банк. */
  [STATEMENT_REQUEST_STATUSES.DELIVERED]: locale.admin.requestStatus.delivered,
  /** Документ прошел повторную проверку реквизитов. */
  [STATEMENT_REQUEST_STATUSES.DETAILS_VALID]: locale.admin.requestStatus.detailsValid,
  /** Документ принят. */
  [STATEMENT_REQUEST_STATUSES.RECEIVED]: locale.admin.requestStatus.received,
  /** Исполнен. */
  [STATEMENT_REQUEST_STATUSES.EXECUTED]: locale.admin.requestStatus.executed,
  /** Отклонен. */
  [STATEMENT_REQUEST_STATUSES.DENIED]: locale.admin.requestStatus.denied,
  /** Документ отменен клиентом. */
  [STATEMENT_REQUEST_STATUSES.CANCELED]: locale.admin.requestStatus.canceled,
};

/** Лейблы статусов выписки. */
export const STATEMENT_STATUS_LABEL = {
  /** Не исполнен. */
  [STATEMENT_STATUSES.NOT_EXECUTED]: locale.admin.statementStatus.notExecuted,
  /** Исполнен. */
  [STATEMENT_STATUSES.EXECUTED]: locale.admin.statementStatus.executed,
  /** Ошибка. */
  [STATEMENT_STATUSES.ERROR]: locale.admin.statementStatus.error,
  /** Данные не актуальны. */
  [STATEMENT_STATUSES.NOT_RELEVANT]: locale.admin.statementStatus.notRelevant,
};

/** Лейблы типов выписки. */
export const STATEMENT_TYPE_LABEL = {
  /** Выписка. */
  [STATEMENT_TYPE.STATEMENT]: locale.admin.statementType.statement,
  /** Справка. */
  [STATEMENT_TYPE.REFERENCE]: locale.admin.statementType.reference,
};

/** Лейблы типов пользователя. */
export const USER_TYPE_LABEL = {
  /** Сотрудник Банка. */
  [USER_TYPE.BANK]: locale.admin.userType.bank,
  /** Сотрудник Клиента. */
  [USER_TYPE.CLIENT]: locale.admin.userType.client,
  /** Технический пользователь. */
  [USER_TYPE.TECHNICAL]: locale.admin.userType.technical,
};

/** Цвета статусов запроса выписки. */
export const STATEMENT_REQUEST_STATUS_COLOR = {
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

/** Цвета статусов выписки. */
export const STATEMENT_STATUS_COLOR = {
  /** Не исполнен. */
  [STATEMENT_STATUSES.NOT_EXECUTED]: DOCUMENT_STATUS_TYPE.ERROR,
  /** Исполнен. */
  [STATEMENT_STATUSES.EXECUTED]: DOCUMENT_STATUS_TYPE.SUCCESS,
  /** Ошибка. */
  [STATEMENT_STATUSES.ERROR]: DOCUMENT_STATUS_TYPE.ERROR,
  /** Данные не актуальны. */
  [STATEMENT_STATUSES.NOT_RELEVANT]: DOCUMENT_STATUS_TYPE.ERROR,
};