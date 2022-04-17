/** Сводная информация по выписке. */
export interface IStatementSummaryInfoResponseDto {
  /** Счёт, по которому формируется выписка. */
  accountNumber: string;
  /** Код валюты. */
  currencyCode: string;
  /** Дата начала периода, по которому формируется выписка. */
  dateFrom: string;
  /** Дата окончания периода, по которому формируется выписка. */
  dateTo: string;
  /** Приход. */
  income: number;
  /** Количество проводок с приходом. */
  incomesCount: number;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Наименование организации. */
  organizationName: string;
  /** Расход. */
  outcome: number;
  /** Количество проводок с расходом. */
  outcomesCount: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
}
