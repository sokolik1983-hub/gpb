import type { FORMAT, ACTION, DATE_PERIODS } from 'interfaces';

/** Строка скроллера истории запросов выписок по расписанию. */
export interface IStatementScheduleRow {
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
  status: string;
  /** Тип действия. */
  action: ACTION;
  /** "Дата с" которая запрашивалась в выписке. */
  periodStart: string;
  /** "Дата по" которая запрашивалась в выписке. */
  periodEnd: string;
  /** Время в которое будет исполняться выписка по расписанию. */
  scheduleTime?: string;
  /** Способ получения выписки по расписанию. */
  scheduleMethod: string;
  /** Emails зарегистрированные в запросе выписки по расписанию. */
  emails?: string[];
  /** Emails зарегистрированные в запросе выписки по расписанию. */
  scheduleStatus?: string;
}
