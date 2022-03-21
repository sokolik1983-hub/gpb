import type { STATEMENT_RELEVANCE_STATUS } from 'interfaces';

/** Запрос получения статуса актуальности выписки. */
export interface IGetStatementRelevanceStatus {
  status: STATEMENT_RELEVANCE_STATUS;
}
