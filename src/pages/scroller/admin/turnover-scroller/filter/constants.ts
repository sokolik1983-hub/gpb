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
  BANK_CLIENT_IDS: getPath('bankClientIds'),
  /** Период. */
  ACCOUNT_NUMBERS: getPath('accountNumbers'),
};

/** Значения полей и условия фильтрации (для useFilter). */
export const fields: Record<string, IFilterField> = {
  [FORM_FIELDS.ACCOUNT_NUMBERS]: filterFields.in([], 'accountNumber'),
  [FORM_FIELDS.DATE_FROM]: filterFields.ge(EMPTY_VALUE, 'turnoverDate', value => dateWithStartOfDay(value as string)),
  [FORM_FIELDS.DATE_TO]: filterFields.le(EMPTY_VALUE, 'turnoverDate', value => dateWithEndOfDay(value as string)),
  [FORM_FIELDS.BANK_CLIENT_IDS]: filterFields.in([], 'bankClientId'),
};
