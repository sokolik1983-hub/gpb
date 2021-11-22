// Имена колонок таблицы. Не являются путями или ключами в типах представляющих строки.
// Для сортируемых полей, значениями должны совпадать со значениями которые бекенд использует для сортировки.
export const COLUMN_NAMES = {
  // Организация.
  ORGANIZATION_NAME: 'organization',
  // Информация о счёте.
  ACCOUNT_NUMBER: 'accountNumber',
  // Входящий баланс.
  INCOMING_BALANCE: 'incomingBalance',
  // Расход.
  OUTCOME: 'outcome',
  // Приход.
  INCOME: 'income',
  // Исходящий остаток.
  OUTGOING_BALANCE: 'outgoingBalance',
} as const;
