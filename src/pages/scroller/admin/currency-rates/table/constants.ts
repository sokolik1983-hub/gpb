import { PREFIX } from 'stream-constants/admin';
import { SORT_DIRECTION } from '@platform/services';

/**
 * Имена колонок таблицы справочника валют.
 *
 * Для сортируемых полей, значениями должны совпадать со значениями, которые бэкенд использует для сортировки.
 * */
export const COLUMN_NAMES = {
  /** Буквенный код валюты. */
  LETTER_CODE: 'LETTER_CODE',
  /** Дата курса. */
  RATE_DATE: 'RATE_DATE',
  /** Значение курса. */
  RATE_VALUE: 'rateValue',
  /** Курс за количество единиц. */
  UNITS: 'units',
};

/** Состояние сортировки по умолчанию. */
export const DEFAULT_SORT = {
  [COLUMN_NAMES.RATE_DATE]: SORT_DIRECTION.DESC,
};

/** Ключ в Session Storage, по которому хранится состояние таблицы. */
export const STORAGE_KEY = `${PREFIX}-currency-rates-scroller-page-table`;
