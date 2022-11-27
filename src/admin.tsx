import React from 'react';
import { AdminFormPage } from 'pages/form/admin';
import { ChangedEntriesScrollerPage } from 'pages/scroller/admin/changed-entries';
import { ClosedDaysScrollerPage } from 'pages/scroller/admin/closed-days';
import { CurrencyRatesScrollerPage } from 'pages/scroller/admin/currency-rates';
import { EntriesScrollerPage } from 'pages/scroller/admin/entries-scroller';
import { MaintenanceScrollerPage } from 'pages/scroller/admin/maintenance';
import { ReconciliationTurnoversScrollerPage } from 'pages/scroller/admin/reconciliation-turnovers';
import { RelatedQueriesScrollerPage, StatementHistoryScrollerPage } from 'pages/scroller/admin/statements';
import { TransactionsScrollerPage } from 'pages/scroller/admin/transactions-scroller';
import { TurnoverScrollerPage } from 'pages/scroller/admin/turnover-scroller/page';
import { Route } from 'react-router-dom';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';

/** Роуты в банковской части сервиса. */
export const routes = [
  /** Путь до скроллера истории запросов выписок. */
  <Route key="history-scroller" component={StatementHistoryScrollerPage} path={ADMIN_STREAM_URL.STATEMENT_HISTORY} />,
  /** Путь до скроллера связанных запросов. */
  <Route key="related-queries-scroller" component={RelatedQueriesScrollerPage} path={ADMIN_STREAM_URL.RELATED_QUERIES} />,
  /** Роут скроллера остатков и оборотов. */
  <Route key="turnover-scroller" component={TurnoverScrollerPage} path={ADMIN_STREAM_URL.STATEMENT_TURNOVER} />,
  /** Путь до ЭФ просмотра журнала удаленных или добавленных проводок. */
  <Route key="changed-entries-scroller" component={ChangedEntriesScrollerPage} path={ADMIN_STREAM_URL.CHANGED_ENTRIES} />,
  /** Путь до скроллера проводок на основании запроса. */
  <Route key="entries-scroller" component={EntriesScrollerPage} path={`${ADMIN_STREAM_URL.STATEMENT_ENTRY}/:id`} />,
  /** Путь до ЭФ журнала закрытых дней. */
  <Route key="closed-days-scroller" component={ClosedDaysScrollerPage} path={ADMIN_STREAM_URL.CLOSED_DAYS} />,
  /** Путь до ЭФ журнала сверки остатков/оборотов. */
  <Route key="closed-days-scroller" component={ReconciliationTurnoversScrollerPage} path={ADMIN_STREAM_URL.RECONCILIATION_TURNOVERS} />,
  /** Путь до ЭФ журнала курсов валют. */
  <Route key="closed-days-scroller" component={CurrencyRatesScrollerPage} path={ADMIN_STREAM_URL.CURRENCY_RATES} />,
  /** Путь до скроллера проводок. */
  <Route key="transactions-scroller" component={TransactionsScrollerPage} path={ADMIN_STREAM_URL.STATEMENT_TRANSACTIONS} />,
  /** Путь до ЭФ журнала технических работ. */
  <Route key="maintenance" component={MaintenanceScrollerPage} path={ADMIN_STREAM_URL.MAINTENANCE} />,
  /** Путь до ЭФ просмотра параметров запроса на выписку. */
  <Route key="statement-request" component={AdminFormPage} path={ADMIN_STREAM_URL.STATEMENT_REQUEST} />,
];
