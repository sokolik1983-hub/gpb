import type { DATE_PERIODS, OPERATIONS, FORMAT } from 'interfaces';

/** Параметры формирования комплекта документов. */
export interface IDocumentOptionsDto {
  /** Кредитовые документы основания. */
  includeCreditOrders: boolean;
  /** Кредитовые документы выписки. */
  includeCreditStatements: boolean;
  /** Дебетовые документы основания. */
  includeDebitOrders: boolean;
  /** Дебетовые документы выписки. */
  includeDebitStatements: boolean;
  /** Документы отдельными файлами. */
  separateDocumentsFiles: boolean;
}

/** Карточка запроса выписки. */
export interface IStatementRequestCardDto {
  /** Номера счетов. */
  accountNumbers: string[];
  /** Только документы выписки. */
  onlyStatementDocuments: boolean;
  /** С комплектом документов. */
  packageOfDocuments: boolean;
  /** Дата запроса. */
  createdAt: string;
  /** Операции. */
  operations: OPERATIONS;
  /** Наименование организаций. */
  organizations: string[];
  /** "Дата по" которая запрашивалась в выписке. */
  periodEnd: string;
  /** "Дата с" которая запрашивалась в выписке. */
  periodStart: string;
  /** Тип периода. */
  periodType: DATE_PERIODS;
  /** Формат выписки. */
  format: FORMAT;
  /** Параметры формирования комплекта документов. */
  documentOptionsDto: IDocumentOptionsDto;
  /** Отдельный файл по каждому счету. */
  separateAccountsFiles: boolean;
  /** Признак того, необходимо ли подписывать выписку. */
  signNeeded: boolean;
  /** Скрыть нулевые обороты. */
  hideEmptyTurnovers: boolean;
  /** Итоги за день. */
  totalsOfDay: boolean;
  /** Рублёвый эквивалент. */
  nationalCurrency: boolean;
  /** Проводки переоценки. */
  revaluationAccountingEntry: boolean;
}
