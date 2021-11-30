import { GROUPING_VALUES } from 'interfaces/client';
import { locale } from 'localization';
import { pathGenerator } from '@platform/core';
import type { IFilterField } from '@platform/services';
import type { IOption } from '@platform/ui';
import type { IFormState } from './interfaces';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<IFormState>();

/** Поля формы фильтра. */
export const FORM_FIELDS = {
  /** Временной период. */
  DATE_PERIOD: getPath('datePeriod'),
  /** Начало периода.  */
  DATE_FROM: getPath('dateFrom'),
  /** Конец периода. */
  DATE_TO: getPath('dateTo'),
  /** Выбранные счета клиента. */
  ACCOUNTS: getPath('accounts'),
  /** Группировка записей. */
  GROUP_BY: getPath('groupBy'),
  /** Только активные счета. */
  ONLY_ACTIVE_ACCOUNTS: getPath('onlyActiveAccounts'),
};

/** Значения полей и условия фильтрации для useFilter. */
export const fields: Record<string, IFilterField> = {
  // Сгенерированные фильтры не будут использоваться, поэтому используется пустой объект,
  // чтобы избежать ошибку TS при сборке.
};

/** Лейблы тегов полей фильтра. */
export const labels = {
  // На скроллере не используются теги, параметр передаётся только,
  // чтобы избежать ошибку TS при сборке.
};

/** Опции селекта выбора группировки. */
export const GROUPING_OPTIONS: Array<IOption<GROUPING_VALUES>> = [
  { value: GROUPING_VALUES.NO_GROUPING, label: locale.turnoverScroller.filter.grouping.noGrouping },
  { value: GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES, label: locale.turnoverScroller.filter.grouping.organizationsAndCurrencies },
  { value: GROUPING_VALUES.ORGANIZATIONS, label: locale.turnoverScroller.filter.grouping.organizations },
  { value: GROUPING_VALUES.CURRENCIES, label: locale.turnoverScroller.filter.grouping.currencies },
  { value: GROUPING_VALUES.BRANCHES, label: locale.turnoverScroller.filter.grouping.branches },
  { value: GROUPING_VALUES.ACCOUNT_TYPE, label: locale.turnoverScroller.filter.grouping.accountType },
];
