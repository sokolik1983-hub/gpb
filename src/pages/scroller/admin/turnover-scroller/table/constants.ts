import type { ISortSettings } from '@platform/services';
import { SORT_DIRECTION } from '@platform/services';

/** Названия колонок скроллера. */
export const COLUMN_NAMES = {
  /** Операционная дата. */
  CREATION_DATE: 'creationDate',
  /** Номер счёта. */
  ACCOUNT_NUMBER: 'account.number',
  /** Организация. */
  ORGANIZATION: 'account.bankClient.name',
  /** Филиал баланса счёта. */
  ACCOUNT_BRANCH: 'accountBranch',
  /** Филиал обслуживания. */
  SERVICE_BRANCH: 'serviceBranch',
  /** Колонка с экшонами. */
  ACTIONS: 'ACTIONS',
};

/** Состояние сортровки по умолчанию. */
export const DEFAULT_SORT: ISortSettings = {
  [COLUMN_NAMES.ACCOUNT_NUMBER]: SORT_DIRECTION.DESC,
};
