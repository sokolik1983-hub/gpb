import { DATE_PERIODS } from 'interfaces/client';
import { locale } from 'localization';
import type { IOption } from '@platform/ui';

/** Ключ локализации. */
export const STATEMENT_TRANSLATOR = 'STATEMENT_LOC_RES';

/** Опции селекта выбора временного периода. */
export const DATE_PERIOD_OPTIONS: Array<IOption<DATE_PERIODS>> = [
  { value: DATE_PERIODS.SELECT_PERIOD, label: locale.turnoverScroller.filter.datePeriods.selectPeriod },
  { value: DATE_PERIODS.YESTERDAY, label: locale.turnoverScroller.filter.datePeriods.yesterday },
  { value: DATE_PERIODS.TODAY, label: locale.turnoverScroller.filter.datePeriods.today },
  { value: DATE_PERIODS.LAST_3_DAYS, label: locale.turnoverScroller.filter.datePeriods.last3Days },
  { value: DATE_PERIODS.CURRENT_MONTH, label: locale.turnoverScroller.filter.datePeriods.curMonth },
  { value: DATE_PERIODS.LAST_MONTH, label: locale.turnoverScroller.filter.datePeriods.lastMonth },
  { value: DATE_PERIODS.PREVIOUS_QUARTER, label: locale.turnoverScroller.filter.datePeriods.prevQuarter },
];
