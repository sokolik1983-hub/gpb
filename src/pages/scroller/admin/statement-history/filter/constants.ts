import { DATE_PERIODS, STATEMENT_REQUEST_STATUSES, STATEMENT_STATUSES, STATEMENT_TYPE } from 'interfaces';
import { locale } from 'localization';
import { ALL_VALUE, EMPTY_VALUE } from 'stream-constants';
import { PREFIX, STATEMENT_STATUS_LABEL, STATEMENT_TYPE_LABEL } from 'stream-constants/admin';
import { STATEMENT_REQUEST_STATUS_LABEL } from 'stream-constants/admin/statuses';
import { pathGenerator } from '@platform/core';
import type { IFilterField } from '@platform/services';
import { filterFields } from '@platform/services';
import { dateWithEndOfDay, dateWithStartOfDay } from '@platform/tools/date-time';
import type { IOption } from '@platform/ui';
import type { FilterValues } from './types';
import { addColon } from './utils';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<FilterValues>();

/** Поля формы фильтра. */
export const FORM_FIELDS = {
  /** Счета. */
  ACCOUNT_IDS: getPath('accountIds'),
  /** Начало периода. */
  DATE_FROM: getPath('dateFrom'),
  /** Конец периода. */
  DATE_TO: getPath('dateTo'),
  /** Организация. */
  ORGANIZATION_IDS: getPath('organizationIds'),
  /** Период. */
  PERIOD: getPath('period'),
  /** Тип периода. */
  PERIOD_TYPE: getPath('periodType'),
  /** Статус запроса. */
  REQUEST_STATUS: getPath('requestStatus'),
  /** Подразделение обслуживания. */
  SERVICE_BRANCH_IDS: getPath('serviceBranchIds'),
  /** Электронная подпись. */
  SIGNED: getPath('signed'),
  /** Тип выписки. */
  STATEMENT_TYPE: getPath('statement'),
  /** Статус выписки. */
  STATEMENT_STATUS: getPath('statementStatus'),
  /** Пользователь. */
  USER_IDS: getPath('userIds'),
};

/** Список дополнительных полей формы фильтра. */
export const ADDITIONAL_FORM_FIELDS = [
  FORM_FIELDS.ORGANIZATION_IDS,
  FORM_FIELDS.PERIOD,
  FORM_FIELDS.REQUEST_STATUS,
  FORM_FIELDS.SERVICE_BRANCH_IDS,
  FORM_FIELDS.SIGNED,
  FORM_FIELDS.STATEMENT_TYPE,
  FORM_FIELDS.STATEMENT_STATUS,
  FORM_FIELDS.USER_IDS,
];

/** Значения полей и условия фильтрации (для useFilter). */
export const fields: Record<string, IFilterField> = {
  [FORM_FIELDS.ACCOUNT_IDS]: filterFields.in([], 'accountId'),
  [FORM_FIELDS.DATE_FROM]: filterFields.ge(EMPTY_VALUE, 'createdAt', value => dateWithStartOfDay(value as string)),
  [FORM_FIELDS.DATE_TO]: filterFields.le(EMPTY_VALUE, 'createdAt', value => dateWithEndOfDay(value as string)),
  [FORM_FIELDS.ORGANIZATION_IDS]: filterFields.in([], 'organizationId'),
  [FORM_FIELDS.PERIOD]: filterFields.in([], 'type'),
  [FORM_FIELDS.PERIOD_TYPE]: filterFields.eq(DATE_PERIODS.YESTERDAY),
  [FORM_FIELDS.REQUEST_STATUS]: filterFields.in([ALL_VALUE], 'status'),
  [FORM_FIELDS.SERVICE_BRANCH_IDS]: filterFields.in([], 'subdivisionId'),
  [FORM_FIELDS.SIGNED]: filterFields.eq(false, 'signed'),
  [FORM_FIELDS.STATEMENT_TYPE]: filterFields.eq(EMPTY_VALUE, 'statementType'),
  [FORM_FIELDS.STATEMENT_STATUS]: filterFields.in([ALL_VALUE], 'statementStatus'),
  [FORM_FIELDS.USER_IDS]: filterFields.in([], 'userId'),
};

/** Лейблы тегов полей фильтра. */
export const tagLabels = {
  [FORM_FIELDS.ORGANIZATION_IDS]: addColon(locale.admin.historyScroller.filter.labels.organization),
  [FORM_FIELDS.PERIOD]: addColon(locale.admin.historyScroller.filter.labels.period),
  [FORM_FIELDS.REQUEST_STATUS]: addColon(locale.admin.historyScroller.filter.labels.requestStatus),
  [FORM_FIELDS.SERVICE_BRANCH_IDS]: addColon(locale.admin.historyScroller.filter.labels.serviceBranch),
  [FORM_FIELDS.SIGNED]: locale.admin.historyScroller.filter.labels.signaturePresence,
  [FORM_FIELDS.STATEMENT_TYPE]: addColon(locale.admin.historyScroller.filter.labels.statementType),
  [FORM_FIELDS.STATEMENT_STATUS]: addColon(locale.admin.historyScroller.filter.labels.statementStatus),
  [FORM_FIELDS.USER_IDS]: addColon(locale.admin.historyScroller.filter.labels.user),
};

/** Опции статусов запроса выписки. */
export const REQUEST_STATUS_OPTIONS: Array<IOption<STATEMENT_REQUEST_STATUSES | typeof ALL_VALUE>> = [
  ...(Object.keys(STATEMENT_REQUEST_STATUSES) as STATEMENT_REQUEST_STATUSES[]).map(item => ({
    label: STATEMENT_REQUEST_STATUS_LABEL[item],
    value: item,
  })),
];

/** Опции статусов выписки. */
export const STATEMENT_STATUS_OPTIONS: Array<IOption<STATEMENT_STATUSES | typeof ALL_VALUE>> = [
  ...(Object.keys(STATEMENT_STATUSES) as STATEMENT_STATUSES[]).map(item => ({ label: STATEMENT_STATUS_LABEL[item], value: item })),
];

/** Опции типов выписки. */
export const STATEMENT_TYPE_OPTIONS: IOption[] = [
  /** Все. */
  { value: EMPTY_VALUE, label: locale.form.labels.selectAll },
  ...Object.values(STATEMENT_TYPE).map(item => ({ label: STATEMENT_TYPE_LABEL[item], value: item })),
];

/** Ключ в Session Storage, по которому хранится состояние фильтрации. */
export const STORAGE_KEY = `${PREFIX}-statement-history-scroller-filter`;
