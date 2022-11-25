import type { IBaseEntity } from '@platform/services';

/** Карточка подразделения. */
export interface BranchCard extends IBaseEntity {
  /** Наименование филиала. */
  filialName: string;
  /** Код в РКО Ф1. */
  absNumber: string;
}
