import { DETAIL_DOCUMENT_PARAMS } from 'interfaces/form';
import { locale } from 'localization';

/** Начальные значения параметров комплекта документов. */
export const defaultDocumentsSetParamsValue = {
  [DETAIL_DOCUMENT_PARAMS.SEPARATE_DOCUMENTS_FILES]: false,
  [DETAIL_DOCUMENT_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS]: false,
};

/** Начальные значения опций комплекта документов. */
export const defaultDocumentsSetParamsOptions = Object.keys(defaultDocumentsSetParamsValue).map(x => ({
  label: locale.common.documentsSetParams[x],
  value: x,
}));
