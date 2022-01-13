import { locale } from 'localization';

/** Вкладки диалога "Карточка проводки". */
export enum TABS {
  /** Вкладка "Реквизиты". */
  REQUISITES = 'REQUISITES',
  /** Вкладка "Приложения". */
  ATTACHMENTS = 'ATTACHMENTS',
}

/** Опции вкладок диалога "Карточка проводки". */
export const TAB_OPTIONS = [
  { value: TABS.REQUISITES, label: locale.transactionCard.tabs.requisites },
  { value: TABS.ATTACHMENTS, label: locale.transactionCard.tabs.attachments },
];
