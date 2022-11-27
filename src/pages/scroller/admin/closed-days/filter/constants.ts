import { DATE_PERIODS } from 'interfaces';
import type { FilterValues } from 'pages/scroller/admin/closed-days/filter/types';
import { EMPTY_VALUE } from 'stream-constants';
import { PREFIX } from 'stream-constants/admin';
import { pathGenerator } from '@platform/core';
import type { IFilterField } from '@platform/services';
import { filterFields } from '@platform/services';
import { dateWithEndOfDay, dateWithStartOfDay } from '@platform/tools/date-time';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<FilterValues>();

/** Поля формы фильтра. */
export const FORM_FIELDS = {
  /** Филиал. */
  BRANCH_CODE: getPath('branchCode'),
  /** Начало периода. */
  DATE_FROM: getPath('dateFrom'),
  /** Конец периода. */
  DATE_TO: getPath('dateTo'),
  /** Тип периода. */
  PERIOD_TYPE: getPath('periodType'),
};

/** Значения полей и условия фильтрации (для useFilter). */
export const fields: Record<string, IFilterField> = {
  [FORM_FIELDS.BRANCH_CODE]: filterFields.eq(EMPTY_VALUE, 'branchCode'),
  [FORM_FIELDS.DATE_FROM]: filterFields.ge(EMPTY_VALUE, 'createdAt', value => dateWithStartOfDay(value as string)),
  [FORM_FIELDS.DATE_TO]: filterFields.le(EMPTY_VALUE, 'createdAt', value => dateWithEndOfDay(value as string)),
  [FORM_FIELDS.PERIOD_TYPE]: filterFields.eq(DATE_PERIODS.YESTERDAY, '', () => ''),
};

/** Ключ в Session Storage, по которому хранится состояние фильтрации. */
export const STORAGE_KEY = `${PREFIX}-closed-days-scroller-page-filter`;
