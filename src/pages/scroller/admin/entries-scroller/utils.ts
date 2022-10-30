import type { BankAccountingEntryGroup } from 'interfaces/admin/dto/bank-accounting-entry-group';
import type { IBaseEntity } from '@platform/services';

/** Функция для добавления Id для кадлой группы проводок. */
export const rowsWithIds = (rows: BankAccountingEntryGroup[]) =>
  rows.reduce<Array<BankAccountingEntryGroup & IBaseEntity>>((acc, row) => {
    acc.push({ ...row, id: row.aggregate?.account?.id ?? 'e1bd9e87-ac50-4fec-a12c-5928e54688b9' });

    return acc;
  }, []);
