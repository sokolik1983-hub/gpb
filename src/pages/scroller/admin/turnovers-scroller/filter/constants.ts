import { EMPTY_VALUE } from 'stream-constants';
import { pathGenerator } from '@platform/core';
import type { IFilterField } from '@platform/services';
import { filterFields } from '@platform/services';
import { dateWithEndOfDay, dateWithStartOfDay } from '@platform/tools/date-time';
import type { FilterValues } from './types';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<FilterValues>();

/** Поля формы фильтра. */
export const FORM_FIELDS = {
  /** Начало периода. */
  DATE_FROM: getPath('dateFrom'),
  /** Конец периода. */
  DATE_TO: getPath('dateTo'),
  /** Организации. */
  ORGANIZATION_IDS: getPath('organizationIds'),
  /** Период. */
  ACCOUNT_IDS: getPath('accountIds'),
};

/** Значения полей и условия фильтрации (для useFilter). */
export const fields: Record<string, IFilterField> = {
  [FORM_FIELDS.ACCOUNT_IDS]: filterFields.in([], 'accountIds'),
  [FORM_FIELDS.DATE_FROM]: filterFields.ge(EMPTY_VALUE, 'createdAt', value => dateWithStartOfDay(value as string)),
  [FORM_FIELDS.DATE_TO]: filterFields.le(EMPTY_VALUE, 'createdAt', value => dateWithEndOfDay(value as string)),
  [FORM_FIELDS.ORGANIZATION_IDS]: filterFields.in([], 'organizationIds'),
};
