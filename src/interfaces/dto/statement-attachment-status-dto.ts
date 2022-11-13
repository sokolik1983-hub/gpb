/** Статус вложения при экспорте или печати документа выписки. */
export enum STATEMENT_ATTACHMENT_STATUS {
  /** Ошибка. */
  ERROR = 'ERROR',
  /** Успех. */
  EXECUTE = 'EXECUTE',
  /** В работе. */
  IN_PROGRESS = 'IN_PROGRESS',
}

/** ДТО результата проверки статуса вложения документа выписки.    */
export interface StatementAttachmentStatusDto {
  /** Статус вложения. */
  status: STATEMENT_ATTACHMENT_STATUS;
}
