import { PREFIX } from 'stream-constants/admin';
import { SORT_DIRECTION } from '@platform/services';

/**
 * Имена колонок таблицы журнала закрытых дней.
 *
 * Для сортируемых полей, значениями должны совпадать со значениями, которые бэкенд использует для сортировки.
 * */
export const COLUMN_NAMES = {
  /** Дата создания. */
  CREATION_DATE: 'createdAt',
  /** Тип события технических работ. */
  MAINTENANCE_TYPE: 'type',
};

/** Состояние сортировки по умолчанию. */
export const DEFAULT_SORT = {
  [COLUMN_NAMES.CREATION_DATE]: SORT_DIRECTION.DESC,
};

/** Ключ в Session Storage, по которому хранится состояние таблицы. */
export const STORAGE_KEY = `${PREFIX}-maintenance-scroller-page-table`;
