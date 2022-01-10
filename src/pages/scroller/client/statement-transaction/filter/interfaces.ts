import type { TRANSACTION_TYPES } from 'interfaces';

/** Стейт формы фильтрации. */
export interface IFormState {
  /** Дата. */
  queryString?: string;
  /** Сумма от. */
  amountFrom?: string;
  /** Сумма по. */
  amountTo?: string;
  /** Контрагенты. */
  counterparties?: string[];
  /** Номер документа. */
  documentNumber?: string;
  /** Дата платежа. */
  paymentDate?: string;
  /** Дата платежа с. */
  paymentDateFrom?: string;
  /** Дата платежа по. */
  paymentDateTo?: string;
  /** Тип операции. */
  transactionType?: TRANSACTION_TYPES;
}
