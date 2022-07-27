import React from 'react';
import { RequestStatementForm } from 'pages/form/client';
import { StatementHistoryScrollerPage } from 'pages/scroller/client/statement-history';
import { StatementTransactionScrollerPage } from 'pages/scroller/client/statement-transaction';
import { StatementTurnoverScrollerPage } from 'pages/scroller/client/statement-turnover';
import { ID_URL_PARAMETER } from 'stream-constants';
import { COMMON_STREAM_URL, PRIVILEGE } from 'stream-constants/client';
import { GuardRoute } from '@platform/services/client';
import './utils/ie-matches-polyfill';

export { executeCreateStatementOrg, executeCreateStatementHidden, executeCreateStatementOneTime } from 'utils/execute-actions';

export const routes = [
  <GuardRoute
    key="client-statement-turnover-scroller"
    exact
    authority={PRIVILEGE.TURNOVER_SUMMARY_VIEW}
    component={StatementTurnoverScrollerPage}
    path={COMMON_STREAM_URL.STATEMENT_TURNOVER}
  />,
  <GuardRoute
    key="client-statement-history-scroller"
    exact
    authority={PRIVILEGE.TURNOVER_SUMMARY_VIEW}
    component={StatementHistoryScrollerPage}
    path={COMMON_STREAM_URL.STATEMENT_HISTORY}
  />,
  <GuardRoute
    key="client-statement-transactions-scroller"
    exact
    authority={PRIVILEGE.ACCOUNTING_ENTRY_VIEW}
    component={StatementTransactionScrollerPage}
    path={`${COMMON_STREAM_URL.STATEMENT_TRANSACTIONS}/${ID_URL_PARAMETER}`}
  />,
  <GuardRoute
    key="statement-client-form"
    exact
    authority={PRIVILEGE.STATEMENT_REQUEST}
    component={RequestStatementForm}
    path={`${COMMON_STREAM_URL.STATEMENT}/${ID_URL_PARAMETER}`}
  />,
];
