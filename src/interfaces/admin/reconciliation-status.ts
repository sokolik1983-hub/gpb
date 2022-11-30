/**	Статус сверки. */
export enum RECONCILIATION_STATUS {
  /** Сверка не проводилась. */
  NONE = 'NONE',
  /** Отсутствуют обороты за прошлую дату. */
  NO_TURNOVER_FOUND = 'NO_TURNOVER_FOUND',
  /** Расхождений нет. */
  SUCCESS = 'SUCCESS',
  /** Есть расхождения. */
  FAILURE = 'FAILURE',
  /** Выполняется ремонт. */
  UNDER_REPAIR = 'UNDER_REPAIR',
  /** Ошибки ремонта. */
  REPAIR_FAILURE = 'REPAIR_FAILED',
}
