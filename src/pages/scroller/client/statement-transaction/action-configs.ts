import { getExportStatement } from 'actions/client/export-statement';
import { getPrintStatement } from 'actions/client/print-statement';
import { EXPORT_PARAMS_USE_CASES } from 'components/export-params-dialog/statemet-params-use-cases';
import type { IExtendedIActionWithAuth } from 'interfaces';
import { locale } from 'localization';
import { BUTTON, Icons, ServiceIcons } from '@platform/ui';

/**
 * Функция для создания конфига действия экспорта.
 *
 * @param useCase Вариант (место) использования в сервисе.
 */
const getExportStatementConfig = (useCase: EXPORT_PARAMS_USE_CASES): IExtendedIActionWithAuth => ({
  icon: Icons.Download,
  label: '',
  action: getExportStatement(useCase),
  name: 'EXPORT_STATEMENT',
  authorities: [
    /* TODO: добавить когда будет готова ролевая. */
  ],
});

/**
 * Функция для создания конфига действия печати.
 *
 * @param useCase Вариант (место) использования в сервисе.
 */
const getPrintStatementConfig = (useCase: EXPORT_PARAMS_USE_CASES): IExtendedIActionWithAuth => ({
  icon: ServiceIcons.Refresh,
  label: '',
  action: getPrintStatement(useCase),
  name: 'PRINT_STATEMENT',
  buttonType: BUTTON.REGULAR,
  authorities: [
    /* TODO: добавить когда будет готова ролевая. */
  ],
});

/** Действия заголовка скроллера. */
export const HEADER_ACTIONS = [
  { ...getPrintStatementConfig(EXPORT_PARAMS_USE_CASES.TWO), label: locale.transactionsScroller.headerAction.print },
  { ...getExportStatementConfig(EXPORT_PARAMS_USE_CASES.ONE), label: locale.transactionsScroller.headerAction.export },
];

/** Действия в футере скроллера. */
export const FOOTER_ACTIONS = [
  { ...getExportStatementConfig(EXPORT_PARAMS_USE_CASES.THREE), label: locale.transactionsScroller.footerAction.export },
];

/* Действия футера скроллера в выпадающем списке. */
export const FOOTER_DROPDOWN_ACTIONS = [
  { ...getPrintStatementConfig(EXPORT_PARAMS_USE_CASES.FOUR), label: locale.transactionsScroller.footerAction.print },
];

/** Действия строки скроллера в выпадающем списке. */
export const ROW_DROPDOWN_ACTIONS = [
  { ...getExportStatementConfig(EXPORT_PARAMS_USE_CASES.SIX), label: locale.transactionsScroller.rowAction.export },
  { ...getPrintStatementConfig(EXPORT_PARAMS_USE_CASES.SEVEN), label: locale.transactionsScroller.rowAction.print },
];

/** Действия в строке вкладки "Вложения" карточки проводки. */
export const CARD_ROW_ACTIONS = [
  { ...getExportStatementConfig(EXPORT_PARAMS_USE_CASES.TWELVE), icon: Icons.Download },
  { ...getPrintStatementConfig(EXPORT_PARAMS_USE_CASES.THIRTEEN), icon: Icons.PrintFile },
];

/** Действия футера карточки проводки. */
export const CARD_FOOTER_ACTIONS = [
  { ...getExportStatementConfig(EXPORT_PARAMS_USE_CASES.TEN), label: locale.transactionCard.buttons.export },
];

/** Действия футера карточки проводки в выпадающем списке. */
export const CARD_FOOTER_DROPDOWN_ACTIONS = [
  { ...getPrintStatementConfig(EXPORT_PARAMS_USE_CASES.NINE), label: locale.transactionCard.buttons.print },
];
