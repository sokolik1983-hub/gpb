import { STATEMENT_REQUEST_STATUSES, STATEMENT_STATUSES, STATEMENT_TYPE } from 'interfaces';
import { MAINTENANCE_TYPE, RECONCILIATION_STATUS, RECORD_SOURCE, USER_TYPE } from 'interfaces/admin';
import { CHANGED_ENTRY_STATUSES } from 'interfaces/changed-entry-statuses';
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

/** Лейблы источника записи сверки. */
export const TURNOVER_RECONCILIATION_RECORD_SOURCE_LABEL = {
  /** Закрытие дня. */
  [RECORD_SOURCE.CLOSING_OF_DAY]: locale.admin.turnoverReconciliationRecordSource.closingOfDay,
  /** Пересчет дня в связи с изменением набора проводок. */
  [RECORD_SOURCE.CHANGING_SET_OF_ENTRIES]: locale.admin.turnoverReconciliationRecordSource.changingSetOfEntries,
  /** Подключение счета к ДБО. */
  [RECORD_SOURCE.DBO_CONTRACT]: locale.admin.turnoverReconciliationRecordSource.dboContract,
};

/** Цвета статусов сверки остатков/оборотов. */
export const TURNOVER_RECONCILIATION_STATUS_COLOR = {
  /** Есть расхождения. */
  [RECONCILIATION_STATUS.FAILURE]: DOCUMENT_STATUS_TYPE.ERROR,
  /** Ошибки ремонта. */
  [RECONCILIATION_STATUS.REPAIR_FAILURE]: DOCUMENT_STATUS_TYPE.ERROR,
  /** Отсутствуют обороты за прошлую дату. */
  [RECONCILIATION_STATUS.NO_TURNOVER_FOUND]: DOCUMENT_STATUS_TYPE.ERROR,
  /** Сверка не проводилась. */
  [RECONCILIATION_STATUS.NONE]: DOCUMENT_STATUS_TYPE.INPROGRESS,
  /** Выполняется ремонт. */
  [RECONCILIATION_STATUS.UNDER_REPAIR]: DOCUMENT_STATUS_TYPE.INPROGRESS,
  /** Расхождений нет. */
  [RECONCILIATION_STATUS.SUCCESS]: DOCUMENT_STATUS_TYPE.SUCCESS,
};

/** Лейблы статусов сверки остатков/оборотов. */
export const TURNOVER_RECONCILIATION_STATUS_LABEL = {
  /** Сверка не проводилась. */
  [RECONCILIATION_STATUS.NONE]: locale.admin.turnoverReconciliationStatus.none,
  /** Отсутствуют обороты за прошлую дату. */
  [RECONCILIATION_STATUS.NO_TURNOVER_FOUND]: locale.admin.turnoverReconciliationStatus.noTurnoversFound,
  /** Расхождений нет. */
  [RECONCILIATION_STATUS.SUCCESS]: locale.admin.turnoverReconciliationStatus.success,
  /** Есть расхождения. */
  [RECONCILIATION_STATUS.FAILURE]: locale.admin.turnoverReconciliationStatus.failure,
  /** Выполняется ремонт. */
  [RECONCILIATION_STATUS.UNDER_REPAIR]: locale.admin.turnoverReconciliationStatus.underRepair,
  /** Ошибки ремонта. */
  [RECONCILIATION_STATUS.REPAIR_FAILURE]: locale.admin.turnoverReconciliationStatus.repairFailure,
};

/** Цвета статусов добавленных/удалённых проводок. */
export const CHANGED_ENTRIES_STATUS_COLOR = {
  /** Добавлена. */
  [CHANGED_ENTRY_STATUSES.ADDED]: DOCUMENT_STATUS_TYPE.SUCCESS,
  /** Удалена. */
  [CHANGED_ENTRY_STATUSES.REMOVED]: DOCUMENT_STATUS_TYPE.ERROR,
};

/** Лейблы статусов добавленных/удалённых проводок. */
export const CHANGED_ENTRIES_STATUS_LABEL = {
  /** Добавлена. */
  [CHANGED_ENTRY_STATUSES.ADDED]: locale.admin.changedEntryStatus.added,
  /** Удалена. */
  [CHANGED_ENTRY_STATUSES.REMOVED]: locale.admin.changedEntryStatus.removed,
};

/** Лейблы типов технических работ. */
export const MAINTENANCE_TYPE_LABEL = {
  /** Окончание технических работ на Ф1. */
  [MAINTENANCE_TYPE.MAINTENANCE_END]: locale.admin.maintenanceType.end,
  /** Начало технических работ на Ф1. */
  [MAINTENANCE_TYPE.MAINTENANCE_START]: locale.admin.maintenanceType.start,
};

/** Лейблы статусов технических работ. */
export const MAINTENANCE_STATUS_LABEL = {
  /** Окончание технических работ на Ф1. */
  [MAINTENANCE_TYPE.MAINTENANCE_END]: locale.admin.maintenanceStatus.end,
  /** Начало технических работ на Ф1. */
  [MAINTENANCE_TYPE.MAINTENANCE_START]: locale.admin.maintenanceStatus.start,
};

/** Цвета статусов технических работ. */
export const MAINTENANCE_STATUS_COLOR = {
  /** Окончание технических работ на Ф1. */
  [MAINTENANCE_TYPE.MAINTENANCE_END]: DOCUMENT_STATUS_TYPE.SUCCESS,
  /** Начало технических работ на Ф1. */
  [MAINTENANCE_TYPE.MAINTENANCE_START]: DOCUMENT_STATUS_TYPE.INPROGRESS,
};
