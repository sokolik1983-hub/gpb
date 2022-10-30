import type { ACTION, FORMAT, IUserDeviceInfo } from 'interfaces';

/** Свойства дто запроса создания файла выписки. */
export interface CreateStatementAttachmentRequestDto {
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
  /** Итоги за день. */
  totalsOfDay?: boolean;
  /** Рублёвый эквивалент. */
  nationalCurrency?: boolean;
  /** Проводки переоценки. */
  revaluationAccountingEntry?: boolean;
  /** Данные устройства пользователя. */
  userDeviceInfo?: IUserDeviceInfo;
}
