import type { Organization } from 'interfaces/admin/organization';

/** Счет. */
export interface Account {
  /** Наименование филиала. */
  filialName: string;
  /** Идентификатор. */
  id: string;
  /** Номер. */
  number: string;
  /** Организация. */
  organization: Organization;
}
