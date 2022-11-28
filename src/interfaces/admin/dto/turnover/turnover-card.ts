import type { IBaseEntity } from '@platform/services';
import type { AccountCard } from './account-card';
import type { BranchCard } from './branch-card';

/** Карточка остатков и оборотов. */
export interface TurnoverCard extends IBaseEntity {
  /** Карточка счета. */
  account: AccountCard;
  /** Код филиала (баланс). */
  balanceBranch: BranchCard;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Входящий остаток в нац. Валюте. */
  incomingBalanceInNationalCurrency: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
  /** Исходящий остаток в нац. Валюте. */
  outgoingBalanceInNationalCurrency: number;
  /** Код филиала (обслуживание). */
  serviceBranch: BranchCard;
  /** Оборот по кредиту. */
  turnoverByCredit: number;
  /** Обороты по кредиту в нац. Валюте. */
  turnoverByCreditInNationalCurrency: number;
  /** Оборот по дебету. */
  turnoverByDebit: number;
  /** Обороты по дебету в нац. Валюте. */
  turnoverByDebitInNationalCurrency: number;
  /** Дата оборота. */
  turnoverDate: string;
}
