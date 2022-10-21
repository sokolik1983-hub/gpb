import { locale } from 'localization';
import { SORT_DIRECTION } from '@platform/services';
import type { IOption } from '@platform/ui';

/** Названия колонок для подстрок таблицы. */
export const enum COLUMN_NAMES {
  /** Дата проводки. */
  DATE = 'documentDate',
  /** Счёт клиента. */
  ACCOUNT = 'accountNumber',
  /** Номер документа. */
  DOCUMENT = 'documentNumber',
  /** Контрагент. */
  COUNTERPARTY = 'counterpartyName',
  /** Сумма списаний и поступлений. */
  SUMMARY = 'SUMMARY',
  /** Сумма поступлений. */
  INCOME = 'incomingBalance',
  /** Сумма списаний. */
  OUTCOME = 'outgoingBalance',
  /** Экшоны. */
  ACTIONS = 'ACTIONS',
}

/** Состояние сортровки по умолчанию. */
export const DEFAULT_SORT = {
  [COLUMN_NAMES.DOCUMENT]: SORT_DIRECTION.DESC,
};

/** Ключ в SessionStorage для хранения состояние фильтрации. */
export const STORAGE_KEY = 'entry-filters:admin';

/** Мап сортировки для запроса на сервер. */
export const SORTING_MAP = {
  [COLUMN_NAMES.DATE]: 'ENTRY_DATE',
  [COLUMN_NAMES.DOCUMENT]: 'DOCUMENT_NUMBER',
  [COLUMN_NAMES.COUNTERPARTY]: 'COUNTERPARTY_NAME',
  [COLUMN_NAMES.INCOME]: 'AMOUNT_DEBIT',
  [COLUMN_NAMES.OUTCOME]: 'AMOUNT_CREDIT',
  [COLUMN_NAMES.SUMMARY]: ['AMOUNT_DEBIT', 'AMOUNT_CREDIT'],
};

/** Кол-во проводок, которые получаем при очередном запросе. */
export const DEFAULT_PAGE_SIZE = 25;

/** Тип группировки для скроллера проводок. */
export enum GROUP_BY {
  /** Без группировки. */
  WITHOUT = 'WITHOUT',
  /** С группировкой по счетам. */
  BY_ACCOUNT = 'BY_ACCOUNT',
}

/** Возможные опции при группировке. */
export const GROUP_BY_OPTIONS: Array<IOption<GROUP_BY>> = [
  { value: GROUP_BY.WITHOUT, label: locale.admin.entryScroller.groupBy.WITHOUT },
  { value: GROUP_BY.BY_ACCOUNT, label: locale.admin.entryScroller.groupBy.BY_ACCOUNT },
];
