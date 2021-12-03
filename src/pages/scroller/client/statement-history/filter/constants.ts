import { STATEMENT_STATUSES } from 'interfaces';
import type { DATE_PERIODS } from 'interfaces/client';
import { locale } from 'localization';
import { EMPTY_VALUE, DATE_PERIOD_OPTIONS as COMMON_DATE_PERIOD_OPTIONS } from 'stream-constants';
import { STATUS_LABELS } from 'stream-constants/client/statuses';
import { pathGenerator } from '@platform/core';
import type { IFilterField } from '@platform/services';
import { filterFields, byLabel } from '@platform/services';
import type { IOption } from '@platform/ui';
import type { IFormState } from './interfaces';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<IFormState>();

/** Поля формы фильтра. */
export const FORM_FIELDS = {
  /** */
  DATE: getPath('date'),
  /** Дата с.  */
  DATE_FROM: getPath('dateFrom'),
  /** Дата по. */
  DATE_TO: getPath('dateTo'),
  /** Счета. */
  SELECTED_ACCOUNTS: getPath('selectedAccounts'),
  /** Временной период. */
  DATE_PERIOD: getPath('datePeriod'),
  /** Статус. */
  STATUS: getPath('status'),
  /** Наличие ЭП. */
  SIGNATURE_PRESENCE: getPath('signaturePresence'),
};

/** Значения полей и условия фильтрации для useFilter. */
export const fields: Record<string, IFilterField> = {
  [FORM_FIELDS.DATE_FROM]: filterFields.ge('', FORM_FIELDS.DATE),
  [FORM_FIELDS.DATE_TO]: filterFields.le('', FORM_FIELDS.DATE),
  [FORM_FIELDS.SELECTED_ACCOUNTS]: filterFields.in([], FORM_FIELDS.SELECTED_ACCOUNTS),
  [FORM_FIELDS.DATE_PERIOD]: filterFields.eq('', FORM_FIELDS.DATE_PERIOD),
  [FORM_FIELDS.STATUS]: filterFields.eq('', FORM_FIELDS.STATUS),
  [FORM_FIELDS.SIGNATURE_PRESENCE]: filterFields.eq(false, FORM_FIELDS.SIGNATURE_PRESENCE),
};

/** Лейблы тегов полей фильтра. */
export const tagLabels = {
  // Здесь должны быть только те поля теги для которых нужно отображать на панели тегов.
  [FORM_FIELDS.DATE_PERIOD]: locale.historyScroller.tags.labels.datePeriod,
  [FORM_FIELDS.STATUS]: locale.historyScroller.tags.labels.status,
  [FORM_FIELDS.SIGNATURE_PRESENCE]: locale.historyScroller.tags.labels.signaturePresence,
};

/**
 * Определяет теги для каких полей будут отображаться,
 * порядок следования тегов в массиве определяет порядок следования тэгов в UI.
 */
export const FIELDS_WITH_TAGS = [FORM_FIELDS.DATE_PERIOD, FORM_FIELDS.STATUS, FORM_FIELDS.SIGNATURE_PRESENCE];

/** Опции селекта выбора статуса. */
export const STATUS_OPTIONS: Array<IOption<STATEMENT_STATUSES | typeof EMPTY_VALUE>> = [
  { value: EMPTY_VALUE, label: locale.form.labels.selectAll },
  ...[
    { value: STATEMENT_STATUSES.NEW, label: STATUS_LABELS.NEW },
    { value: STATEMENT_STATUSES.DELIVERED, label: STATUS_LABELS.DELIVERED },
    { value: STATEMENT_STATUSES.DETAILS_VALID, label: STATUS_LABELS.DETAILS_VALID },
    { value: STATEMENT_STATUSES.RECEIVED, label: STATUS_LABELS.RECEIVED },
    { value: STATEMENT_STATUSES.EXECUTED, label: STATUS_LABELS.EXECUTED },
    { value: STATEMENT_STATUSES.DENIED, label: STATUS_LABELS.DENIED },
  ].sort(byLabel),
];

/** Опции селекта выбора периода. */
export const DATE_PERIOD_OPTIONS: Array<IOption<DATE_PERIODS | typeof EMPTY_VALUE>> = [
  { value: EMPTY_VALUE, label: locale.form.labels.selectAll },
  ...COMMON_DATE_PERIOD_OPTIONS,
];

/** Ключ в Session Storage по которому хранится состояние фильтрации. */
export const STORAGE_KEY = 'statement-history-filer-scroller';
