import type { DATE_PERIODS, STATEMENT_REQUEST_STATUSES, OPERATIONS, ACTION, FORMAT } from 'interfaces';

/** DTO для поиска последнего запроса выписки у текущего пользователя. */
export interface ILatestStatementDto {
  /** Идентификатор запроса выписки. */
  id: string;
  /** Номера счетов. */
  accountNumbers: string[];
  /** ID счетов. */
  accountsIds: string[];
  /** Тип действия. */
  statementActionDto: ACTION;
  /** Дата запроса. */
  createdAt: string;
  /** Наименование организаций. */
  organizationNames: string[];
  /** "Дата по" которая запрашивалась в выписке. */
  periodEnd: string;
  /** "Дата с" которая запрашивалась в выписке. */
  periodStart: string;
  /** Тип периода. */
  periodType: DATE_PERIODS;
  /** Формат выписки. */
  statementFormat: FORMAT;
  /** Статус запроса выписки. */
  status: STATEMENT_REQUEST_STATUSES;
  /** Комментарий для клиента. */
  commentForClient?: string;
  /** Параметры формирования комплекта документов. */
  documentOptionsDto: {
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
  };
  /** Отдельный файл по каждому счету. */
  separateAccountsFiles: boolean;
  /** Признак того, необходимо ли подписывать выписку. */
  signNeeded: boolean;
  /** Операции. */
  statementOperationDto: OPERATIONS;
  /** Скрыть нулевые обороты. */
  hideEmptyTurnovers: boolean;
  /** Итоги за день. */
  totalsOfDay: boolean;
  /** Рублёвый эквивалент. */
  nationalCurrency: boolean;
  /** Проводки переоценки. */
  revaluationAccountingEntry: boolean;
}
