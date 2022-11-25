/** Свойства подразделения обслуживания. */
export interface Branch {
  /** Код филиала в РКО Ф1. */
  absNumber: string;
  /** Название филиала. */
  filialName: string;
  /** Идентификатор. */
  id: string;
}

/** Филиал в выписке. */
export interface StatementBranch {
  /** Код филиала. */
  branchCode: string;
  /** Наименование филиала. */
  branchName: string;
}
