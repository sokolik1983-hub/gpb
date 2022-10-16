import type { STATEMENT_REQUEST_STATUSES, DATE_PERIODS, STATEMENT_STATUSES, STATEMENT_TYPE } from 'interfaces';
import type { Organization, USER } from 'interfaces/admin';
import type { FORMAT, ACTION } from 'interfaces/common/classificators';

/** Строка скроллера Истории запросов выписок. */
export interface StatementHistoryRow {
  /** Номера счетов. */
  accountNumbers: string[];
  /** Идентификаторы счетов. */
  accountsIds: string[];
  /** Тип действия. */
  action: ACTION;
  /** Дата запроса. */
  createdAt: {
    /** Дата. */
    date: string;
    /** Время. */
    time: string;
  };
  /** Формат выписки. */
  format: FORMAT;
  /** Идентификатор запроса выписки. */
  id: string;
  /** Наименование организаций. */
  organizations: Organization[];
  /** Дата периода. */
  periodDate: string;
  /** Тип периода. */
  periodType: DATE_PERIODS;
  /** Статус запроса. */
  requestStatus: STATEMENT_REQUEST_STATUSES;
  /** Филиалы обслуживания. */
  serviceBranches: string[];
  /** Идентификатор выписки. */
  statementId: string;
  /** Тип выписки. */
  statementType: STATEMENT_TYPE;
  /** Статус выписки. */
  statementStatus: STATEMENT_STATUSES;
  /** Пользователь. */
  user: USER;
}