import type { IBaseEntity } from '@platform/services';
import type { BankClientCard } from '../bank-client-card';
import type { CurrencyCard } from '../currency-card';
import type { BranchCard } from './branch-card';

/** Карточка счета. */
export interface AccountCard extends IBaseEntity {
  /** Карточка клиента банка. */
  bankClient: BankClientCard;
  /** Карточка подразделения. */
  branch: BranchCard;
  /** Карточка валюты. */
  currency: CurrencyCard;
  /** Номер. */
  number: string;
}
