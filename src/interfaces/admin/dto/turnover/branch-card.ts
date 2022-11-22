import type { IBaseEntity } from '@platform/services';

/** Карточка подразделения. */
export interface BranchCard extends IBaseEntity {
  /** Наименование филиала. */
  filialName: string;
}
