import type { AccountOrganization } from 'interfaces/admin/organization';
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
  organization: AccountOrganization;
}

/** Свойства счета. */
export type Account = Pick<IAccountV2, 'accountNumber' | 'bankClient' | 'id'>;
