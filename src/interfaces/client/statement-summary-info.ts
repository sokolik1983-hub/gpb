import type { IUserDeviceInfo } from '../user-device-info';

/** ДТО запроса сводной информации по выписке. */
export interface IStatementSummaryInfoRequestDto {
  /** Идентификатор выписки. */
  statementId: string;
  /** Данные устройства пользователя. */
  userDeviceInfo: IUserDeviceInfo;
}

/** Сводная информация по выписке. */
export interface IStatementSummaryInfoResponseDto {
  /** Дата начала периода, по которому формируется выписка. */
  dateFrom: string;
  /** Дата окончания периода, по которому формируется выписка. */
  dateTo: string;
  /** Счёт, по которому формируется выписка. */
  accountNumber: string;
  /** Наименование организации. */
  organizationName: string;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Расход. */
  outcome: number;
  /** Количество проводок с расходом. */
  outcomeAccountEntryCount: number;
  /** Приход. */
  income: number;
  /** Количество проводок с приходом. */
  incomeAccountEntryCount: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
  /** Код валюты. */
  currencyCode: string;
}
