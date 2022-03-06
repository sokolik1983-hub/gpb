import type { ACTION, FORMAT } from 'interfaces/client';
import type { IUserDeviceInfo } from 'interfaces/user-device-info';

/** ДТО запроса на создание вложения. */
export interface ICreateAttachmentRequestDto {
  /** Проводки (если пусто, то все проводки выписки). */
  accountingEntriesIds?: number[];
  /** Действие (над выпиской). */
  action: ACTION;
  /** Электронная почта. */
  email?: string;
  /** Формат вложения. */
  format: FORMAT;
  /** Формировать выписку. */
  genStatement?: boolean;
  /** Скрыть нулевые обороты. */
  hideEmptyTurnovers?: boolean;
  /** Кредитовые документы основания. */
  includeCreditOrders?: boolean;
  /** Кредитовые документы выписки. */
  includeCreditStatements?: boolean;
  /** Дебетовые документы основания. */
  includeDebitOrders?: boolean;
  /** Дебетовые документы выписки. */
  includeDebitStatements?: boolean;
  /** Отдельный файл по каждому счету. */
  separateAccountsFiles?: boolean;
  /** Документы отдельными файлами. */
  separateDocumentsFiles?: boolean;
  /** Подпись Банка. */
  signed?: boolean;
  /** Идентификатор выписки. */
  statementId: string;
  /** Данные устройства пользователя. */
  userDeviceInfo: IUserDeviceInfo;
}
