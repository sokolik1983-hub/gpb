/** Свойства подразделения обслуживания. */
export interface ServiceBranch {
  /** Код филиала в РКО Ф1. */
  absNumber: string;
  /** Название филиала. */
  filialName: string;
  /** Идентификатор. */
  id: string;
}

/** Филиал. */
export interface Branch {
  /** Код филиала. */
  branchCode: string;
  /** Наименование филиала. */
  branchName: string;
}
