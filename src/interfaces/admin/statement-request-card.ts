import type { DATE_PERIODS, OPERATIONS, FORMAT } from 'interfaces';
import type { StatementAccount } from 'interfaces/admin/account';
import type { AccountOrganization } from 'interfaces/admin/organization';

/** Параметры формирования комплекта документов. */
interface DocumentOptions {
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
export interface StatementRequestCard {
  /** Номера счетов. */
  accounts: StatementAccount[];
  /** Параметры формирования комплекта документов. */
  documentOptionsDto: DocumentOptions;
  /** Формат выписки. */
  format: FORMAT;
  /** Скрыть нулевые обороты. */
  hideEmptyTurnovers: boolean;
  /** Нац. Эквивалент. */
  nationalCurrency: boolean;
  /** Только документы выписки. */
  onlyStatementDocuments: boolean;
  /** Операции. */
  operations: OPERATIONS;
  /** С комплектом документов. */
  packageOfDocuments: boolean;
  /** Конец периода. */
  periodEnd: string;
  /** Начало периода. */
  periodStart: string;
  /** Тип периода. */
  periodType: DATE_PERIODS;
  /** Проводки переоценки. */
  revaluationAccountingEntry: boolean;
  /** Отдельный файл по каждому счету. */
  separateAccountsFiles: boolean;
  /** Признак того, необходимо ли подписывать выписку. */
  signNeeded: boolean;
  /** Итоги за день. */
  totalsOfDay: boolean;
}

/** Расширенные свойства карточки запроса выписки. */
export interface ExtendedStatementRequestCard extends StatementRequestCard {
  /** Организации. */
  organizations: AccountOrganization[];
}
