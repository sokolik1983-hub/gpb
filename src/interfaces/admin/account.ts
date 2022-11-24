import type { AccountOrganization, Branch } from 'interfaces/admin';
import type { IAccountV2 } from '@platform/services/admin';

/** Свойства счета выписки. */
export interface StatementAccount {
  /** Наименование филиала. */
  filialName: string;
  /** Идентификатор. */
  id: string;
  /** Номер. */
  number: string;
  /** Организация. */
  bankClient: AccountOrganization;
  /** Филиал обслуживания. */
  branch: Branch;
}

/** Свойства счета. */
export type Account = Pick<IAccountV2, 'accountNumber' | 'accountType' | 'bankClient' | 'branch' | 'id'>;
