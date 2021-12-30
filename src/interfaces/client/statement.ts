import type { STATEMENT_STATUSES } from 'interfaces';

/** Выписка. */
export interface IStatement {
  /** Идентификатор выписки. */
  id: string;
  /** Дата и время завершения исполнения. */
  dateEnd: string;
  /** Дата начала интервала выписки. */
  dateFrom: string;
  /** Дата и время начала исполнения. */
  dateStart: string;
  /** Дата окончания интервала выписки. */
  dateTo: string;
  /** Описание ошибки. */
  error: string;
  /** Дата и время отправки нотификации об ошибке формирования выписки. */
  errorNotificationSendingDate: string;
  /** Отправка нотификации об ошибке формирования выписки. */
  errorNotificationSent: boolean;
  /** Файл. */
  fileId: string;
  /** Статус выписки. */
  status: STATEMENT_STATUSES;
}
