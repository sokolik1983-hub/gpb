/**
 * Имена колонок таблицы.
 *
 * Не обязательно должны быть путями или ключами в типах представляющих строки таблицы.
 *
 * Для сортируемых полей, значениями должны совпадать со значениями,
 * которые бекенд использует для сортировки.
 */
export const COLUMN_NAMES = {
  // Дата и время запроса.
  CREATED_AT: 'createdAt',
  // Запрашиваемые счета.
  ACCOUNT_NUMBER: 'accountNumber',
  // Тип периода.
  PERIOD_TYPE: 'statementOptions.periodType',
  // Формат выписки.
  STATEMENT_FORMAT: 'requestOptions.format',
  // Формат выписки.
  STATUS: 'status',
  // Колонка с действиями
  ACTIONS: 'ACTIONS',
} as const;
