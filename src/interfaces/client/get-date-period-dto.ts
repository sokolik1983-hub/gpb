/** Значения периодов. */
export enum DATE_PERIODS {
  // TODO: уточнить значения после готовности рестов
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
  // TODO: уточнить значения после готовности рестов
  period: Exclude<DATE_PERIODS, DATE_PERIODS.SELECT_PERIOD | DATE_PERIODS.TODAY | DATE_PERIODS.YESTERDAY>;
}

/** ДТО ответа запроса периода. */
export interface IGetDatePeriodResponseDto {
  // TODO: уточнить значения после готовности рестов
  dateFrom: string;
  dateTo: string;
}
