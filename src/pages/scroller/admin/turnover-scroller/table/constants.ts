import type { ISortSettings } from '@platform/services';
import { SORT_DIRECTION } from '@platform/services';

/** Названия колонок скроллера. */
export const COLUMN_NAMES = {
  /** Операционная дата. */
  CREATION_DATE: 'turnoverDate',
  /** Номер счёта. */
  ACCOUNT_NUMBER: 'accountNumber',
  /** Организация. */
  ORGANIZATION: 'bankClientId',
  /** Код филиала (баланс). */
  ACCOUNT_BRANCH: 'balanceBranchCode',
  /** Код филиала (обслуживание). */
  SERVICE_BRANCH: 'serviceBranchCode',
  /** Колонка с экшонами. */
  ACTIONS: 'ACTIONS',
};

/** Состояние сортровки по умолчанию. */
export const DEFAULT_SORT: ISortSettings = {
  [COLUMN_NAMES.ACCOUNT_NUMBER]: SORT_DIRECTION.DESC,
};
