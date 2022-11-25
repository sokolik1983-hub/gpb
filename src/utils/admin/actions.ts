import { CREATION_TYPE, TRANSACTION_ATTACHMENT_TYPES, TYPE } from 'interfaces';
import type { CreateStatementRequestDto, ExtendedStatementRequestCard } from 'interfaces/admin';
import type { StatementRequestCardFormState, StatementRequestFormValues } from 'interfaces/admin/form';
import { CREATION_PARAMS, DETAIL_DOCUMENT_PARAMS } from 'interfaces/form';
import { generatePath } from 'react-router-dom';
import { NEW_ENTITY_ID } from 'stream-constants';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import type { IFormState } from 'stream-constants/form';
import { CREDIT_PARAMS, DEBIT_PARAMS } from 'stream-constants/form';
import { isNeedTotalsOfDay } from 'utils/common';

/**
 * Конвертер для преобразования состояния формы в параметры создания выписки.
 *
 * @param formState Состояние формы.
 * @param withEntriesList Экспорт/печать выписки с указанным списком проводок.
 * @param documentType Тп документа.
 */
export const convertToCreationParams = (formState: IFormState, withEntriesList: boolean, documentType?: TRANSACTION_ATTACHMENT_TYPES) => {
  const separateDocumentsFiles = formState.documentsSetParams.includes(DETAIL_DOCUMENT_PARAMS.SEPARATE_DOCUMENTS_FILES);

  if (documentType) {
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
  totalsOfDay: isNeedTotalsOfDay(formState) && formState.creationParams.includes(CREATION_PARAMS.TOTALS_OF_DAY),
  nationalCurrency: formState.creationParams.includes(CREATION_PARAMS.NATIONAL_CURRENCY),
  revaluationAccountingEntry: formState.creationParams.includes(CREATION_PARAMS.REVALUATION_ACCOUNTING_ENTRY),
});

/**
 * Маппер формы представления в dto.
 *
 * @param formValues - Значения формы.
 */
export const mapFormToDto = (formValues: StatementRequestFormValues): Omit<CreateStatementRequestDto, 'userDeviceInfo'> => ({
  accountTypeIds: formValues.accountTypeCodes,
  accountsIds: formValues.accountIds.map(({ id }) => id),
  action: formValues.action!,
  creationParams: {
    includeCreditOrders: formValues.creditParams.includes(CREDIT_PARAMS.INCLUDE_ORDERS),
    includeCreditStatements: formValues.creditParams.includes(CREDIT_PARAMS.INCLUDE_STATEMENTS),
    includeDebitOrders: formValues.debitParams.includes(DEBIT_PARAMS.INCLUDE_ORDERS),
    includeDebitStatements: formValues.debitParams.includes(DEBIT_PARAMS.INCLUDE_STATEMENTS),
    separateDocumentsFiles: formValues.documentsSetParams.includes(DETAIL_DOCUMENT_PARAMS.SEPARATE_DOCUMENTS_FILES),
  },
  creationType: CREATION_TYPE.NEW,
  dateFrom: formValues.dateFrom,
  dateTo: formValues.dateTo,
  format: formValues.format,
  hideEmptyTurnovers: formValues.creationParams.includes(CREATION_PARAMS.HIDE_EMPTY_TURNOVERS),
  nationalCurrency: formValues.creationParams.includes(CREATION_PARAMS.NATIONAL_CURRENCY),
  onlyStatementDocuments: formValues.documentsSetParams.includes(DETAIL_DOCUMENT_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS),
  operations: formValues.operations,
  organizationIds: formValues.organizationIds,
  packageOfDocuments: formValues.creationParams.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET),
  periodType: formValues.periodType,
  revaluationAccountingEntry: formValues.creationParams.includes(CREATION_PARAMS.REVALUATION_ACCOUNTING_ENTRY),
  separateAccountsFiles: formValues.creationParams.includes(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES),
  signNeeded: formValues.creationParams.includes(CREATION_PARAMS.WITH_PDF_SIGN),
  sourcePage: generatePath(ADMIN_STREAM_URL.STATEMENT_REQUEST, { id: NEW_ENTITY_ID }),
  subdivisionIds: formValues.serviceBranchIds,
  totalsOfDay:
    isNeedTotalsOfDay((formValues as unknown) as IFormState) && formValues.creationParams.includes(CREATION_PARAMS.TOTALS_OF_DAY),
  type: TYPE.ONETIME,
});

/** Маппер дто ответа сервера в значения формы карточки запроса выписки. */
export const mapDtoToForm = (dto: ExtendedStatementRequestCard): Partial<StatementRequestCardFormState> => {
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

  if (dto.totalsOfDay) {
    creationParams.push(CREATION_PARAMS.TOTALS_OF_DAY);
  }

  if (dto.nationalCurrency) {
    creationParams.push(CREATION_PARAMS.NATIONAL_CURRENCY);
  }

  if (dto.revaluationAccountingEntry) {
    creationParams.push(CREATION_PARAMS.REVALUATION_ACCOUNTING_ENTRY);
  }

  if (dto.documentOptionsDto.separateDocumentsFiles) {
    documentsSetParams.push(DETAIL_DOCUMENT_PARAMS.SEPARATE_DOCUMENTS_FILES);
  }

  const hasDocumentSet = creditParams.length > 0 || debitParams.length > 0 || documentsSetParams.length > 0;

  if (hasDocumentSet) {
    creationParams.push(CREATION_PARAMS.WITH_DOCUMENTS_SET);
  }

  return {
    accountIds: dto.accounts.map(({ id }) => id),
    organizationIds: dto.organizations.map(({ id }) => id),
    dateFrom: dto.periodStart,
    dateTo: dto.periodEnd,
    format: dto.format,
    periodType: dto.periodType,
    operations: dto.operations,
    creationParams,
    creditParams,
    debitParams,
    documentsSetParams,
  };
};
