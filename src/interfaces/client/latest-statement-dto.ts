import type { DATE_PERIODS, STATEMENT_STATUSES } from 'interfaces';
import type { ACTIONS } from 'interfaces/client/classificators/actions';
import type { FORMAT } from 'interfaces/client/classificators/format';

/** DTO для поиска последнего запроса выписки у текущего пользователя. */
export interface ILatestStatementDto {
  accountNumbers: string[];
  accountsIds: string[];
  action: ACTIONS;
  createdAt: string;
  id: string;
  organizationNames: string[];
  periodEnd: string;
  periodStart: string;
  periodType: DATE_PERIODS;
  statementFormat: FORMAT;
  status: STATEMENT_STATUSES;
}
