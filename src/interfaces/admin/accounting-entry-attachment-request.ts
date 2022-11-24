import type { ACTION } from 'interfaces';

/** Запрос на создание вложения на основе проводок без привязки к выписке. */
export interface AccountingEntryAttachmentRequest {
  /** Идентификаторы проводок. */
  accountingEntryIds: string[];
  /** Действие. */
  action: ACTION;
  /** Кредитовые документы основания. */
  includeCreditOrders: boolean;
  /** Дебетовые документы основания. */
  includeDebitOrders: boolean;
  /** Кредитовые документы выписки. */
  includeCreditStatements: boolean;
  /** Дебетовые документы выписки. */
  includeDebitStatements: boolean;
  /** Документы отдельными файлами. */
  separateDocumentsFiles: boolean;
}
