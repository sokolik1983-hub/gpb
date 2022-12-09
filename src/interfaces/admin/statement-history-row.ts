import type { STATEMENT_REQUEST_STATUSES, DATE_PERIODS, STATEMENT_STATUSES, STATEMENT_TYPE } from 'interfaces';
import type { AccountOrganization, StatementUser } from 'interfaces/admin';
import type { FORMAT } from 'interfaces/common';
import type { ACTION } from 'interfaces/common/classificators';

/** Строка скроллера Истории запросов выписок. */
export interface StatementHistoryRow {
  /** Номера счетов. */
  accountNumbers: string[];
  /** Идентификаторы счетов. */
  accountIds: string[];
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
  organizations: AccountOrganization[];
  /** Дата периода. */
  periodDate: string;
  /** Дата конца периода. */
  periodEnd: string;
  /** Дата начала периода. */
  periodStart: string;
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
  user: StatementUser;
}
