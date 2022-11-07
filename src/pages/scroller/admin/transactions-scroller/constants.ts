import { SORT_DIRECTION } from '@platform/services';

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
  [COLUMN_NAMES.DATE]: SORT_DIRECTION.DESC,
};

/** Ключ в SessionStorage для хранения состояние фильтрации. */
export const STORAGE_KEY = 'transactions-filters:admin';

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
