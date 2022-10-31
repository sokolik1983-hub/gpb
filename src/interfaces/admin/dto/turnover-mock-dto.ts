import type { IBaseEntity } from '@platform/services';
import type { BankAccountingEntryAccount } from './bank-accounting-entry-account';
import type { TurnoverBranchMockDto } from './turnover-branch-mock-dto';

/** Информация по остаткам и оборотам. */
export interface ITurnoverMockDto extends IBaseEntity {
  account: BankAccountingEntryAccount;
  /** Операционная дата. */
  operationDate: string;
  /** Филиал баланса счёта. */
  accountBranch: TurnoverBranchMockDto;
  /** Филиал обслуживания счёта. */
  serviceBranch: TurnoverBranchMockDto;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
  /** Обороты по кредиту. */
  turnoverCredit: number;
  /** Обороты по дебету. */
  turnoverDebit: number;
}
