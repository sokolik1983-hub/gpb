import {
  exportStatementsHistory,
  repeatStatement,
  showStatementRequestForm,
  viewTransactionsScroller,
  viewStatementRequestCard,
  viewChangedEntriesScroller,
  exportExistingStatement,
} from 'actions/admin';
import type { IExtendedIActionWithAuth } from 'interfaces';
import { DATA_ACTION } from 'interfaces/data-action';
import { locale } from 'localization';
import { Icons, ServiceIcons } from '@platform/ui';

/** Имена экшенов выписки. */
const ACTION_NAME = {
  EXPORT_REGISTRY_STATEMENTS: 'EXPORT_REGISTRY_STATEMENTS',
  EXPORT_STATEMENT: 'EXPORT_STATEMENT',
  REPEAT_STATEMENT: 'REPEAT_STATEMENT',
  VIEW_MODIFIED_TRANSACTIONS: 'VIEW_MODIFIED_TRANSACTIONS',
  VIEW_QUERY_PARAMS: 'VIEW_QUERY_PARAMS',
  VIEW_TRANSACTIONS: 'VIEW_TRANSACTIONS',
};

/** Экшн экспорта реестра выписок. */
const EXPORT_STATEMENTS_HISTORY: IExtendedIActionWithAuth = {
  action: exportStatementsHistory,
  authorities: [],
  dataAction: DATA_ACTION.EXPORT,
  icon: '' as any,
  label: locale.admin.statementScroller.action.exportRegistryStatements,
  name: ACTION_NAME.EXPORT_REGISTRY_STATEMENTS,
};

/** Экшн повторного запроса выписки. */
export const REPEAT_STATEMENT: IExtendedIActionWithAuth = {
  action: repeatStatement,
  authorities: [],
  dataAction: DATA_ACTION.REPEAT_REQUEST,
  icon: ServiceIcons.Refresh,
  label: locale.admin.statementScroller.action.repeatStatement,
  name: ACTION_NAME.REPEAT_STATEMENT,
};

/** Экшн экспорта выписки. */
const EXPORT_STATEMENT: IExtendedIActionWithAuth = {
  action: exportExistingStatement,
  authorities: [],
  dataAction: DATA_ACTION.EXPORT,
  icon: Icons.Export,
  label: locale.admin.statementScroller.action.exportStatement,
  name: ACTION_NAME.EXPORT_STATEMENT,
};

/** Экшно создания запроса выписки. */
const CREATE_STATEMENT: IExtendedIActionWithAuth = {
  authorities: [],
  action: showStatementRequestForm,
  icon: Icons.Statement,
  label: locale.admin.statementScroller.action.createStatement,
  name: 'CREATE_STATEMENT',
};

/** Экшн просмотра измененных проводок. */
export const VIEW_MODIFIED_TRANSACTIONS: IExtendedIActionWithAuth = {
  authorities: [],
  action: viewChangedEntriesScroller,
  icon: ServiceIcons.EyeOpened,
  label: locale.admin.statementScroller.action.viewModifiedTransactions,
  name: ACTION_NAME.VIEW_MODIFIED_TRANSACTIONS,
};

/** Экшн просмотра выписки (проводок). */
const VIEW_TRANSACTIONS: IExtendedIActionWithAuth = {
  authorities: [],
  action: viewTransactionsScroller,
  icon: ServiceIcons.EyeOpened,
  label: locale.admin.statementScroller.action.viewTransactions,
  name: ACTION_NAME.VIEW_TRANSACTIONS,
};

/** Экшн просмотра параметров запроса выписки. */
const VIEW_STATEMENT_REQUEST_PARAMS: IExtendedIActionWithAuth = {
  authorities: [],
  action: viewStatementRequestCard,
  icon: ServiceIcons.EyeOpened,
  label: locale.admin.statementScroller.action.viewQueryParams,
  name: ACTION_NAME.VIEW_QUERY_PARAMS,
};

/** Экшены футера скроллера. */
export const FOOTER_ACTIONS = [EXPORT_STATEMENTS_HISTORY];

/** Экшены выписки строки скроллера. */
export const ROW_ACTIONS = [EXPORT_STATEMENT, VIEW_STATEMENT_REQUEST_PARAMS, VIEW_TRANSACTIONS, VIEW_MODIFIED_TRANSACTIONS];

/** Экшены в заголовке скроллера. */
export const HEADER_ACTIONS = [EXPORT_STATEMENTS_HISTORY, CREATE_STATEMENT];
