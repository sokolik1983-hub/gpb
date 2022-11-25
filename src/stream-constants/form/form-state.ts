import { DATE_PERIODS } from 'interfaces';
import { OPERATIONS, FORMAT } from 'interfaces/common';
import type { ACTION } from 'interfaces/common';
import { locale } from 'localization';
import { pathGenerator } from '@platform/core';

/** Состояние формы запроса на выписку. */
export interface IFormState {
  /** Идентификаторы счетов. */
  accountIds: string[];
  /** Действие. */
  action?: ACTION;
  /** Параметры создания выписки. */
  creationParams: string[];
  /** Кредитовые параметры комплекта документов. */
  creditParams: string[];
  /** Дебетовые параметры комплекта документов. */
  debitParams: string[];
  /** Дата начала периода. */
  dateFrom: string;
  /** Дата окончания периода. */
  dateTo: string;
  /** Параметры комплекта документов. */
  documentsSetParams: string[];
  /** Адрес электронной почты. */
  email?: string;
  /** Формат файла выписки. */
  format: FORMAT;
  /** Операции выписки. */
  operations: OPERATIONS;
  /** Тип периода. */
  periodType: DATE_PERIODS;
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

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<IFormState>();

/** Поля на форме. */
export const FORM_FIELDS = {
  ACCOUNTS: getPath('accountIds'),
  ACTION: getPath('action'),
  CREATION_PARAMS: getPath('creationParams'),
  CREDIT_PARAMS: getPath('creditParams'),
  DATE_FROM: getPath('dateFrom'),
  DATE_TO: getPath('dateTo'),
  DEBIT_PARAMS: getPath('debitParams'),
  DOCUMENTS_SET_PARAMS: getPath('documentsSetParams'),
  EMAIL: getPath('email'),
  FILE_FORMAT: getPath('format'),
  OPERATION: getPath('operations'),
  PERIOD_TYPE: getPath('periodType'),
} as const;

/** Метки полей формы создания "Запроса выписки". */
export const FORM_FIELD_LABELS = {
  [FORM_FIELDS.ACCOUNTS]: locale.common.accounts.label,
  [FORM_FIELDS.DATE_FROM]: locale.common.periodStart.label,
  [FORM_FIELDS.DATE_TO]: locale.common.periodEnd.label,
  [FORM_FIELDS.FILE_FORMAT]: locale.common.fileFormat.label,
  [FORM_FIELDS.OPERATION]: locale.common.operations.label,
  [FORM_FIELDS.PERIOD_TYPE]: locale.common.period.label,
};
