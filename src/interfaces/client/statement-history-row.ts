import type { STATEMENT_REQUEST_STATUSES, DATE_PERIODS } from 'interfaces';
import type { FORMAT, ACTION } from 'interfaces/client/classificators';

/** Строка скроллера истории запросов выписок. */
export interface IStatementHistoryRow {
  /** Идентификатор запроса выписки. */
  id: string;
  /** Дата запроса. */
  createdAt: string;
  /** ID счетов. */
  accountsIds: string[];
  /** Номера счетов. */
  accountNumbers: string[];
  /** Наименование организаций. */
  organizationNames: string[];
  /** Тип периода. */
  periodType: DATE_PERIODS;
  /** Формат выписки. */
  statementFormat: FORMAT;
  /** Статус запроса выписки. */
  status: STATEMENT_REQUEST_STATUSES;
  /** Тип действия. */
  action: ACTION;
  /** "Дата с" которая запрашивалась в выписке. */
  periodStart: string;
  /** "Дата по" которая запрашивалась в выписке. */
  periodEnd: string;
}
