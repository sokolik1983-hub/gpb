import { getExportStatementAttachment } from 'actions/admin/export-statement-attachement';
import { getPrintStatementAttachment } from 'actions/admin/print-statement-attachement';
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
  action: getExportStatementAttachment(),
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
  action: getPrintStatementAttachment(),
  name: 'PRINT_STATEMENT',
  buttonType: BUTTON.REGULAR,
  authorities: [],
});

/** Действия в строке вкладки "Вложения" карточки проводки. */
export const CARD_ROW_ACTIONS = [
  { ...getExportStatementConfig(), icon: Icons.Download },
  { ...getPrintStatementConfig(), icon: Icons.PrintFile },
];

/** Действия футера карточки проводки. */
export const CARD_FOOTER_ACTIONS = [
  { ...getExportStatementConfig(), label: locale.transactionCard.buttons.export, buttonType: BUTTON.PRIMARY },
  { ...getPrintStatementConfig(), label: locale.transactionCard.buttons.print },
];

/** Набор экшонов футера скроллера. */
export const FOOTER_ACTIONS = [
  { ...getPrintStatementConfig(), label: locale.admin.entryScroller.footer.print },
  { ...getExportStatementConfig(), label: locale.admin.entryScroller.footer.export },
];

/** Набор экшонов хэдера скроллера. */
export const HEADER_ACTIONS = [
  { ...getPrintStatementConfig(), label: locale.transactionCard.buttons.print },
  { ...getExportStatementConfig(), label: locale.transactionCard.buttons.export, buttonType: BUTTON.PRIMARY },
];
