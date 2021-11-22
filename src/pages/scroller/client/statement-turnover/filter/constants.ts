import { GROUPING_VALUES } from 'interfaces/client';
import { locale } from 'localization';
import { pathGenerator } from '@platform/core';
import type { IFilterField } from '@platform/services';
import type { IOption } from '@platform/ui';
import type { FormState } from './interfaces';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<FormState>();

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
  GROUP_BY: getPath('grouping'),
  /** Только активные счета. */
  ONLY_ACTIVE_ACCOUNTS: getPath('onlyActiveAccounts'),
  /** Выбранные организации. */
  ORGANIZATIONS: getPath('organizations'),
};

// Сгенерированные фильтры не будут использоваться, поэтому используется пустой объект, чтобы избезать ошибку типизации.
/** Значения полей и условия фильтрации для useFilter. */
export const fields: Record<string, IFilterField> = {};

/** Лейблы тегов полей фильтра. */
export const tagLabels = {
  // Здесь должны быть только те поля теги для которых нужно отображать на панели тегов.
  [FORM_FIELDS.DATE_FROM]: locale.turnoverScroller.filter.tags.dateFrom,
  [FORM_FIELDS.DATE_TO]: locale.turnoverScroller.filter.tags.dateTo,
  [FORM_FIELDS.ACCOUNTS]: locale.turnoverScroller.filter.tags.accounts,
  [FORM_FIELDS.ORGANIZATIONS]: locale.turnoverScroller.filter.tags.organizations,
};

/** Определяет порядок следования тегов на панели тэгов. */
export const TAGS_ORDER = [FORM_FIELDS.DATE_FROM, FORM_FIELDS.DATE_TO, FORM_FIELDS.ACCOUNTS, FORM_FIELDS.ORGANIZATIONS];

/** Опции селекта выбора группировки. */
export const GROUPING_OPTIONS: Array<IOption<GROUPING_VALUES>> = [
  { value: GROUPING_VALUES.NO_GROUPING, label: locale.turnoverScroller.filter.grouping.noGrouping },
  { value: GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES, label: locale.turnoverScroller.filter.grouping.organizationsAndCurrencies },
  { value: GROUPING_VALUES.ORGANIZATIONS, label: locale.turnoverScroller.filter.grouping.organizations },
  { value: GROUPING_VALUES.CURRENCIES, label: locale.turnoverScroller.filter.grouping.currencies },
  { value: GROUPING_VALUES.BRANCHES, label: locale.turnoverScroller.filter.grouping.branches },
  { value: GROUPING_VALUES.ACCOUNT_TYPE, label: locale.turnoverScroller.filter.grouping.accountType },
];
