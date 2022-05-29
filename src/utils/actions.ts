import type { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { CREATION_TYPE, TRANSACTION_ATTACHMENT_TYPES, TYPE } from 'interfaces/client';
import type { ICreateRequestStatementDto, ILatestStatementDto } from 'interfaces/dto';
import { DETAIL_DOCUMENT_PARAMS, CREATION_PARAMS } from 'interfaces/form';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import type { IFormState } from 'stream-constants/form';
import { CREDIT_PARAMS } from 'stream-constants/form/default-credit-params-options';
import { DEBIT_PARAMS } from 'stream-constants/form/default-debit-params-options';
import { alwaysSendParamCasesFromUI } from 'utils/export-params-dialog';

/**
 * Конвертер для преобразования состояния формы в параметры создания выписки.
 *
 * @param formState Состояние формы.
 * @param useCase Вариант вызова диалога.
 * @param documentType Тп документа.
 */
export const convertToCreationParams = (
  formState: IFormState,
  useCase?: EXPORT_PARAMS_USE_CASES,
  documentType?: TRANSACTION_ATTACHMENT_TYPES
) => {
  const separateDocumentsFiles = formState.documentsSetParams.includes(DETAIL_DOCUMENT_PARAMS.SEPARATE_DOCUMENTS_FILES);

  if (useCase && documentType && alwaysSendParamCasesFromUI.includes(useCase)) {
    const generateOrders = documentType === TRANSACTION_ATTACHMENT_TYPES.BASE;
    const generateStatements = documentType === TRANSACTION_ATTACHMENT_TYPES.STATEMENT;

    return {
      includeCreditOrders: generateOrders,
      includeCreditStatements: generateStatements,
      includeDebitOrders: generateOrders,
      includeDebitStatements: generateStatements,
      separateDocumentsFiles,
    };
  }

  return {
    includeCreditOrders: formState.creditParams.includes(CREDIT_PARAMS.INCLUDE_ORDERS),
    includeCreditStatements: formState.creditParams.includes(CREDIT_PARAMS.INCLUDE_STATEMENTS),
    includeDebitOrders: formState.debitParams.includes(DEBIT_PARAMS.INCLUDE_ORDERS),
    includeDebitStatements: formState.debitParams.includes(DEBIT_PARAMS.INCLUDE_STATEMENTS),
    separateDocumentsFiles,
  };
};

/**
 * Конвертер для преобразования состояния формы в расширенные / дополнительные параметры создания выписки.
 *
 * @param formState Состояние формы.
 */
export const convertToExtendedCreationParams = (formState: IFormState) => ({
  hideEmptyTurnovers: formState.creationParams.includes(CREATION_PARAMS.HIDE_EMPTY_TURNOVERS),
  separateAccountsFiles: formState.creationParams.includes(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES),
  sign: formState.creationParams.includes(CREATION_PARAMS.WITH_PDF_SIGN),
});

/** Функция для преобразования значений формы в ДТО запроса выписки. */
export const mapFormToDto = (formState: IFormState, creationType = CREATION_TYPE.NEW): Omit<ICreateRequestStatementDto, 'id'> => ({
  accountsIds: formState.accountIds,
  action: formState.action!,
  creationParams: convertToCreationParams(formState),
  ...convertToExtendedCreationParams(formState),
  creationType,
  dateFrom: formState.dateFrom,
  dateTo: formState.dateTo,
  email: formState.email,
  operations: formState.operations,
  periodType: formState.periodType,
  format: formState.format,
  sourcePage: COMMON_STREAM_URL.STATEMENT,
  type: TYPE.ONETIME,
});

/** Функция для преобразования ДТО ответа для последний выписки в значения формы. */
export const mapDtoToForm = (dto: ILatestStatementDto): Partial<IFormState> => {
  const creditParams: string[] = [];
  const debitParams: string[] = [];
  const creationParams: string[] = [];
  const documentsSetParams: string[] = [];

  if (dto.documentOptionsDto.includeCreditOrders) {
    creditParams.push(CREDIT_PARAMS.INCLUDE_ORDERS);
  }

  if (dto.documentOptionsDto.includeCreditStatements) {
    creditParams.push(CREDIT_PARAMS.INCLUDE_STATEMENTS);
  }

  if (dto.documentOptionsDto.includeDebitOrders) {
    debitParams.push(DEBIT_PARAMS.INCLUDE_ORDERS);
  }

  if (dto.documentOptionsDto.includeDebitStatements) {
    debitParams.push(DEBIT_PARAMS.INCLUDE_STATEMENTS);
  }

  if (dto.separateAccountsFiles) {
    creationParams.push(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES);
  }

  if (dto.hideEmptyTurnovers) {
    creationParams.push(CREATION_PARAMS.HIDE_EMPTY_TURNOVERS);
  }

  if (dto.signNeeded) {
    creationParams.push(CREATION_PARAMS.WITH_PDF_SIGN);
  }

  if (dto.documentOptionsDto.separateDocumentsFiles) {
    documentsSetParams.push(DETAIL_DOCUMENT_PARAMS.SEPARATE_DOCUMENTS_FILES);
  }

  const hasDocumentSet = creditParams.length > 0 || debitParams.length > 0 || documentsSetParams.length > 0;

  if (hasDocumentSet) {
    creationParams.push(CREATION_PARAMS.WITH_DOCUMENTS_SET);
  }

  return {
    accountIds: dto.accountsIds,
    dateFrom: dto.periodStart,
    dateTo: dto.periodEnd,
    format: dto.statementFormat,
    periodType: dto.periodType,
    operations: dto.statementOperationDto,
    creationParams,
    creditParams,
    debitParams,
    documentsSetParams,
  };
};
