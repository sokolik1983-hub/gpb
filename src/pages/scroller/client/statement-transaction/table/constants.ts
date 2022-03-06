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
  OPERATION_DATE: 'entryDate',
  // Информация о документе.
  DOCUMENT_INFO: 'documentNumber',
  // Информация о контрагенте.
  COUNTERPARTY_INFO: 'payeeName',
  // Списания.
  OUTCOME: 'outcome',
  // Поступления.
  INCOME: 'income',
  // Назначение платежа.
  PURPOSE: 'paymentPurpose',
  // Действия.
  ACTIONS: 'ACTIONS',
} as const;

export const ONLY_SELECTED_ROWS_CKECKBOX = 'onlySelectedRowsCheckbox';
