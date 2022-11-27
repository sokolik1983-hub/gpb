import { DETAIL_DOCUMENT_PARAMS } from 'interfaces/form';
import { locale } from 'localization';

export const FIELD_NAME = 'documentsSetParams';

export const options = [
  {
    value: DETAIL_DOCUMENT_PARAMS.SEPARATE_DOCUMENTS_FILES,
    label: locale.common.documentsSetParams.separateDocumentsFiles,
  },
  {
    value: DETAIL_DOCUMENT_PARAMS.REQUEST_STATEMENT_DOCUMENTS,
    label: locale.common.documentsSetParams.requestStatementDocuments,
  },
  {
    value: DETAIL_DOCUMENT_PARAMS.REQUEST_BASE_DOCUMENTS,
    label: locale.common.documentsSetParams.requestBaseDocuments,
  },
];

export const initialValues = {
  [FIELD_NAME]: [],
};
