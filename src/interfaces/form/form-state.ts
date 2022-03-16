import { DATE_PERIODS } from 'interfaces';
import { FORMAT, OPERATIONS } from 'interfaces/client';
import type { ACTION, ILatestStatementDto, EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { DETAIL_DOCUMENT_PARAMS } from 'interfaces/form/detail-document-params';
import { locale } from 'localization';
import { mapDtoToForm } from 'utils/actions';
import { alwaysSendParamCasesFromUI } from 'utils/export-params-dialog';

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
  /** Действие. */
  action?: ACTION;
}

/** Начальное значение состояния формы. */
export const defaultFormState: IFormState = {
  accountIds: [],
  creationParams: [CREATION_PARAMS.WITH_DOCUMENTS_SET, CREATION_PARAMS.HIDE_EMPTY_TURNOVERS],
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

/** Конфиг начального состояния формы. */
export interface IStateConfig {
  /** Вариант вызова диалога. */
  useCase?: EXPORT_PARAMS_USE_CASES;
  /** Предыдущий запрос на выписку. */
  latestStatement?: ILatestStatementDto;
}

/** Функция возвращающая начальное значение состояния формы. */
export const getInitialFormState = (config: IStateConfig): Partial<IFormState> => {
  const { latestStatement, useCase } = config;

  if (!latestStatement) {
    const creationParams: string[] = [];
    const documentsSetParams: string[] = [];

    if (useCase && alwaysSendParamCasesFromUI.includes(useCase)) {
      creationParams.push(CREATION_PARAMS.WITH_DOCUMENTS_SET);
      documentsSetParams.push(DETAIL_DOCUMENT_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS);
    }

    return { ...defaultFormState, creationParams, documentsSetParams };
  }

  // TODO посмотреть вариант с хранением стейта формы по тому, который приходит с BE
  const formState = mapDtoToForm(latestStatement);

  const form = Object.keys(defaultFormState).reduce((acc, key) => {
    if (!acc[key]) {
      acc[key] = defaultFormState[key];
    }

    return acc;
  }, formState);

  return form;
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
