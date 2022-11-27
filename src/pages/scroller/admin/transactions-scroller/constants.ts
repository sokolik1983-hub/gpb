import { SORT_DIRECTION } from '@platform/services';

/** Названия колонок для подстрок таблицы. */
export const enum COLUMN_NAMES {
  /** Дата проводки. */
  DATE = 'ENTRY_DATE',
  /** Счёт клиента. */
  ACCOUNT = 'BANK_CLIENT_NAME',
  /** Номер документа. */
  DOCUMENT = 'DOCUMENT_NUMBER',
  /** Контрагент. */
  COUNTERPARTY = 'COUNTERPARTY_NAME',
  /** Сумма списаний и поступлений. */
  SUMMARY = 'AMOUNT',
  /** Сумма поступлений. */
  INCOME = 'AMOUNT_BY_CREDIT',
  /** Сумма списаний. */
  OUTCOME = 'AMOUNT_BY_DEBIT',
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
