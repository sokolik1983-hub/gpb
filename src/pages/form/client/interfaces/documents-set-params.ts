import { locale } from 'localization';

export const SEPARATE_DOCUMENTS_FILES = 'separateDocumentsFiles';
export const ONLY_REQUEST_STATEMENT_DOCUMENTS = 'onlyRequestStatementDocuments';

export interface IDocumentsSetParams {
  /** Отдельными файлами. */
  separateDocumentsFiles: boolean;
  /** Только документы выписки. */
  onlyRequestStatementDocuments: boolean;
}

export const defaultDocumentsSetParamsValue: IDocumentsSetParams = {
  separateDocumentsFiles: false,
  onlyRequestStatementDocuments: false,
};

export const defaultDocumentsSetParamsOptions = Object.keys(defaultDocumentsSetParamsValue).map(x => ({
  label: locale.common.documentsSetParams[x],
  value: x,
}));
