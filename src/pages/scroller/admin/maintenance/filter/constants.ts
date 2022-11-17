import { DATE_PERIODS } from 'interfaces';
import { MAINTENANCE_TYPE } from 'interfaces/admin';
import { locale } from 'localization';
import type { FilterValues } from 'pages/scroller/admin/maintenance/filter/types';
import { EMPTY_VALUE } from 'stream-constants';
import { MAINTENANCE_TYPE_LABEL, PREFIX } from 'stream-constants/admin';
import { pathGenerator } from '@platform/core';
import type { IFilterField } from '@platform/services';
import { filterFields } from '@platform/services';
import { dateWithEndOfDay, dateWithStartOfDay } from '@platform/tools/date-time';
import type { IOption } from '@platform/ui';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<FilterValues>();

/** Поля формы фильтра. */
export const FORM_FIELDS = {
  /** Начало периода. */
  DATE_FROM: getPath('dateFrom'),
  /** Конец периода. */
  DATE_TO: getPath('dateTo'),
  /** Тип события технических работ. */
  MAINTENANCE_TYPE: getPath('maintenanceTypeDto'),
  /** Тип периода. */
  PERIOD_TYPE: getPath('periodType'),
};

/** Значения полей и условия фильтрации (для useFilter). */
export const fields: Record<string, IFilterField> = {
  [FORM_FIELDS.DATE_FROM]: filterFields.ge(EMPTY_VALUE, 'createdAt', value => dateWithStartOfDay(value as string)),
  [FORM_FIELDS.DATE_TO]: filterFields.le(EMPTY_VALUE, 'createdAt', value => dateWithEndOfDay(value as string)),
  [FORM_FIELDS.MAINTENANCE_TYPE]: filterFields.eq(EMPTY_VALUE, 'maintenanceTypeDto'),
  [FORM_FIELDS.PERIOD_TYPE]: filterFields.eq(DATE_PERIODS.YESTERDAY, '', () => ''),
};

/** Ключ в Session Storage, по которому хранится состояние фильтра. */
export const STORAGE_KEY = `${PREFIX}-maintenance-scroller-page-filter`;

/** Опции типов технических работ на Ф1. */
export const MAINTENANCE_TYPE_OPTIONS: IOption[] = [
  /** Все. */
  { value: EMPTY_VALUE, label: locale.form.labels.selectAll },
  ...Object.values(MAINTENANCE_TYPE).map(item => ({ label: MAINTENANCE_TYPE_LABEL[item], value: item })),
];
