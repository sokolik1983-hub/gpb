import { createStatement } from 'actions/client';
import { showStatementForm } from 'actions/client/show-statement-form';
import { locale } from 'localization';
import { PRIVILEGE } from 'stream-constants/client';
import type { IActionWithAuth } from '@platform/services';
import { Icons } from '@platform/ui';

/** Функция создания нового запроса выписки. */
export const CREATE_STATEMENT: IActionWithAuth = {
  action: showStatementForm,
  authorities: [PRIVILEGE.STATEMENT_REQUEST],
  label: locale.action.labels.createStatement,
  name: 'CREATE_STATEMENT',
  icon: Icons.Statement,
};

/** Действие экспорта выписки из ОСВ. */
export const EXPORT_ACTION: IActionWithAuth = {
  authorities: [PRIVILEGE.STATEMENT_REQUEST, PRIVILEGE.ATTACHMENT_DOWNLOAD],
  action: createStatement,
  icon: Icons.Download,
  label: locale.form.buttons.download.label,
  name: 'TURNOVER_EXPORT',
};

/** Действие печати выписки из ОСВ. */
export const PRINT_ACTION: IActionWithAuth = {
  authorities: [PRIVILEGE.STATEMENT_REQUEST, PRIVILEGE.ATTACHMENT_DOWNLOAD],
  action: createStatement,
  icon: Icons.PrintFile,
  label: locale.form.buttons.print.label,
  name: 'TURNOVER_PRINT',
};

/** Действия хэдера скроллера оборотов. */
export const HEADER_ACTIONS = [CREATE_STATEMENT];
