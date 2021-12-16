/** Параметры формирования комплекта документов. */
export interface ICreationParamsDto {
  /** Кредитные документы основания. */
  includeCreditOrders: boolean;
  /** Кредитные документы выписки. */
  includeCreditStatements: boolean;
  /** Дебетовые документы основания. */
  includeDebitOrders: boolean;
  /** Дебетовые документы выписки. */
  includeDebitStatements: boolean;
  /** Документы отдельными файлами. */
  separateDocumentsFiles: boolean;
}
