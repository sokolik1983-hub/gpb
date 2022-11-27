import type { FilterValues } from 'pages/scroller/admin/currency-rates/filter/types';
import { EMPTY_VALUE } from 'stream-constants';
import { PREFIX } from 'stream-constants/admin';
import { pathGenerator } from '@platform/core';
import type { IFilterField } from '@platform/services';
import { filterFields } from '@platform/services';
import { dateWithEndOfDay, dateWithStartOfDay } from '@platform/tools/date-time';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<FilterValues>();

/** Поля формы фильтра справочника курсов валют. */
export const FORM_FIELDS = {
  /** Буквенный код валюты. */
  CURRENCY_CODE: getPath('currencyCode'),
  /** Начало периода. */
  DATE_FROM: getPath('dateFrom'),
  /** Конец периода. */
  DATE_TO: getPath('dateTo'),
};

/** Значения полей и условия фильтрации (для useFilter). */
export const fields: Record<string, IFilterField> = {
  [FORM_FIELDS.CURRENCY_CODE]: filterFields.eq(EMPTY_VALUE, 'letterCode'),
  [FORM_FIELDS.DATE_FROM]: filterFields.ge(EMPTY_VALUE, 'rateDate', value => dateWithStartOfDay(value as string)),
  [FORM_FIELDS.DATE_TO]: filterFields.le(EMPTY_VALUE, 'rateDate', value => dateWithEndOfDay(value as string)),
};

/** Ключ в Session Storage, по которому хранится состояние фильтра. */
export const STORAGE_KEY = `${PREFIX}-currency-rates-scroller-page-filter`;
