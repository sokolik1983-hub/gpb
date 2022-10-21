import type { BankAccountingEntryCard } from './bank-accounting-entry-card';
import type { BankAccountingEntryGroupAggregate } from './bank-accounting-entry-group-aggregate';

/** Группа бухгалтерских проводок. */
export interface BankAccountingEntryGroup {
  /** Агрегат группы бухгалтерских проводок. */
  aggregate: BankAccountingEntryGroupAggregate;
  /** Список карточек проводок. */
  entries: BankAccountingEntryCard[];
}
