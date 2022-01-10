import type { DATE_PERIODS, STATEMENT_REQUEST_STATUSES } from 'interfaces';
import type { ACTIONS } from 'interfaces/client/classificators/actions';
import type { FORMAT } from 'interfaces/client/classificators/format';

/** DTO для поиска последнего запроса выписки у текущего пользователя. */
export interface ILatestStatementDto {
  // TODO: После обновления реста посмотреть можно ли по смыслу переименовать в IStatementRequest (сущьность "Запрос выписки"), и плюс удалить повторяющиеся классификаторы из папки interfaces (н-р. ACTIONS и STATEMENT_ACTION_TYPES).
  /** Идентификатор запроса выписки. */
  id: string;
  /** Номера счетов. */
  accountNumbers: string[];
  /** ID счетов. */
  accountsIds: string[];
  /** Тип действия. */
  action: ACTIONS;
  /** Дата запроса. */
  createdAt: string;
  /** Наименование организаций. */
  organizationNames: string[];
  /** "Дата по" которая запрашивалась в выписке. */
  periodEnd: string;
  /** "Дата с" которая запрашивалась в выписке. */
  periodStart: string;
  /** Тип периода. */
  periodType: DATE_PERIODS;
  /** Формат выписки. */
  statementFormat: FORMAT;
  /** Статус запроса выписки. */
  status: STATEMENT_REQUEST_STATUSES;
  /** Комментарий для клиента. */
  commentForClient?: string;
}
