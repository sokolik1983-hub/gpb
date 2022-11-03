/** Источник записи. */
export enum RECORD_SOURCE {
  /** Закрытие дня. */
  CLOSING_OF_DAY = 'CLOSING_OF_DAY',
  /** Пересчет дня в связи с изменением набора проводок. */
  CHANGING_SET_OF_ENTRIES = 'CHANGING_SET_OF_ENTRIES',
  /** Пересчет дня в связи с изменением набора проводок предыдущего периода. */
  CHANGING_SET_OF_ENTRIES_OF_PREV_PERIOD = 'CHANGING_SET_OF_ENTRIES_OF_PREV_PERIOD',
}
