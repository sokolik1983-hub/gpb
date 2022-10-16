import { pathGenerator } from '@platform/core';
import type { TableValues } from './types';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<TableValues>();

/** Имена колонок таблицы Истории запросов выписок. */
export const COLUMN_NAMES = {
  /** Номера счетов. */
  ACCOUNT_NUMBERS: getPath('accountNumbers'),
  /** Колонка с действиями. */
  ACTIONS: getPath('ACTIONS'),
  /** Дата запроса. */
  CREATED_AT: getPath('createdAt'),
  /** Формат выписки. */
  FORMAT: getPath('format'),
  /** Организации. */
  ORGANIZATIONS: getPath('organizations'),
  /** Тип периода. */
  PERIOD_TYPE: getPath('periodType'),
  /** Статус запроса. */
  REQUEST_STATUS: getPath('requestStatus'),
  /** Филиалы обслуживания. */
  SERVICE_BRANCHES: getPath('serviceBranches'),
  /** Тип выписки. */
  STATEMENT_TYPE: getPath('statementType'),
  /** Статус выписки. */
  STATEMENT_STATUS: getPath('statementStatus'),
  /** Пользователь. */
  USER: getPath('user'),
};
