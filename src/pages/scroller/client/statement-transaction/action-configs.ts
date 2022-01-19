import { noopAction } from 'actions/common';
import type { IExtendedIActionWithAuth } from 'interfaces';
import { locale } from 'localization';
import { Icons, RegularButton, ServiceIcons } from '@platform/ui';

/** Экспорт выписки. */
const EXPORT_STATEMENT: IExtendedIActionWithAuth = {
  icon: Icons.Download,
  label: locale.transactionsScroller.headerAction.export,
  action: noopAction,
  name: 'EXPORT_STATEMENT',
  authorities: [
    /* TODO: добавить когда будет готова ролевая. */
  ],
};

/** Печать выписки. */
const PRINT_STATEMENT: IExtendedIActionWithAuth = {
  icon: ServiceIcons.Refresh,
  label: locale.transactionsScroller.headerAction.print,
  action: noopAction,
  name: 'PRINT_STATEMENT',
  buttonType: RegularButton,
  authorities: [
    /* TODO: добавить когда будет готова ролевая. */
  ],
};

/** Действия строки скроллера. */
export const HEADER_ACTIONS = [PRINT_STATEMENT, EXPORT_STATEMENT];
