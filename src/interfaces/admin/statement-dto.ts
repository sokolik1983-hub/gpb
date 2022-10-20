import type { ACTION, FORMAT, IUserDeviceInfo } from 'interfaces';

/** Свойства дто запроса создания файла выписки. */
export interface CreateStatementAttachmentRequestDto {
  /** Тип действия. */
  action: ACTION;
  /** Формат выписки. */
  format: FORMAT;
  /** Идентификатор выписки. */
  statementId: string;
  /** Данные устройства пользователя. */
  userDeviceInfo: IUserDeviceInfo;
}
