import { getExportEntries } from 'actions/admin/export-entries';
import type { IExtendedIActionWithAuth } from 'interfaces';
import { ACTION } from 'interfaces';
import { locale } from 'localization';
import { BUTTON, Icons } from '@platform/ui';

/**
 * Функция для создания конфига действия экспорта.
 *
 * @param hideDialog Экспорт без окна параметров.
 * @param withoutIcon Флаг экшена без иконки.
 */
const getExportEntriesConfig = (hideDialog: boolean, withoutIcon?: boolean): IExtendedIActionWithAuth => ({
  icon: withoutIcon ? ('' as any) : Icons.Download,
  label: '',
  action: getExportEntries(ACTION.DOWNLOAD, hideDialog),
  name: 'EXPORT_STATEMENT',
  authorities: [],
});

/**
 * Функция для создания конфига действия печати.
 *
 * @param hideDialog Печать без окна параметров.
 * @param withoutIcon Флаг экшена без иконки.
 */
const getPrintEntriesConfig = (hideDialog: boolean, withoutIcon?: boolean): IExtendedIActionWithAuth => ({
  icon: withoutIcon ? ('' as any) : Icons.PrintFile,
  label: '',
  action: getExportEntries(ACTION.PRINT, hideDialog),
  name: 'PRINT_STATEMENT',
  buttonType: BUTTON.REGULAR,
  authorities: [],
});

/** Действия в футере скроллера. */
export const FOOTER_ACTIONS = [
  { ...getPrintEntriesConfig(false, true), label: locale.admin.transactionsScroller.footer.printAction, buttonType: BUTTON.REGULAR },
  { ...getExportEntriesConfig(false, true), label: locale.admin.transactionsScroller.footer.exportAction, buttonType: BUTTON.PRIMARY },
];

/** Действия в строке вкладки "Вложения" карточки проводки. */
export const CARD_ROW_ACTIONS = [
  { ...getExportEntriesConfig(true), icon: Icons.Download },
  { ...getPrintEntriesConfig(true), icon: Icons.PrintFile },
];

/** Действия в строке проводки скроллера. */
export const ROW_ACTIONS = [
  { ...getExportEntriesConfig(false), icon: Icons.Download },
  { ...getPrintEntriesConfig(false), icon: Icons.PrintFile },
];

/** Действия футера карточки проводки. */
export const CARD_FOOTER_ACTIONS = [{ ...getExportEntriesConfig(true), label: locale.transactionCard.buttons.export }];

/** Действия футера карточки проводки в выпадающем списке. */
export const CARD_FOOTER_DROPDOWN_ACTIONS = [{ ...getPrintEntriesConfig(true), label: locale.transactionCard.buttons.print }];
