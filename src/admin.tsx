import React from 'react';
import { AdminFormPage } from 'pages/form/admin';
import { AdminScrollerPage } from 'pages/scroller/admin';
import { StatementHistoryScrollerPage } from 'pages/scroller/admin/statement-history';
import { Route } from 'react-router-dom';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';

export const routes = [
  <Route key="statement-admin-form" component={AdminFormPage} path={ADMIN_STREAM_URL.STATEMENT} />,
  <Route key="statement-admin-scroller" component={AdminScrollerPage} path={ADMIN_STREAM_URL.STATEMENT} />,
  <Route key="statement-history-scroller-page" component={StatementHistoryScrollerPage} path={ADMIN_STREAM_URL.STATEMENT_HISTORY} />,
];
