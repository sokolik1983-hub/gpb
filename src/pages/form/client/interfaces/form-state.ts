import { DATE_PERIODS } from 'interfaces';
import type { ILatestStatementDto } from 'interfaces/client';
import { FORMAT } from 'interfaces/client/classificators/format';
import { OPERATIONS } from 'interfaces/client/classificators/operations';
import { locale } from 'localization';
import { pathGenerator } from '@platform/core';

const getPath = pathGenerator<IFormState>();

/** Поля на форме. */
export const FORM_FIELDS = {
  PERIOD_TYPE: getPath('periodType'),
  DATE_FROM: getPath('dateFrom'),
  DATE_TO: getPath('dateTo'),
  ACCOUNTS: getPath('accountIds'),
  FILE_FORMAT: getPath('fileFormat'),
  OPERATION: getPath('operation'),
  CREATION_PARAMS: getPath('creationParams'),
  DOCUMENTS_SET_PARAMS: getPath('documentsSetParams'),
  DEBIT_PARAMS: getPath('debitParams'),
  CREDIT_PARAMS: getPath('creditParams'),
  EMAIL: getPath('email'),
};

/** Состояние формы запроса на выписку. */
export interface IFormState {
  /** Тип периода. */
  periodType: DATE_PERIODS;
  dateFrom: string;
  dateTo: string;
  accountIds: string[];
  fileFormat: FORMAT;
  operation: OPERATIONS;
  creationParams: string[];
  documentsSetParams: string[];
  debitParams: string[];
  creditParams: string[];
  email: string;
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
  fileFormat: FORMAT.PDF,
  operation: OPERATIONS.ALL,
  periodType: DATE_PERIODS.YESTERDAY,
};

/** Функция возвращающая начальное значение состояния формы. */
export const getInitialFormState = (latestStatement?: ILatestStatementDto): IFormState => {
  const latestFormState: Partial<IFormState> = {
    accountIds: latestStatement?.accountsIds,
    dateFrom: latestStatement?.periodStart,
    dateTo: latestStatement?.periodEnd,
    fileFormat: latestStatement?.statementFormat,
    periodType: latestStatement?.periodType,
  };

  if (!latestStatement) {
    return defaultFormState;
  }

  return { ...defaultFormState, ...latestFormState };
};

/** Лейблы полей формы создания "Запроса выписки". */
export const FORM_FIELD_LABELS = {
  [FORM_FIELDS.PERIOD_TYPE]: locale.common.period.label,
  [FORM_FIELDS.DATE_FROM]: locale.common.periodStart.label,
  [FORM_FIELDS.DATE_TO]: locale.common.periodEnd.label,
  [FORM_FIELDS.ACCOUNTS]: locale.common.accounts.label,
  [FORM_FIELDS.FILE_FORMAT]: locale.common.fileFormat.label,
  [FORM_FIELDS.OPERATION]: locale.common.operations.label,
};
