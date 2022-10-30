import type { AccountOrganization, ServiceBranch } from 'interfaces/admin';
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
  branch: ServiceBranch;
}

/** Свойства счета. */
export type Account = Pick<IAccountV2, 'accountNumber' | 'bankClient' | 'id'>;
