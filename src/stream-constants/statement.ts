import { DATE_PERIODS, TRANSACTION_TYPES, FORMAT, SCHEDULE_DATE_PERIODS, SCHEDULE_METHODS, OPERATIONS } from 'interfaces';
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

/** Названия периодов для отображения в таблице скроллера реестра выписок по расписанию. */
export const DATE_PERIOD_SCHEDULE_SCROLLER_LABELS = {
  [SCHEDULE_DATE_PERIODS.YESTERDAY]: locale.historyScroller.period.labels.yesterday,
  [SCHEDULE_DATE_PERIODS.TODAY]: locale.historyScroller.period.labels.today,
  [SCHEDULE_DATE_PERIODS.LAST_WEEK]: locale.historyScroller.period.labels.lastWeek,
  [SCHEDULE_DATE_PERIODS.LAST_3_DAYS]: locale.historyScroller.period.labels.last3Days,
  [SCHEDULE_DATE_PERIODS.CURRENT_MONTH]: locale.historyScroller.period.labels.currentMonth,
  [SCHEDULE_DATE_PERIODS.LAST_MONTH]: locale.historyScroller.period.labels.lastMonth,
  [SCHEDULE_DATE_PERIODS.PREVIOUS_QUARTER]: locale.historyScroller.period.labels.previousQuarter,
};

/** Наименования форматов выписки. */
export const STATEMENT_FORMAT_LABELS = {
  [FORMAT.C1]: locale.historyScroller.statementFormat.labels.c1,
  [FORMAT.TXT]: locale.historyScroller.statementFormat.labels.txt,
  [FORMAT.PDF]: locale.historyScroller.statementFormat.labels.pdf,
  [FORMAT.RTF]: locale.historyScroller.statementFormat.labels.rtf,
  [FORMAT.EXCEL]: locale.historyScroller.statementFormat.labels.excel,
  [FORMAT.XPS]: locale.historyScroller.statementFormat.labels.xps,
  [FORMAT.MT940]: locale.historyScroller.statementFormat.labels.mt940,
  [FORMAT.MULTICASH]: locale.historyScroller.statementFormat.labels.multicash,
};

/** Лейблы типов операции. */
export const TRANSACTION_TYPE_LABELS = {
  [TRANSACTION_TYPES.INCOME]: locale.transactionType.labels.income,
  [TRANSACTION_TYPES.OUTCOME]: locale.transactionType.labels.outcome,
};

/** Опции селекта выбора способа получения выписки по расписанию. */
export const METHOD_OPTIONS = [
  { value: SCHEDULE_METHODS.EMAIL, label: locale.client.scheduleMethods.email },
  { value: SCHEDULE_METHODS.SAVE, label: locale.client.scheduleMethods.save },
];

/** Наименование типов операций в форме выписки по расписанию. */
export const SCHEDULE_OPERATIONS = {
  [OPERATIONS.ALL]: locale.common.operations.ALL,
  [OPERATIONS.INCOME]: locale.common.operations.INCOME,
  [OPERATIONS.WRITE_OFF]: locale.common.operations.OUTCOME,
};
/** Наименование способов отправки выписки по расписанию. */
export const METHOD_LABELS = {
  [SCHEDULE_METHODS.EMAIL]: locale.client.scheduleMethods.email,
  [SCHEDULE_METHODS.SAVE]: locale.client.scheduleMethods.save,
};
