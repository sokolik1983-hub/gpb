import type { IBaseEntity } from '@platform/services';

/** Карточка валюты. */
export interface CurrencyCard {
  /** Буквенный код. */
  letterCode: string;
  /** Цифровой код. */
  numericCode: string;
}

/** Карточка бухгалтерской проводки для ‘bank’ модуля. */
export interface BankAccountingEntryCard extends IBaseEntity {
  /** Сумма по кредиту. */
  amountByCredit: number;
  /** Сумма по дебету. */
  amountByDebit: number;
  /** Номер счета контрагента. */
  counterpartyAccountNumber: string;
  /** Наименование контрагента. */
  counterpartyName: string;
  /** Признак дебетования. */
  debitSign: boolean;
  /** Дата документа. */
  documentDate: string;
  /** Номер документа. */
  documentNumber: number;
  /** Дата проводки (операции). */
  entryDate: string;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
  /** Назначение платежа. */
  paymentPurpose: string;
  /** Обороты по кредиту. */
  turnoverByCredit: number;
  /** Обороты по дебету. */
  turnoverByDebit: number;
  /** Цифровой код валюты по дебету. */
  currencyByDebit: CurrencyCard;
  /** Цифровой код валюты по кредиту. */
  currencyByCredit: CurrencyCard;
  /** Номер счета клиента банка. */
  bankClientAccountNumber: string;
  /** Наименование клиента банка. */
  bankClientName: string;
}
