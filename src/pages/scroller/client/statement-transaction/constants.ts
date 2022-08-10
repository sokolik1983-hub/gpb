/** Мап сортировки для запроса на сервер. */
export const SORTING_MAP = {
  /** Списания. */
  outcome: 'amountDebit',
  /** Поступления. */
  income: 'amountCredit',
  /** Сумма. */
  summary: ['amountDebit', 'amountCredit'],
};
