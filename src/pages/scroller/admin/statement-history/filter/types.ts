import type { DATE_PERIODS, STATEMENT_REQUEST_STATUSES, STATEMENT_STATUSES, STATEMENT_TYPE } from 'interfaces';

/** Свойства полей формы фильтрации скроллера Истории запросов выпискок. */
export interface FilterValues {
  /** Счета. */
  accountIds: string[];
  /** Дата создания запроса. */
  createdAt: string;
  /** Начало периода. */
  dateFrom?: string;
  /** Конец периода. */
  dateTo?: string;
  /** Организация. */
  organizationIds: string[];
  /** Период. */
  period: DATE_PERIODS;
  /** Тип периода. */
  periodType: DATE_PERIODS;
  /** Статус запроса. */
  requestStatus: STATEMENT_REQUEST_STATUSES;
  /** Подразделение обслуживания. */
  serviceBranchIds: string[];
  /** Электронная подпись. */
  signed: boolean;
  /** Статус выписки. */
  statement: STATEMENT_TYPE;
  /** Статус выписки. */
  statementStatus: STATEMENT_STATUSES;
  /** Пользователь. */
  userIds: string[];
}
