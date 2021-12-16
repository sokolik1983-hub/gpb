import { DATE_PERIODS } from 'interfaces';
import type { ILatestStatementDto } from 'interfaces/client';
import { FORMAT } from 'interfaces/client/classificators/format';
import { OPERATION } from 'pages/form/client/interfaces/operation';
import { pathGenerator } from '@platform/core';

const getPath = pathGenerator<IFormState>();

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
  operation: OPERATION;
  creationParams: string[];
  documentsSetParams: string[];
  debitParams: string[];
  creditParams: string[];
  email: string;
}

export const getDefaultFormState = (latestStatement?: ILatestStatementDto): IFormState => ({
  accountIds: latestStatement?.accountsIds || [],
  creationParams: [],
  creditParams: [],
  dateFrom: latestStatement?.periodStart || '',
  dateTo: latestStatement?.periodEnd || '',
  debitParams: [],
  documentsSetParams: [],
  email: '',
  fileFormat: latestStatement?.statementFormat || FORMAT.PDF,
  operation: OPERATION.ALL,
  periodType: latestStatement?.periodType || DATE_PERIODS.YESTERDAY,
});
