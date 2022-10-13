import type { IBaseEntity } from '@platform/services';

/** Агрегат группы бухгалтерских проводок. */
export interface BankAccountingEntryAccount extends IBaseEntity {
  /** Буквенный код валюты. */
  currencyLetterCode: string;
  /** Номер. */
  number: string;
  /** Наименование организации. */
  organizationName: string;
}
