import type { DATE_PERIODS } from 'interfaces';
import { STATEMENT_REQUEST_STATUSES } from 'interfaces';
import { locale } from 'localization';
import { EMPTY_VALUE, DATE_PERIOD_OPTIONS as COMMON_DATE_PERIOD_OPTIONS } from 'stream-constants';
import { STATUS_LABELS } from 'stream-constants/client';
import { pathGenerator } from '@platform/core';
import type { IFilterField } from '@platform/services';
import { filterFields, byLabel } from '@platform/services';
import { dateWithEndOfDay, dateWithStartOfDay } from '@platform/tools/date-time';
import type { IOption } from '@platform/ui';
import type { IFormState } from './interfaces';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<IFormState>();

/** Поля формы фильтра. */
export const FORM_FIELDS = {
  /** Дата создания запроса. */
  CREATED_AT: getPath('createdAt'),
  /** Дата с.  */
  DATE_FROM: getPath('dateFrom'),
  /** Дата по. */
  DATE_TO: getPath('dateTo'),
  /** Счета. */
  ACCOUNT_IDS: getPath('accountIds'),
  /** Временной период. */
  PERIOD_TYPE: getPath('periodType'),
  /** Статус. */
  STATUS: getPath('status'),
  /** Наличие ЭП. */
  SIGNED: getPath('signed'),
};

/** Список дополнительных полей формы фильтра. */
export const ADDITIONAL_FORM_FIELDS = [FORM_FIELDS.PERIOD_TYPE, FORM_FIELDS.STATUS, FORM_FIELDS.SIGNED];

/**
 * Отображает статусы выбираемые в селекте фильтра статусов,
 * на массивы статусов соответствующие этим статусам.
 */
const STATUSES_BY_SELECTED_STATUS = {
  [STATEMENT_REQUEST_STATUSES.NEW]: [STATEMENT_REQUEST_STATUSES.NEW],
  [STATEMENT_REQUEST_STATUSES.RECEIVED]: [STATEMENT_REQUEST_STATUSES.RECEIVED, STATEMENT_REQUEST_STATUSES.DETAILS_VALID],
  [STATEMENT_REQUEST_STATUSES.DELIVERED]: [STATEMENT_REQUEST_STATUSES.DELIVERED],
  [STATEMENT_REQUEST_STATUSES.EXECUTED]: [STATEMENT_REQUEST_STATUSES.EXECUTED],
  [STATEMENT_REQUEST_STATUSES.DENIED]: [STATEMENT_REQUEST_STATUSES.DENIED],
};

/** Значения полей и условия фильтрации для useFilter. */
export const fields: Record<string, IFilterField> = {
  [FORM_FIELDS.DATE_FROM]: filterFields.ge(EMPTY_VALUE, FORM_FIELDS.CREATED_AT, value => dateWithStartOfDay(value as string)),
  [FORM_FIELDS.DATE_TO]: filterFields.le(EMPTY_VALUE, FORM_FIELDS.CREATED_AT, value => dateWithEndOfDay(value as string)),
  [FORM_FIELDS.ACCOUNT_IDS]: filterFields.in([], FORM_FIELDS.ACCOUNT_IDS),
  [FORM_FIELDS.PERIOD_TYPE]: filterFields.eq(EMPTY_VALUE, FORM_FIELDS.PERIOD_TYPE),
  [FORM_FIELDS.STATUS]: filterFields.in(EMPTY_VALUE, FORM_FIELDS.STATUS, value => {
    const selectedStatus = value as keyof typeof STATUSES_BY_SELECTED_STATUS | typeof EMPTY_VALUE;

    return selectedStatus === EMPTY_VALUE ? [] : STATUSES_BY_SELECTED_STATUS[selectedStatus];
  }),
  [FORM_FIELDS.SIGNED]: filterFields.eq(false, FORM_FIELDS.SIGNED),
};

/** Лейблы тегов полей фильтра. */
export const tagLabels = {
  // Здесь должны быть только те поля теги для которых нужно отображать на панели тегов.
  [FORM_FIELDS.PERIOD_TYPE]: locale.historyScroller.tags.labels.datePeriod,
  [FORM_FIELDS.STATUS]: locale.historyScroller.tags.labels.status,
  [FORM_FIELDS.SIGNED]: locale.historyScroller.tags.labels.signaturePresence,
};

/**
 * Определяет теги для каких полей будут отображаться,
 * порядок следования тегов в массиве определяет порядок следования тэгов в UI.
 */
export const FIELDS_WITH_TAGS = [FORM_FIELDS.PERIOD_TYPE, FORM_FIELDS.STATUS, FORM_FIELDS.SIGNED];

/** Отсортированные опции фильтра статусов. */
export const STATUS_OPTIONS: Array<IOption<STATEMENT_REQUEST_STATUSES | typeof EMPTY_VALUE>> = [
  { value: EMPTY_VALUE, label: locale.form.labels.selectAll },
  ...(Object.keys(STATUSES_BY_SELECTED_STATUS) as Array<keyof typeof STATUSES_BY_SELECTED_STATUS>)
    .map(item => ({ label: STATUS_LABELS[item], value: item }))
    .sort(byLabel),
];

/** Опции селекта выбора периода. */
export const DATE_PERIOD_OPTIONS: Array<IOption<DATE_PERIODS | typeof EMPTY_VALUE>> = [
  { value: EMPTY_VALUE, label: locale.form.labels.selectAll },
  ...COMMON_DATE_PERIOD_OPTIONS,
];

/** Ключ в Session Storage по которому хранится состояние фильтрации. */
export const STORAGE_KEY = 'statement-history-filer-scroller';
