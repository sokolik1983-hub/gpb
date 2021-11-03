import React from 'react';
import { AdminFormPage } from 'pages/form/admin';
import { AdminScrollerPage } from 'pages/scroller/admin';
import { Route } from 'react-router-dom';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';

export const routes = [
  <Route key="statement-admin-form" component={AdminFormPage} path={`${ADMIN_STREAM_URL.STATEMENT}/:id`} />,
  <Route key="statement-admin-scroller" component={AdminScrollerPage} path={`${ADMIN_STREAM_URL.STATEMENT}`} />,
];
