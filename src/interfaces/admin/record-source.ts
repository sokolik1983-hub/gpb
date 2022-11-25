/** Источник записи. */
export enum RECORD_SOURCE {
  /** Закрытие дня. */
  CLOSING_OF_DAY = 'DAY_CLOSING',
  /** Пересчет дня в связи с изменением набора проводок. */
  CHANGING_SET_OF_ENTRIES = 'ENTRIES_QUANTITY_CHANGED',
  /** Пересчет дня в связи с изменением набора проводок предыдущего периода. */
  CHANGING_SET_OF_ENTRIES_OF_PREV_PERIOD = 'CHANGING_SET_OF_ENTRIES_OF_PREV_PERIOD',
  /** DBO_CONTRACT. */
  DBO_CONTRACT = 'DBO_CONTRACT',
}
