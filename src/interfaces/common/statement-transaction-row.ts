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
  /** Сумма списания в рублёвом эквиваленте. */
  outcomeNatCurr: number;
  /** Сумма поступления. */
  income?: number;
  /** Сумма поступления в рублёвом эквиваленте. */
  incomeNatCurr: number;
  /** Назначение платежа. */
  purpose: string;
  /** Код валюты. */
  currencyCode: string;
}
