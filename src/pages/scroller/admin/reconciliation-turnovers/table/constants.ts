import { PREFIX } from 'stream-constants/admin';
import { SORT_DIRECTION } from '@platform/services';

/**
 * Имена колонок таблицы журнала сверки остатков/оборотов.
 *
 * Для сортируемых полей, значениями должны совпадать со значениями, которые бэкенд использует для сортировки.
 * */
export const COLUMN_NAMES = {
  /** Номер счета. */
  ACCOUNT_NUMBER: 'ACCOUNT_NUMBER',
  /** Операционная дата. */
  OPERATION_DATE: 'OPERATION_DATE',
  /** Дата сверки. */
  RECONCILIATION_DATE: 'RECONCILIATION_DATE',
  /** Источник записи. */
  RECORD_SOURCE: 'RECORD_SOURCE',
  /** Статус сверки. */
  STATUS: 'STATUS',
};

/** Состояние сортировки по умолчанию. */
export const DEFAULT_SORT = {
  [COLUMN_NAMES.OPERATION_DATE]: SORT_DIRECTION.DESC,
};

/** Ключ в Session Storage, по которому хранится состояние таблицы. */
export const STORAGE_KEY = `${PREFIX}-reconciliation-turnovers-scroller-page-table`;
