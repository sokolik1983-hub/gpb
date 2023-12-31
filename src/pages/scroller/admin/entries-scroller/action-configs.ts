import { exportStatement, printStatement } from 'actions/admin';
import type { IExtendedIActionWithAuth } from 'interfaces';
import { locale } from 'localization';
import { BUTTON, Icons } from '@platform/ui';

/**
 * Функция для создания конфига действия экспорта.
 *
 * @param withoutIcon Флаг экшена без иконки.
 */
const getExportStatementConfig = (withoutIcon?: boolean): IExtendedIActionWithAuth => ({
  icon: withoutIcon ? ('' as any) : Icons.Download,
  label: '',
  action: exportStatement,
  name: 'EXPORT_STATEMENT',
  authorities: [],
});

/**
 * Функция для создания конфига действия печати.
 *
 * @param withoutIcon Флаг экшена без иконки.
 */
const getPrintStatementConfig = (withoutIcon?: boolean): IExtendedIActionWithAuth => ({
  icon: withoutIcon ? ('' as any) : Icons.PrintFile,
  label: '',
  action: printStatement,
  name: 'PRINT_STATEMENT',
  buttonType: BUTTON.REGULAR,
  authorities: [],
});

/** Действия заголовка скроллера. */
export const HEADER_ACTIONS = [
  { ...getPrintStatementConfig(), label: locale.transactionCard.buttons.print },
  { ...getExportStatementConfig(), label: locale.transactionCard.buttons.export },
];

/** Действия в футере скроллера. */
export const FOOTER_ACTIONS = [
  { ...getExportStatementConfig(true), label: locale.transactionCard.buttons.export },
  { ...getPrintStatementConfig(true), label: locale.transactionCard.buttons.print },
];

/** Действия в строке проводки скроллера. */
export const ROW_ACTIONS = [
  { ...getExportStatementConfig(), icon: Icons.Download },
  { ...getPrintStatementConfig(), icon: Icons.PrintFile },
];
