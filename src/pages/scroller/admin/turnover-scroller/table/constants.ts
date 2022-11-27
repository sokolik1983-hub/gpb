import type { ISortSettings } from '@platform/services';
import { SORT_DIRECTION } from '@platform/services';

/** Названия колонок скроллера. */
export const COLUMN_NAMES = {
  /** Операционная дата. */
  TURNOVER_DATE: 'TURNOVER_DATE',
  /** Номер счёта. */
  ACCOUNT_NUMBER: 'ACCOUNT_NUMBER',
  /** Организация. */
  ORGANIZATION: 'ORGANIZATION',
  /** Код филиала (баланс). */
  ACCOUNT_BRANCH: 'BALANCE_BRANCH_CODE',
  /** Код филиала (обслуживание). */
  SERVICE_BRANCH: 'SERVICE_BRANCH_CODE',
  /** Колонка с экшонами. */
  ACTIONS: 'ACTIONS',
};

/** Состояние сортровки по умолчанию. */
export const DEFAULT_SORT: ISortSettings = {
  [COLUMN_NAMES.ACCOUNT_NUMBER]: SORT_DIRECTION.DESC,
};
