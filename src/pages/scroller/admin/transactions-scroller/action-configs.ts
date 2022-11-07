import { getExportStatementAttachment } from 'actions/admin/export-statement-attachement';
import { getPrintStatementAttachment } from 'actions/admin/print-statement-attachement';
import type { IExtendedIActionWithAuth } from 'interfaces';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/admin';
import { locale } from 'localization';
import { BUTTON, Icons } from '@platform/ui';

/**
 * Функция для создания конфига действия экспорта.
 *
 * @param useCase Вариант (место) использования в сервисе.
 * @param withoutIcon Флаг экшена без иконки.
 */
const getExportStatementConfig = (useCase: EXPORT_PARAMS_USE_CASES, withoutIcon?: boolean): IExtendedIActionWithAuth => ({
  icon: withoutIcon ? ('' as any) : Icons.Download,
  label: '',
  action: getExportStatementAttachment(useCase),
  name: 'EXPORT_STATEMENT',
  authorities: [],
});

/**
 * Функция для создания конфига действия печати.
 *
 * @param useCase Вариант (место) использования в сервисе.
 * @param withoutIcon Флаг экшена без иконки.
 */
const getPrintStatementConfig = (useCase: EXPORT_PARAMS_USE_CASES, withoutIcon?: boolean): IExtendedIActionWithAuth => ({
  icon: withoutIcon ? ('' as any) : Icons.PrintFile,
  label: '',
  action: getPrintStatementAttachment(useCase),
  name: 'PRINT_STATEMENT',
  buttonType: BUTTON.REGULAR,
  authorities: [],
});

/** Действия заголовка скроллера. */
export const HEADER_ACTIONS = [
  { ...getPrintStatementConfig(EXPORT_PARAMS_USE_CASES.TWO), label: locale.transactionCard.buttons.print },
  { ...getExportStatementConfig(EXPORT_PARAMS_USE_CASES.ONE), label: locale.transactionCard.buttons.export },
];

/** Действия в футере скроллера. */
export const FOOTER_ACTIONS = [
  { ...getExportStatementConfig(EXPORT_PARAMS_USE_CASES.THREE, true), label: locale.transactionCard.buttons.export },
  { ...getPrintStatementConfig(EXPORT_PARAMS_USE_CASES.FOUR, true), label: locale.transactionCard.buttons.print },
];

/** Действия в строке вкладки "Вложения" карточки проводки. */
export const CARD_ROW_ACTIONS = [
  { ...getExportStatementConfig(EXPORT_PARAMS_USE_CASES.TWELVE), icon: Icons.Download },
  { ...getPrintStatementConfig(EXPORT_PARAMS_USE_CASES.THIRTEEN), icon: Icons.PrintFile },
];

/** Действия в строке проводки скроллера. */
export const ROW_ACTIONS = [
  { ...getExportStatementConfig(EXPORT_PARAMS_USE_CASES.SIX), icon: Icons.Download },
  { ...getPrintStatementConfig(EXPORT_PARAMS_USE_CASES.SEVEN), icon: Icons.PrintFile },
];

/** Действия футера карточки проводки. */
export const CARD_FOOTER_ACTIONS = [
  { ...getExportStatementConfig(EXPORT_PARAMS_USE_CASES.TEN), label: locale.transactionCard.buttons.export },
];

/** Действия футера карточки проводки в выпадающем списке. */
export const CARD_FOOTER_DROPDOWN_ACTIONS = [
  { ...getPrintStatementConfig(EXPORT_PARAMS_USE_CASES.NINE), label: locale.transactionCard.buttons.print },
];
