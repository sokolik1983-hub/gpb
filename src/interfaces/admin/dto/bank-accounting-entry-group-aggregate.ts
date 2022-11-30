import type { BankAccountingEntryAccount } from './bank-accounting-entry-account';

/** Агрегат группы бухгалтерских проводок. */
export interface BankAccountingEntryGroupAggregate {
  /** Счет бухгалтерской проводки для ‘bank’ модуля. */
  account: BankAccountingEntryAccount;
  /** Сумма по кредиту. */
  amountCredit: number;
  /** Сумма по дебету. */
  amountDebit: number;
  /** Количество поступлений. */
  incomingCount: number;
  /** Количество списаний. */
  outgoingCount: number;
  /** Общее количество. */
  totalCount: number;
}
