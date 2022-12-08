import { DATE_PERIODS, SCHEDULE_METHODS } from 'interfaces';
import { OPERATIONS, FORMAT } from 'interfaces/common';
import type { ACTION } from 'interfaces/common';
import { locale } from 'localization';
import { pathGenerator } from '@platform/core';

/** Состояние формы запроса на выписку. */
export interface IScheduleFormState {
  /** Идентификаторы счетов. */
  accountIds: string[];
  /** Номера счетов. */
  accountNumber: string[];
  /** Действие. */
  action?: ACTION;
  /** Параметры создания выписки. */
  creationParams: string[];
  /** Кредитовые параметры комплекта документов. */
  creditParams: string[];
  /** Дебетовые параметры комплекта документов. */
  debitParams: string[];
  /** Параметры комплекта документов. */
  documentsSetParams: string[];
  /** Адрес электронной почты. */
  email: string[];
  /** Формат файла выписки. */
  format: FORMAT;
  /** Операции выписки. */
  operations: OPERATIONS;
  /** Способ получения выписки. */
  method: string;
  /** Тип периода. */
  periodType: DATE_PERIODS;
  /** Время отправки сформированного файла. */
  time: string;
  /** Организации клиента. */
  organizations: string[];
}

/** Начальное значение состояния формы. */
export const defaultFormState: IScheduleFormState = {
  accountIds: [],
  accountNumber: [],
  creationParams: [],
  creditParams: [],
  debitParams: [],
  documentsSetParams: [],
  email: [],
  format: FORMAT.PDF,
  operations: OPERATIONS.ALL,
  periodType: DATE_PERIODS.YESTERDAY,
  time: '09:00',
  organizations: [],
  method: SCHEDULE_METHODS.EMAIL,
};

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<IScheduleFormState>();

/** Поля на форме. */
export const FORM_FIELDS = {
  ACCOUNTS: getPath('accountNumber'),
  ACTION: getPath('action'),
  CREATION_PARAMS: getPath('creationParams'),
  CREDIT_PARAMS: getPath('creditParams'),
  DEBIT_PARAMS: getPath('debitParams'),
  DOCUMENTS_SET_PARAMS: getPath('documentsSetParams'),
  EMAIL: getPath('email'),
  FILE_FORMAT: getPath('format'),
  OPERATION: getPath('operations'),
  METHOD: getPath('method'), //+
  PERIOD_TYPE: getPath('periodType'), //+
  TIME: getPath('time'), //+
  ORGANIZATIONS: getPath('organizations'), //+
} as const;

/** Метки полей формы создания "Запроса выписки по расписанию". */
export const FORM_FIELD_LABELS = {
  [FORM_FIELDS.ACCOUNTS]: locale.common.accounts.label,
  [FORM_FIELDS.FILE_FORMAT]: locale.common.fileFormat.label,
  [FORM_FIELDS.OPERATION]: locale.common.operations.label,
  [FORM_FIELDS.METHOD]: locale.common.method.label,
  [FORM_FIELDS.PERIOD_TYPE]: locale.common.period.label,
  [FORM_FIELDS.TIME]: locale.common.time.label,
  [FORM_FIELDS.ORGANIZATIONS]: locale.common.organizations.label,
  [FORM_FIELDS.EMAIL]: locale.common.email.label,
};
