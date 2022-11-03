/**	Статус сверки. */
export enum RECONCILIATION_STATUS {
  /** Есть расхождения. */
  DIFFERENCE = 'DIFFERENCE',
  /** Сверка не проводилась. */
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  /** Расхождений нет. */
  NO_DIFFERENCE = 'NO_DIFFERENCE',
}
