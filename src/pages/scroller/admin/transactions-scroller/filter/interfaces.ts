import type { TRANSACTION_TYPES } from 'interfaces';

/** Стейт формы фильтрации. */
export interface IFormState {
  /** Дата. */
  textSearch?: string;
  /** Сумма от. */
  amountFrom?: string;
  /** Сумма по. */
  amountTo?: string;
  /** Контрагенты. */
  counterparty?: string[];
  /** Счета контрагентов. */
  counterpartyAccountNumber?: string[];
  /** Клиенты. */
  bankClient?: string[];
  /** Счета клиентов. */
  bankClientAccountNumber?: string[];
  /** Номер документа. */
  documentNumber?: string;
  /** Дата платежа. */
  entryDate?: string;
  /** Дата платежа с. */
  paymentDateFrom?: string;
  /** Дата платежа по. */
  paymentDateTo?: string;
  /** Тип операции. */
  entryType?: TRANSACTION_TYPES;
  /** Источник вызова скроллера проводок. */
  source?: string;
}
