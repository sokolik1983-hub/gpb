import type { ACTION, DATE_PERIODS, FORMAT, OPERATIONS } from 'interfaces';
import type { METHOD } from 'interfaces/client';

/** Состояние формы запроса на выписку по расписанию. */
export interface IFormScheduleState {
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
  /** Адреса электронной почты. */
  email: string[];
  /** Формат файла выписки. */
  format: FORMAT;
  /** Операции выписки. */
  operations: OPERATIONS;
  /** Тип периода. */
  periodType: DATE_PERIODS;
  /** Типы способов сохранения выписки по расписанию. */
  method: METHOD;
}
