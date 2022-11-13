import { SORT_DIRECTION } from '@platform/services';

/**
 * Имена колонок таблицы Истории запросов выписок.
 *
 * Для сортируемых полей, значениями должны совпадать со значениями, которые бэкенд использует для сортировки.
 * */
export const COLUMN_NAMES = {
  /** Номера счетов. */
  ACCOUNT_NUMBERS: 'accountNumbers',
  /** Колонка с действиями. */
  ACTIONS: 'ACTIONS',
  /** Дата запроса. */
  CREATED_AT: 'createdAt',
  /** Формат выписки. */
  FORMAT: 'format',
  /** Организации. */
  ORGANIZATIONS: 'organizations',
  /** Тип периода. */
  PERIOD_TYPE: 'periodType',
  /** Статус запроса. */
  REQUEST_STATUS: 'status',
  /** Филиалы обслуживания. */
  SERVICE_BRANCHES: 'serviceBranches',
  /** Тип выписки. */
  STATEMENT_TYPE: 'statementType',
  /** Статус выписки. */
  STATEMENT_STATUS: 'getStatementStatus',
  /** Пользователь. */
  USER: 'userId',
};

/** Состояние сортровки по умолчанию. */
export const DEFAULT_SORT = {
  [COLUMN_NAMES.CREATED_AT]: SORT_DIRECTION.DESC,
};
