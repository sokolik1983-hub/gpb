import React from 'react';
import { RequestStatementForm } from 'pages/form/client';
import { ScheduleConfirmPage } from 'pages/scroller/client/schedule-confirm';
import { ScheduleHistoryScrollerPage } from 'pages/scroller/client/schedule-history';
import { ScheduleNewPage } from 'pages/scroller/client/schedule-new';
import { ScheduleStatement } from 'pages/scroller/client/schedule-statement';
import { ScheduleStatementRequestHistory } from 'pages/scroller/client/schedule-statement-request-history';
import { StatementHistoryScrollerPage } from 'pages/scroller/client/statement-history';
import { StatementTransactionScrollerPage } from 'pages/scroller/client/statement-transaction';
import { StatementTurnoverScrollerPage } from 'pages/scroller/client/statement-turnover';
import { ID_URL_PARAMETER } from 'stream-constants';
import { COMMON_STREAM_URL, PRIVILEGE } from 'stream-constants/client';
import { GuardRoute } from '@platform/services/client';
import './utils/common/ie-matches-polyfill';

export { executeCreateStatementHidden } from 'utils/common/execute-actions';

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
    key="client-schedule-history-scroller"
    exact
    authority={PRIVILEGE.ACCOUNTING_ENTRY_VIEW}
    component={ScheduleHistoryScrollerPage}
    path={COMMON_STREAM_URL.STATEMENT_SCHEDULE_HISTORY}
  />,
  <GuardRoute
    key="client-schedule-statement-new"
    exact
    authority={PRIVILEGE.ACCOUNTING_ENTRY_VIEW}
    component={ScheduleNewPage}
    path={COMMON_STREAM_URL.STATEMENT_SCHEDULE_NEW}
  />,
  <GuardRoute
    key="client-schedule-statement-request-history"
    exact
    authority={PRIVILEGE.ACCOUNTING_ENTRY_VIEW}
    component={ScheduleStatementRequestHistory}
    path={COMMON_STREAM_URL.STATEMENT_SCHEDULE_REQUEST_HISTORY}
  />,
  <GuardRoute
    key="client-schedule-statement-confirm"
    exact
    authority={PRIVILEGE.ACCOUNTING_ENTRY_VIEW}
    component={ScheduleConfirmPage}
    path={COMMON_STREAM_URL.STATEMENT_SCHEDULE_CONFIRM}
  />,
  <GuardRoute
    key="schedule-statement-client-form"
    exact
    authority={PRIVILEGE.STATEMENT_REQUEST}
    component={ScheduleStatement}
    path={`${COMMON_STREAM_URL.STATEMENT_SCHEDULE}`}
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
