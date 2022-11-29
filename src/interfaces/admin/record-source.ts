/** Источник записи. */
export enum RECORD_SOURCE {
  /** Закрытие дня. */
  CLOSING_OF_DAY = 'DAY_CLOSING',
  /** Пересчет дня в связи с изменением набора проводок. */
  CHANGING_SET_OF_ENTRIES = 'ENTRIES_QUANTITY_CHANGED',
  /** Подключение счета к ДБО. */
  DBO_CONTRACT = 'DBO_CONTRACT',
}
