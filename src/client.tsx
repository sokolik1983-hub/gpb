import React from 'react';
import { ClientFormPage } from 'pages/form/client';
import { ClientScrollerPage } from 'pages/scroller/client';
import { Route } from 'react-router-dom';
import { COMMON_STREAM_URL } from 'stream-constants/client';

export const routes = [
  <Route key="statement-client-form" component={ClientFormPage} path={`${COMMON_STREAM_URL.STATEMENT}/:id`} />,
  <Route key="statement-client-scroller" component={ClientScrollerPage} path={`${COMMON_STREAM_URL.STATEMENT}`} />,
];
