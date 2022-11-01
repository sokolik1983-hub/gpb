import { SORT_DIRECTION } from '@platform/services';

/**
 * Имена колонок таблицы журнала закрытых дней.
 *
 * Для сортируемых полей, значениями должны совпадать со значениями, которые бэкенд использует для сортировки.
 * */
export const COLUMN_NAMES = {
  /** Операционная дата. */
  OPERATION_DATA: 'operationDate',
  /** Филиал. */
  BRANCH: 'branch',
  /** Вторая фаза. */
  SECOND_PHASE: 'secondPhase',
  /** Третья фаза. */
  THIRD_PHASE: 'thirdPhase',
};

/** Состояние сортировки по умолчанию. */
export const DEFAULT_SORT = {
  [COLUMN_NAMES.OPERATION_DATA]: SORT_DIRECTION.DESC,
};
