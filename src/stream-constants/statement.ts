import { DATE_PERIODS, STATEMENT_FORMATS } from 'interfaces';
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

/** Названия периодов для отображения в таблице скроллера. */
export const DATE_PERIOD_SCROLLER_LABELS = {
  [DATE_PERIODS.SELECT_PERIOD]: locale.historyScroller.period.labels.selectPeriod,
  [DATE_PERIODS.YESTERDAY]: locale.historyScroller.period.labels.yesterday,
  [DATE_PERIODS.TODAY]: locale.historyScroller.period.labels.today,
  [DATE_PERIODS.LAST_3_DAYS]: locale.historyScroller.period.labels.last3Days,
  [DATE_PERIODS.CURRENT_MONTH]: locale.historyScroller.period.labels.currentMonth,
  [DATE_PERIODS.LAST_MONTH]: locale.historyScroller.period.labels.lastMonth,
  [DATE_PERIODS.PREVIOUS_QUARTER]: locale.historyScroller.period.labels.previousQuarter,
};

/** Наименования форматов выписки. */
export const STATEMENT_FORMAT_LABELS = {
  [STATEMENT_FORMATS.C_1]: locale.historyScroller.statementFormat.labels.c1,
  [STATEMENT_FORMATS.TXT]: locale.historyScroller.statementFormat.labels.txt,
  [STATEMENT_FORMATS.PDF]: locale.historyScroller.statementFormat.labels.pdf,
  [STATEMENT_FORMATS.RTF]: locale.historyScroller.statementFormat.labels.rtf,
  [STATEMENT_FORMATS.EXCEL]: locale.historyScroller.statementFormat.labels.excel,
  [STATEMENT_FORMATS.XPS]: locale.historyScroller.statementFormat.labels.xps,
  [STATEMENT_FORMATS.MT_940]: locale.historyScroller.statementFormat.labels.mt940,
  [STATEMENT_FORMATS.MULTICASH]: locale.historyScroller.statementFormat.labels.multicash,
};
