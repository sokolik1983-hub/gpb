import React from 'react';
import { AdminFormPage } from 'pages/form/admin';
import { EntriesScrollerPage } from 'pages/scroller/admin/entries-scroller';
import { StatementHistoryScrollerPage } from 'pages/scroller/admin/statement-history';
import { Route } from 'react-router-dom';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';

/** Роуты в банковской части сервиса. */
export const routes = [
  /** Путь до скроллера истории запросов выписок. */
  <Route key="history-scroller" component={StatementHistoryScrollerPage} path={ADMIN_STREAM_URL.STATEMENT_HISTORY} />,
  /** Путь до скроллера проводок на основании запроса. */
  <Route key="entries-scroller" component={EntriesScrollerPage} path={`${ADMIN_STREAM_URL.STATEMENT_ENTRY}/:id`} />,
  /** Путь до ЭФ просмотра параметров запроса на выписку. */
  <Route key="entries-scroller" component={AdminFormPage} path={ADMIN_STREAM_URL.STATEMENT_REQUEST} />,
];
