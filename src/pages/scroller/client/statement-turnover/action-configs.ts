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

/** Действия хэдера скроллера оборотов. */
export const HEADER_ACTIONS = [CREATE_STATEMENT];
