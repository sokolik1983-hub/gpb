import { DATE_PERIODS } from 'interfaces';
import { OPERATIONS, FORMAT } from 'interfaces/common';
import type { ACTION } from 'interfaces/common';
import { locale } from 'localization';

/** Состояние формы запроса на выписку. */
export interface IFormState {
  /** Тип периода. */
  periodType: DATE_PERIODS;
  /** Дата начала периода. */
  dateFrom: string;
  /** Дата окончания периода. */
  dateTo: string;
  /** Идентификаторы счетов. */
  accountIds: string[];
  /** Формат файла выписки. */
  format: FORMAT;
  /** Операции выписки. */
  operations: OPERATIONS;
  /** Параметры создания выписки. */
  creationParams: string[];
  /** Параметры комплекта документов. */
  documentsSetParams: string[];
  /** Дебетовые параметры комплекта документов. */
  debitParams: string[];
  /** Кредитовые параметры комплекта документов. */
  creditParams: string[];
  /** Адрес электронной почты. */
  email?: string;
  /** Действие. */
  action?: ACTION;
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
} as const;

/** Метки полей формы создания "Запроса выписки". */
export const FORM_FIELD_LABELS = {
  [FORM_FIELDS.PERIOD_TYPE]: locale.common.period.label,
  [FORM_FIELDS.DATE_FROM]: locale.common.periodStart.label,
  [FORM_FIELDS.DATE_TO]: locale.common.periodEnd.label,
  [FORM_FIELDS.ACCOUNTS]: locale.common.accounts.label,
  [FORM_FIELDS.FILE_FORMAT]: locale.common.fileFormat.label,
  [FORM_FIELDS.OPERATION]: locale.common.operations.label,
};
