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
  client?: string[];
  /** Счета клиентов. */
  clientAccountNumber?: string[];
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
  /** Источник вызова скроллера проводок. */
  source?: string;
}

export interface IBankClient {
  inn: string;
  name: string;
}

export interface IBankClientFieldData {
  bankClients: IBankClient[];
  accounts: string[];
}
