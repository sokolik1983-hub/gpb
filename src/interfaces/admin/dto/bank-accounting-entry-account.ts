import type { BankClientCard } from 'interfaces/admin/dto/bank-client-card';
import type { CurrencyCard } from 'interfaces/admin/dto/currency-card';
import type { IBaseEntity } from '@platform/services';

/** Агрегат группы бухгалтерских проводок. */
export interface BankAccountingEntryAccount extends IBaseEntity {
  /** Карточка счета. */
  bankClient: BankClientCard;
  /** Карточка валюты. */
  currency: CurrencyCard;
  /** Номер. */
  number: string;
  /** Остаток. */
  balance: {
    /** Входящий. */
    incoming: number;
    /** Исходящий. */
    outgoing: number;
  };
}
