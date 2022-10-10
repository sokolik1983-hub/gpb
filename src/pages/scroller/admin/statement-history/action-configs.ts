import {
  exportRegistryStatements,
  exportStatement,
  repeatStatement,
  showStatementRequestForm,
  showTransactionsScroller,
  viewModifiedTransactions,
  viewQueryParams,
} from 'actions/admin';
import type { IExtendedIActionWithAuth } from 'interfaces';
import { DATA_ACTION } from 'interfaces/data-action';
import { locale } from 'localization';
import { Icons, ServiceIcons } from '@platform/ui';

/** Имена экшенов выписки. */
export const ACTION_NAME = {
  EXPORT_REGISTRY_STATEMENTS: 'EXPORT_REGISTRY_STATEMENTS',
  EXPORT_STATEMENT: 'EXPORT_STATEMENT',
  REPEAT_STATEMENT: 'REPEAT_STATEMENT',
  VIEW_MODIFIED_TRANSACTIONS: 'VIEW_MODIFIED_TRANSACTIONS',
  VIEW_QUERY_PARAMS: 'VIEW_QUERY_PARAMS',
  VIEW_TRANSACTIONS: 'VIEW_TRANSACTIONS',
};

/** Экшн экспорта реестра выписок. */
const EXPORT_REGISTRY_STATEMENTS: IExtendedIActionWithAuth = {
  action: exportRegistryStatements,
  authorities: [],
  dataAction: DATA_ACTION.EXPORT,
  icon: '' as any,
  label: locale.admin.historyScroller.action.exportRegistryStatements,
  name: ACTION_NAME.EXPORT_REGISTRY_STATEMENTS,
};

/** Экшн повторного запроса выписки. */
export const REPEAT_STATEMENT: IExtendedIActionWithAuth = {
  action: repeatStatement,
  authorities: [],
  dataAction: DATA_ACTION.REPEAT_REQUEST,
  icon: ServiceIcons.Refresh,
  label: locale.admin.historyScroller.action.repeatStatement,
  name: ACTION_NAME.REPEAT_STATEMENT,
};

/** Экшн экспорта выписки. */
const EXPORT_STATEMENT: IExtendedIActionWithAuth = {
  action: exportStatement,
  authorities: [],
  dataAction: DATA_ACTION.EXPORT,
  icon: Icons.Download,
  label: locale.admin.historyScroller.action.exportStatement,
  name: ACTION_NAME.EXPORT_STATEMENT,
};

/** Экшно создания запроса выписки. */
export const CREATE_STATEMENT: IExtendedIActionWithAuth = {
  authorities: [],
  action: showStatementRequestForm,
  icon: Icons.Statement,
  label: locale.admin.historyScroller.action.createStatement,
  name: 'CREATE_STATEMENT',
};

/** Экшн просмотра изменных проводок. */
export const VIEW_MODIFIED_TRANSACTIONS: IExtendedIActionWithAuth = {
  authorities: [],
  action: viewModifiedTransactions,
  icon: ServiceIcons.EyeOpened,
  label: locale.admin.historyScroller.action.viewModifiedTransactions,
  name: ACTION_NAME.VIEW_MODIFIED_TRANSACTIONS,
};

/** Экшн просмотра выписки (проводок). */
export const VIEW_TRANSACTIONS: IExtendedIActionWithAuth = {
  authorities: [],
  action: showTransactionsScroller,
  icon: ServiceIcons.EyeOpened,
  label: locale.admin.historyScroller.action.viewTransactions,
  name: ACTION_NAME.VIEW_TRANSACTIONS,
};

/** Экшн просмотра параметров запроса выписки. */
export const VIEW_QUERY_PARAMS: IExtendedIActionWithAuth = {
  authorities: [],
  action: viewQueryParams,
  icon: ServiceIcons.EyeOpened,
  label: locale.admin.historyScroller.action.viewQueryParams,
  name: ACTION_NAME.VIEW_QUERY_PARAMS,
};

/** Экшены футера скроллера Истории запросов выписок. */
export const FOOTER_ACTIONS = [EXPORT_REGISTRY_STATEMENTS];

/** Экшены выписки строки скроллреа Истории запросов выписок. */
export const ROW_ACTIONS = [EXPORT_STATEMENT, VIEW_QUERY_PARAMS, VIEW_TRANSACTIONS];

/** Экшены в заголовке скроллера Истории запросов выписок. */
export const HEADER_ACTIONS = [EXPORT_REGISTRY_STATEMENTS];
