import type { STATEMENT_STATUSES, DATE_PERIODS, STATEMENT_FORMATS, STATEMENT_ACTION_TYPES } from 'interfaces';

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
  statementFormat: STATEMENT_FORMATS;
  /** Статус запроса выписки. */
  status: STATEMENT_STATUSES;
  /** Тип действия. */
  action: STATEMENT_ACTION_TYPES;
  /** "Дата с" которая запрашивалась в выписке. */
  periodStart: string;
  /** "Дата по" которая запрашивалась в выписке. */
  periodEnd: string;
}
