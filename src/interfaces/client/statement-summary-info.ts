/** Сводная информация по выписке. */
export interface IStatementSummaryInfo {
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
