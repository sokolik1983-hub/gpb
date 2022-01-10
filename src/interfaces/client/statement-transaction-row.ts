/** Строка скроллера проводок. */
export interface IStatementTransactionRow {
  /** Идентификатор проводки. */
  id: string;
  /** Дата операции. */
  operationDate: string;
  /** Номер проводки. */
  documentNumber: string;
  /** Дата документа. */
  documentDate: string;
  /** Наименование контрагента. */
  counterpartyName: string;
  /** Номер счёта контрагента. */
  counterpartyAccountNumber: string;
  /** Сумма списания. */
  outcome?: number;
  /** Сумма поступления. */
  income?: number;
  /** Назначение платежа. */
  purpose: string;
  /** Код валюты. */
  currencyCode: string;
}
