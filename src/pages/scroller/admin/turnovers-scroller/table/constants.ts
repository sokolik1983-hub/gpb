import { SORT_DIRECTION } from '@platform/services';

/** Ключ в sessionStorage для хранения фильтров. */
export const STORAGE_KEY = '';

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
export const DEFAULT_SORT = {
  [COLUMN_NAMES.CREATION_DATE]: SORT_DIRECTION.DESC,
};
