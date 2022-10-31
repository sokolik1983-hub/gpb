import React from 'react';
import { AdminFormPage } from 'pages/form/admin';
import { ClosedDaysScrollerPage } from 'pages/scroller/admin/closed-days';
import { EntriesScrollerPage } from 'pages/scroller/admin/entries-scroller';
import { StatementHistoryScrollerPage } from 'pages/scroller/admin/statement-history';
import { TurnoversScrollerPage } from 'pages/scroller/admin/turnovers-scroller/page';
import { Route } from 'react-router-dom';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';

/** Роуты в банковской части сервиса. */
export const routes = [
  /** Путь до скроллера истории запросов выписок. */
  <Route key="history-scroller" component={StatementHistoryScrollerPage} path={ADMIN_STREAM_URL.STATEMENT_HISTORY} />,
  /** Путь до скроллера просмотра остатков и оборотов. */
  <Route key="turnovers-scroller" component={TurnoversScrollerPage} path={ADMIN_STREAM_URL.STATEMENT_TURNOVERS} />,
  /** Путь до скроллера проводок на основании запроса. */
  <Route key="entries-scroller" component={EntriesScrollerPage} path={`${ADMIN_STREAM_URL.STATEMENT_ENTRY}/:id`} />,
  /** Путь до ЭФ журнала закрытых дней. */
  <Route key="closed-days-scroller" component={ClosedDaysScrollerPage} path={ADMIN_STREAM_URL.CLOSED_DAYS} />,
  /** Путь до ЭФ просмотра параметров запроса на выписку. */
  <Route key="statement-request" component={AdminFormPage} path={ADMIN_STREAM_URL.STATEMENT_REQUEST} />,
];
