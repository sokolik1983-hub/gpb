import type { BankAccountingEntryGroupAggregate } from './bank-accounting-entry-group-aggregate';
import type { BankAccountingEntryTurnoverCard } from './bank-accounting-entry-turnover-card';

/** Группа бухгалтерских проводок. */
export interface BankAccountingEntryGroup {
  /** Агрегат группы бухгалтерских проводок. */
  aggregate: BankAccountingEntryGroupAggregate;
  /** Список карточек проводок. */
  entries: BankAccountingEntryTurnoverCard[];
}
