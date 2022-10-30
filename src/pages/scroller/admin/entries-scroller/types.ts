import type { BankAccountingEntryGroup as EntryGroup } from 'interfaces/admin/dto/bank-accounting-entry-group';
import type { IBaseEntity } from '@platform/services';

/** Сгруппированные проводки с Id. */
export type BankAccountingEntryGroup = EntryGroup & IBaseEntity;
