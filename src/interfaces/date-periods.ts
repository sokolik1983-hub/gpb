/**
 * Классификатор типов периодов запроса выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440612
 */
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
  CURRENT_MONTH = 'CURMONTH',
  /** Прошлый месяц. */
  LAST_MONTH = 'LASTMONTH',
  /** Предыдущий квартал. */
  PREVIOUS_QUARTER = 'PREVQUARTER',
}
/**
 * Классификатор типов периодов заявок на выписку по расписанию.
 *
 */
export enum SCHEDULE_DATE_PERIODS {
  /** Вчера. */
  YESTERDAY = 'YESTERDAY',
  /** Сегодня. */
  TODAY = 'TODAY',
  /** Последние 3 дня. */
  LAST_3_DAYS = 'LAST3DAYS',
  /** Последнюю неделю. */
  LAST_WEEK = 'LAST_WEEK',
  /** Текущий месяц. */
  CURRENT_MONTH = 'CURMONTH',
  /** Прошлый месяц. */
  LAST_MONTH = 'LASTMONTH',
  /** Предыдущий квартал. */
  PREVIOUS_QUARTER = 'PREVQUARTER',
}
