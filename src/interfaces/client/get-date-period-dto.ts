/** Значения периодов. */
export enum DATE_PERIODS {
  /** Выбрать период. */
  SELECT_PERIOD = 'SELECTPERIOD',
  /** Вчера. */
  YESTERDAY = 'YESTERDAY',
  /** Сегодня. */
  TODAY = 'TODAY',
  /** Последние 3 дня. */
  LAST_3_DAYS = 'LAST3DAYS',
  /** Текущий месяц. */
  CUR_MONTH = 'CURMONTH',
  /** Прошлый месяц. */
  LAST_MONTH = 'LASTMONTH',
  /** Предыдущий квартал. */
  PREV_QUARTER = 'PREVQUARTER',
}

/** ДТО запроса периода. */
export interface IGetDatePeriodRequestDto {
  /** Тип периода. */
  periodType: Exclude<DATE_PERIODS, DATE_PERIODS.SELECT_PERIOD | DATE_PERIODS.TODAY | DATE_PERIODS.YESTERDAY>;
}

/** ДТО ответа запроса периода. */
export interface IGetDatePeriodResponseDto {
  /** Начальная дата периода, по которому запрашивается выписка. */
  from: string;
  /** Конечная дата периода, по которому запрашивается выписка. */
  to: string;
}
