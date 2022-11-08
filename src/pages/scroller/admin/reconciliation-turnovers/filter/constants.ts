import { RECONCILIATION_STATUS } from 'interfaces/admin';
import { locale } from 'localization';
import type { FilterValues } from 'pages/scroller/admin/reconciliation-turnovers/filter/types';
import { EMPTY_VALUE } from 'stream-constants';
import { PREFIX, TURNOVER_RECONCILIATION_STATUS_LABEL } from 'stream-constants/admin';
import { pathGenerator } from '@platform/core';
import type { IFilterField } from '@platform/services';
import { filterFields } from '@platform/services';
import { dateWithEndOfDay, dateWithStartOfDay } from '@platform/tools/date-time';
import type { IOption } from '@platform/ui';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<FilterValues>();

/** Поля формы фильтра. */
export const FORM_FIELDS = {
  /** Идентификатор счета. */
  ACCOUNT_ID: getPath('accountId'),
  /** Начало периода. */
  DATE_FROM: getPath('dateFrom'),
  /** Конец периода. */
  DATE_TO: getPath('dateTo'),
  /** Статус сверки. */
  STATUS: getPath('status'),
};

/** Значения полей и условия фильтрации (для useFilter). */
export const fields: Record<string, IFilterField> = {
  [FORM_FIELDS.ACCOUNT_ID]: filterFields.eq(EMPTY_VALUE, 'accountId'),
  [FORM_FIELDS.DATE_FROM]: filterFields.ge(EMPTY_VALUE, 'createdAt', value => dateWithStartOfDay(value as string)),
  [FORM_FIELDS.DATE_TO]: filterFields.le(EMPTY_VALUE, 'createdAt', value => dateWithEndOfDay(value as string)),
  [FORM_FIELDS.STATUS]: filterFields.eq(EMPTY_VALUE, 'status'),
};

/** Ключ в Session Storage, по которому хранится состояние фильтрации. */
export const STORAGE_KEY = `${PREFIX}-reconciliation-turnovers-scroller-page-filter`;

/** Опции статусов сверки остатков/оборотов. */
export const RECONCILIATION_STATUS_OPTIONS: IOption[] = [
  /** Все. */
  { value: EMPTY_VALUE, label: locale.form.labels.selectAll },
  ...Object.values(RECONCILIATION_STATUS).map(item => ({ label: TURNOVER_RECONCILIATION_STATUS_LABEL[item], value: item })),
];
