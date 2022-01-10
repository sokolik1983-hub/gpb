import type { STATEMENT_REQUEST_STATUSES } from 'interfaces';

/** Запрос статуса сущности "Запроса выписки". */
export interface IGetStatusResponceDto {
  /** Статус запроса выписки. */
  status: STATEMENT_REQUEST_STATUSES;
}
