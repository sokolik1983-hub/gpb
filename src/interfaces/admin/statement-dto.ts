import type { ACTION, CREATION_TYPE, DATE_PERIODS, IUserDeviceInfo, FORMAT, OPERATIONS, TYPE } from 'interfaces';
import type { ICreationParamsDto } from 'interfaces/dto';

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

/** ДТО создания сущности "Запрос выписки". */
export interface CreateStatementRequestDto {
  /** Типы счетов. */
  accountTypeIds: string[];
  /** Идентификаторы счетов. */
  accountsIds: string[];
  /** Действие. */
  action: ACTION;
  /** Параметры формирования комплекта документов. */
  creationParams: ICreationParamsDto;
  /** Тип создания документа. */
  creationType: CREATION_TYPE;
  /** Дата начала периода запроса выписки. */
  dateFrom: string;
  /** Дата конца периода запроса выписки. */
  dateTo: string;
  /** Формат файла выписки. */
  format: FORMAT;
  /** Скрыть нулевые обороты. */
  hideEmptyTurnovers: boolean;
  /** Нац. Эквивалент. */
  nationalCurrency: boolean;
  /** Только документы выписки. */
  onlyStatementDocuments: boolean;
  /** Операции. */
  operations: OPERATIONS;
  /** Организации. */
  organizationIds: string[];
  /** С комплектом документов. */
  packageOfDocuments: boolean;
  /** Тип периода запроса выписки. */
  periodType: DATE_PERIODS;
  /** Проводки переоценки. */
  revaluationAccountingEntry: boolean;
  /** Признак того, что счета необходимо формировать отдельными файлами. */
  separateAccountsFiles: boolean;
  /** Признак того, необходимо ли подписывать выписку. */
  signNeeded: boolean;
  /** URL страницы, с которой был создан запрос. */
  sourcePage: string;
  /** Подразделения обслуживания. */
  subdivisionIds: string[];
  /** Итоги за день. */
  totalsOfDay: boolean;
  /** Тип запроса выписки. */
  type: TYPE;
  /** Данные устройства пользователя. */
  userDeviceInfo: IUserDeviceInfo;
}
