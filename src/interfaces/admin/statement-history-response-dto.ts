import type { ACTION, DATE_PERIODS, FORMAT, STATEMENT_REQUEST_STATUSES, STATEMENT_STATUSES, STATEMENT_TYPE } from 'interfaces';
import type { Account } from 'interfaces/admin/account';
import type { USER } from 'interfaces/admin/user';

/** Дто ответа сервера по выписке. */
export interface StatementHistoryResponseDto {
  /** Список счетов. */
  accounts: Account[];
  /** Тип действия. */
  action: ACTION;
  /** Дата запроса. */
  createdAt: string;
  /** Формат выписки. */
  format: FORMAT;
  /** Идентификатор запроса выписки. */
  id: string;
  /** Конец периода. */
  periodEnd: string;
  /** Начало периода. */
  periodStart: string;
  /** Тип периода. */
  periodType: DATE_PERIODS;
  /** Идентификатор выписки. */
  statementId: string;
  /** Статус выписки. */
  statementStatus: STATEMENT_STATUSES;
  /** Тип выписки. */
  statementType: STATEMENT_TYPE;
  /** Статус запроса. */
  status: STATEMENT_REQUEST_STATUSES;
  /** Пользователь. */
  user: USER;
}
