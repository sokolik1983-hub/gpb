import { createStatement } from 'actions/client';
import { showScheduleRequestForm } from 'actions/client/show-schedule-request-form';
import { showStatementRequestForm } from 'actions/client/show-statement-request-form';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { locale } from 'localization';
import { PRIVILEGE } from 'stream-constants/client';
import type { IActionWithAuth } from '@platform/services';
import { Icons } from '@platform/ui';

/** Функция создания нового запроса выписки. */
export const CREATE_STATEMENT: IActionWithAuth = {
  action: showStatementRequestForm,
  authorities: [PRIVILEGE.STATEMENT_REQUEST],
  label: locale.action.labels.createStatement,
  name: 'CREATE_STATEMENT',
  icon: Icons.Statement,
};

/** Функция создания нового запроса выписки по расписанию. */
export const CREATE_SCHEDULE_STATEMENT: IActionWithAuth = {
  action: showScheduleRequestForm,
  authorities: [PRIVILEGE.STATEMENT_REQUEST],
  label: locale.action.labels.createScheduleStatement,
  name: 'CREATE_STATEMENT',
  icon: Icons.Statement,
};

/** Действие экспорта выписки из ОСВ. */
export const EXPORT_ACTION: IActionWithAuth = {
  authorities: [PRIVILEGE.STATEMENT_REQUEST, PRIVILEGE.ATTACHMENT_DOWNLOAD],
  action: createStatement(EXPORT_PARAMS_USE_CASES.FIFTEEN),
  icon: Icons.Download,
  label: locale.form.buttons.download.label,
  name: 'TURNOVER_EXPORT',
};

/** Действие печати выписки из ОСВ. */
export const PRINT_ACTION: IActionWithAuth = {
  authorities: [PRIVILEGE.STATEMENT_REQUEST, PRIVILEGE.ATTACHMENT_DOWNLOAD],
  action: createStatement(EXPORT_PARAMS_USE_CASES.FIFTEEN),
  icon: Icons.PrintFile,
  label: locale.form.buttons.print.label,
  name: 'TURNOVER_PRINT',
};

/** Действия хэдера скроллера оборотов. */
export const HEADER_ACTIONS = [CREATE_SCHEDULE_STATEMENT, CREATE_STATEMENT];
