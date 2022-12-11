import { repeatStatement } from 'actions/client';
import type { IExtendedIActionWithAuth } from 'interfaces';
import { DATA_ACTION } from 'interfaces/data-action';
import { locale } from 'localization';
import { PRIVILEGE } from 'stream-constants/client';
import { ServiceIcons } from '@platform/ui';

/** Функция просмотра файла выписки или документа. */
const VIEW: IExtendedIActionWithAuth = {
  dataAction: DATA_ACTION.VIEW,
  icon: ServiceIcons.EyeOpened,
  label: locale.client.actions.view,
  action: repeatStatement,
  name: 'VIEW',
  authorities: [PRIVILEGE.STATEMENT_REQUEST],
};

/** Действия строки скроллера. */
export const ROW_ACTIONS: IExtendedIActionWithAuth[] = [VIEW];
