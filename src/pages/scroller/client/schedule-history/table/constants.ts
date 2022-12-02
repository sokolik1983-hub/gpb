/**
 * Имена колонок таблицы.
 *
 * Не обязательно должны быть путями или ключами в типах представляющих строки таблицы.
 *
 * Для сортируемых полей, значениями должны совпадать со значениями,
 * которые бекенд использует для сортировки.
 */
export const COLUMN_NAMES = {
  // Дата и время создания запроса.
  CREATED_AT: 'createdAt',
  // Информация о счетах.
  ACCOUNTS: 'accountsIds',
  // Информация о периоде для выписки по расписанию.
  PERIOD: 'periodType',
  // Информация о формате выписки по расписанию.
  FORMAT: 'statementFormat',
  // Статус.
  STATUS: 'status',
  // Время в которое будет приходить выписка по расписанию.
  SCHEDULE_TIME: 'scheduleTime',
  // Метод по которому будет приходить выписка по расписанию.
  SCHEDULE_METHOD: 'scheduleMethod',
  // Почтовые ящики для выписки по расписанию.
  ACTIONS: 'ACTIONS',
} as const;

export const ONLY_SELECTED_ROWS_CKECKBOX = 'onlySelectedRowsCheckbox';
