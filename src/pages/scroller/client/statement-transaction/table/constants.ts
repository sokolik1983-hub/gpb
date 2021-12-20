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
  OPERATION_DATE: 'operationDate',
  // Информация о документе.
  DOCUMENT_INFO: 'documentInfo',
  // Информация о контрагенте.
  COUNTERPARTY_INFO: 'counterpartyInfo',
  // Списания.
  OUTCOME: 'outcome',
  // Поступления.
  INCOME: 'income',
  // Назначение платежа.
  PURPOSE: 'purpose',
} as const;
