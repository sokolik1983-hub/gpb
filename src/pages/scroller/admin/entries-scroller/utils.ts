import type { BankAccountingEntryGroup } from 'interfaces/admin/dto/bank-accounting-entry-group';
import type { IBaseEntity } from '@platform/services';

/** Функция для добавления Id для кадлой группы проводок. */
export const rowsWithIds = (rows: BankAccountingEntryGroup[]) =>
  rows.reduce<Array<BankAccountingEntryGroup & IBaseEntity>>((acc, row) => {
    acc.push({ ...row, id: row.aggregate?.account?.id });

    return acc;
  }, []);
