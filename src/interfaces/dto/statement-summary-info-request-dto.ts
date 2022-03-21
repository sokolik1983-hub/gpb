import type { IUserDeviceInfo } from 'interfaces';

/** ДТО запроса сводной информации по выписке. */
export interface IStatementSummaryInfoRequestDto {
  /** Идентификатор выписки. */
  statementId: string;
  /** Данные устройства пользователя. */
  userDeviceInfo: IUserDeviceInfo;
}
