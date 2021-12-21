import { locale } from 'localization';

/** Параметры комплекта документов. */
export enum DOCUMENTS_SET_PARAMS {
  /** Отдельными файлами. */
  SEPARATE_DOCUMENTS_FILES = 'separateDocumentsFiles',
  /** Только документы выписки. */
  ONLY_REQUEST_STATEMENT_DOCUMENTS = 'onlyRequestStatementDocuments',
}

export const defaultDocumentsSetParamsValue = {
  [DOCUMENTS_SET_PARAMS.SEPARATE_DOCUMENTS_FILES]: false,
  [DOCUMENTS_SET_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS]: false,
};

export const defaultDocumentsSetParamsOptions = Object.keys(defaultDocumentsSetParamsValue).map(x => ({
  label: locale.common.documentsSetParams[x],
  value: x,
}));
