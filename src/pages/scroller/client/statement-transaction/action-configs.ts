import { getExportStatement, getPrintStatement } from 'actions/client';
import { EXPORT_PARAMS_USE_CASES } from 'components/export-params-dialog/statemet-params-use-cases';
import type { IExtendedIActionWithAuth } from 'interfaces';
import { locale } from 'localization';
import { Icons, ServiceIcons, BUTTON } from '@platform/ui';

// Заглушка для конфига действия экспорта.
const EXPORT_STATEMENT: IExtendedIActionWithAuth = {
  icon: Icons.Download,
  label: '',
  action: getExportStatement(EXPORT_PARAMS_USE_CASES.ONE),,
  name: 'EXPORT_STATEMENT',
  authorities: [
    /* TODO: добавить когда будет готова ролевая. */
  ],
};

// Заглушка для конфига действия печати.
const PRINT_STATEMENT: IExtendedIActionWithAuth = {
  icon: ServiceIcons.Refresh,
  label: '',
  action: getPrintStatement(EXPORT_PARAMS_USE_CASES.TWO),,
  name: 'PRINT_STATEMENT',
  buttonType: BUTTON.REGULAR,
  authorities: [
    /* TODO: добавить когда будет готова ролевая. */
  ],
};

/** Действия заголовка скроллера. */
export const HEADER_ACTIONS = [
  { ...PRINT_STATEMENT, label: locale.transactionsScroller.headerAction.print },
  { ...EXPORT_STATEMENT, label: locale.transactionsScroller.headerAction.export },
];

/** Действия в футере скроллера. */
export const FOOTER_ACTIONS = [{ ...EXPORT_STATEMENT, label: locale.transactionsScroller.footerAction.export }];

/* Действия футера скроллера в выпадающем списке. */
export const FOOTER_DROPDOWN_ACTIONS = [{ ...PRINT_STATEMENT, label: locale.transactionsScroller.footerAction.print }];

/** Действия строки скроллера в выпадающем списке. */
export const ROW_DROPDOWN_ACTIONS = [
  { ...EXPORT_STATEMENT, label: locale.transactionsScroller.rowAction.export },
  { ...PRINT_STATEMENT, label: locale.transactionsScroller.rowAction.print },
];

/** Действия в строке вкладки "Вложения" карточки проводки. */
export const CARD_ROW_ACTIONS = [
  { ...EXPORT_STATEMENT, icon: Icons.Download },
  { ...PRINT_STATEMENT, icon: Icons.PrintFile },
];

/** Действия футера карточки проводки. */
export const CARD_FOOTER_ACTIONS = [{ ...EXPORT_STATEMENT, label: locale.transactionCard.buttons.export }];

/** Действия футера карточки проводки в выпадающем списке. */
export const CARD_FOOTER_DROPDOWN_ACTIONS = [{ ...PRINT_STATEMENT, label: locale.transactionCard.buttons.print }];
