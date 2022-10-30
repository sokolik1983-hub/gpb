import type { IBaseEntity } from '@platform/services';
import type { BankAccountingEntryAccount } from './bank-accounting-entry-account';

/** Карточка бухгалтерской проводки для ‘bank’ модуля. */
export interface BankAccountingEntryCard extends IBaseEntity {
  /** Счет бухгалтерской проводки для ‘bank’ модуля. */
  account: BankAccountingEntryAccount;
  /** Сумма по кредиту. */
  amountCredit: number;
  /** Сумма по дебету. */
  amountDebit: number;
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
  turnoverCredit: number;
  /** Обороты по дебету. */
  turnoverDebit: number;
}
