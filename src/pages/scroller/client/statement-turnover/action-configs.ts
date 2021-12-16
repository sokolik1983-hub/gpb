import { newStatement } from 'actions/client';
import { locale } from 'localization';
import type { IActionWithAuth } from '@platform/services';
import { Icons } from '@platform/ui';

/** Функция создания нового запроса выписки. */
export const CREATE_STATEMENT: IActionWithAuth = {
  action: newStatement,
  authorities: [],
  label: locale.action.labels.createStatement,
  name: 'CREATE_STATEMENT',
  icon: Icons.Statement,
};

/** Действия хэдера скроллера оборотов. */
export const HEADER_ACTIONS = [CREATE_STATEMENT];
