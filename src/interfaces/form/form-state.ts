import type { EXPORT_PARAMS_USE_CASES } from 'components/export-params-dialog/statemet-params-use-cases';
import { DATE_PERIODS } from 'interfaces';
import type { ILatestStatementDto } from 'interfaces/client';
import type { ACTIONS } from 'interfaces/client/classificators';
import { FORMAT } from 'interfaces/client/classificators/format';
import { OPERATIONS } from 'interfaces/client/classificators/operations';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { CREDIT_PARAMS } from 'interfaces/form/credit-params';
import { DEBIT_PARAMS } from 'interfaces/form/debit-params';
import { DETAIL_DOCUMENT_PARAMS } from 'interfaces/form/detail-document-params';
import { locale } from 'localization';

/** Состояние формы запроса на выписку. */
export interface IFormState {
  /** Тип периода. */
  periodType: DATE_PERIODS;
  dateFrom: string;
  dateTo: string;
  accountIds: string[];
  format: FORMAT;
  operations: OPERATIONS;
  creationParams: string[];
  documentsSetParams: string[];
  debitParams: string[];
  creditParams: string[];
  email: string;
  useCase?: EXPORT_PARAMS_USE_CASES;
  /** Действие. */
  action?: ACTIONS;
}

/** Начальное значение состояния формы. */
export const defaultFormState: IFormState = {
  accountIds: [],
  creationParams: [],
  creditParams: [],
  debitParams: [],
  documentsSetParams: [],
  email: '',
  dateFrom: '',
  dateTo: '',
  format: FORMAT.PDF,
  operations: OPERATIONS.ALL,
  periodType: DATE_PERIODS.YESTERDAY,
};

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

  return {
    accountIds: dto.accountsIds,
    dateFrom: dto.periodStart,
    dateTo: dto.periodEnd,
    format: dto.statementFormat,
    periodType: dto.periodType,
    creationParams,
    creditParams,
    debitParams,
    documentsSetParams,
  };
};

/** Функция возвращающая начальное значение состояния формы. */
export const getInitialFormState = (latestStatement?: ILatestStatementDto): IFormState => {
  if (!latestStatement) {
    return defaultFormState;
  }

  // TODO посмотреть вариант с хранением стейта формы по тому, который приходит с BE
  const latestFormState: Partial<IFormState> = mapDtoToForm(latestStatement);

  return { ...defaultFormState, ...latestFormState };
};

/** Поля на форме. */
export const FORM_FIELDS = {
  PERIOD_TYPE: 'periodType',
  DATE_FROM: 'dateFrom',
  DATE_TO: 'dateTo',
  ACCOUNTS: 'accountIds',
  FILE_FORMAT: 'format',
  OPERATION: 'operations',
  CREATION_PARAMS: 'creationParams',
  DOCUMENTS_SET_PARAMS: 'documentsSetParams',
  DEBIT_PARAMS: 'debitParams',
  CREDIT_PARAMS: 'creditParams',
  EMAIL: 'email',
  ACTION: 'action',
};

/** Метки полей формы создания "Запроса выписки". */
export const FORM_FIELD_LABELS = {
  [FORM_FIELDS.PERIOD_TYPE]: locale.common.period.label,
  [FORM_FIELDS.DATE_FROM]: locale.common.periodStart.label,
  [FORM_FIELDS.DATE_TO]: locale.common.periodEnd.label,
  [FORM_FIELDS.ACCOUNTS]: locale.common.accounts.label,
  [FORM_FIELDS.FILE_FORMAT]: locale.common.fileFormat.label,
  [FORM_FIELDS.OPERATION]: locale.common.operations.label,
};
