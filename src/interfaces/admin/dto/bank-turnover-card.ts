import type { BankAccountingEntryAccount } from 'interfaces/admin/dto/bank-accounting-entry-account';

/** Карточка остатков и оборотов. */
export interface BankTurnoverCard {
  /** Карточка счета. */
  account: BankAccountingEntryAccount;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Входящий остаток в нац. Валюте. */
  incomingBalanceInNationalCurrency: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
  /** Исходящий остаток в нац. Валюте. */
  outgoingBalanceInNationalCurrency: number;
  /** Обороты по кредиту. */
  turnoverCredit: number;
  /** Обороты по кредиту в нац. Валюте. */
  turnoverCreditInNationalCurrency: number;
  /** Обороты по дебету. */
  turnoverDebit: number;
  /** Обороты по дебету в нац. Валюте. */
  turnoverDebitInNationalCurrency: number;
}
