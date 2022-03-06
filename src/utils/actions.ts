import type { IUserDeviceInfo } from 'interfaces';
import type { ICreateRequestStatementDto, ILatestStatementDto } from 'interfaces/client';
import { ACTION, CREATION_TYPE, FORMAT, TYPE, EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import type { ICreateAttachmentRequestDto } from 'interfaces/dto';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { CREDIT_PARAMS } from 'interfaces/form/credit-params';
import { DEBIT_PARAMS } from 'interfaces/form/debit-params';
import { DETAIL_DOCUMENT_PARAMS } from 'interfaces/form/detail-document-params';
import type { IFormState } from 'interfaces/form/form-state';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import type { IBaseEntity } from '@platform/services';
import { fileFormatShowCases, hideExportParamsDialogCases } from './export-params-dialog';

/**
 * Конвертер для преобразования состояния формы в параметры создания выписки.
 *
 * @param formState Состояние формы.
 */
export const convertToCreationParams = (formState: IFormState) => ({
  includeCreditOrders: formState.creditParams.includes(CREDIT_PARAMS.INCLUDE_ORDERS),
  includeCreditStatements: formState.creditParams.includes(CREDIT_PARAMS.INCLUDE_STATEMENTS),
  includeDebitOrders: formState.debitParams.includes(DEBIT_PARAMS.INCLUDE_ORDERS),
  includeDebitStatements: formState.debitParams.includes(DEBIT_PARAMS.INCLUDE_STATEMENTS),
  separateDocumentsFiles: formState.documentsSetParams.includes(DETAIL_DOCUMENT_PARAMS.SEPARATE_DOCUMENTS_FILES),
});

/**
 * Конвертер для преобразования состояния формы в расширенные / дополнительные параметры создания выписки.
 *
 * @param formState Состояние формы.
 */
export const convertToExtendedCreationParams = (formState: IFormState) => ({
  hideEmptyTurnovers: formState.creationParams.includes(CREATION_PARAMS.HIDE_EMPTY_TURNOVERS),
  separateAccountsFiles: formState.creationParams.includes(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES),
  sign: formState.creationParams.includes(CREATION_PARAMS.WITH_SIGN),
});

/**
 * Конвертер для преобразования состояния формы и выбранных записей (строк) в параметры создания аттачмента.
 *
 * @param docs Выбранные записи.
 * @param statementId Id текущей выписки.
 * @param action Действие, для которого вызываем создание вложения.
 * @param useCase Вариант вызова ЭФ, для которой формируем параметры.
 * @param userDeviceInfo Данные текущего пользователя.
 * @param statementRequestFormat Формат запроса на выписку.
 * @param formState Состояние формы.
 */
export const convertToAttachmentRequest = (
  docs: IBaseEntity[],
  statementId: string,
  action: ACTION,
  useCase: EXPORT_PARAMS_USE_CASES,
  userDeviceInfo: IUserDeviceInfo,
  statementRequestFormat?: FORMAT,
  formState?: IFormState
): ICreateAttachmentRequestDto => {
  const isPrint = action === ACTION.PRINT;
  const isExport = action === ACTION.DOWNLOAD;
  // В дальнейшем условие расширится с учетом электронный почты
  const isGenerateStatement = isExport;

  const getFormat = () => {
    if (isPrint) {
      return FORMAT.PDF;
    }

    if (fileFormatShowCases.includes(useCase)) {
      return formState!.format;
    }

    if (useCase === EXPORT_PARAMS_USE_CASES.FOURTEEN) {
      return statementRequestFormat!;
    }

    return FORMAT.PDF;
  };

  const format = getFormat();

  if (hideExportParamsDialogCases.includes(useCase)) {
    return {
      action,
      format,
      genStatement: isGenerateStatement,
      statementId,
      userDeviceInfo,
    };
  }

  const { hideEmptyTurnovers, separateAccountsFiles, sign } = convertToExtendedCreationParams(formState!);

  return {
    accountingEntriesIds: docs.map(el => Number(el.id)),
    email: formState!.email,
    action,
    format,
    genStatement: isGenerateStatement,
    ...convertToCreationParams(formState!),
    hideEmptyTurnovers,
    separateAccountsFiles,
    signed: sign,
    statementId,
    userDeviceInfo,
  };
};

/** Функция для преобразования значений формы в ДТО запроса выписки. */
export const mapFormToDto = (formState: IFormState, creationType = CREATION_TYPE.NEW): ICreateRequestStatementDto => ({
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
    creationParams.push(CREATION_PARAMS.WITH_SIGN);
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
