import React from 'react';
import { RequestStatementForm } from 'pages/form/client';
import { StatementHistoryScrollerPage } from 'pages/scroller/client/statement-history';
import { StatementTransactionScrollerPage } from 'pages/scroller/client/statement-transaction';
import { StatementTurnoverScrollerPage } from 'pages/scroller/client/statement-turnover';
import { Route } from 'react-router-dom';
import { COMMON_STREAM_URL } from 'stream-constants/client';

export const routes = [
  // TODO: Route заменить на GuardRoute когда будет готова ролевая.
  <Route
    key="client-statement-turnover-scroller"
    exact
    component={StatementTurnoverScrollerPage}
    path={COMMON_STREAM_URL.STATEMENT_TURNOVER}
  />,
  <Route
    key="client-statement-history-scroller"
    exact
    component={StatementHistoryScrollerPage}
    path={COMMON_STREAM_URL.STATEMENT_HISTORY}
  />,
  <Route
    key="client-statement-transactions-scroller"
    exact
    component={StatementTransactionScrollerPage}
    path={`${COMMON_STREAM_URL.STATEMENT_TRANSACTIONS}/:statementId`}
  />,
  <Route key="statement-client-form" component={RequestStatementForm} path={`${COMMON_STREAM_URL.STATEMENT}/:id`} />,
];
