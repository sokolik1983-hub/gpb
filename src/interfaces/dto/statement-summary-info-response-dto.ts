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
  /** Приход в национальном эквиваленте. */
  incomeNatCurr: number;
  /** Количество проводок с приходом. */
  incomesCount: number;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Входящий остаток в национальном эквиваленте. */
  incomingBalanceNatCurr: number;
  /** Наименование организации. */
  organizationName: string;
  /** Расход. */
  outcome: number;
  /** Расход в национальном эквиваленте. */
  outcomeNatCurr: number;
  /** Количество проводок с расходом. */
  outcomesCount: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
  /** Исходящий остаток в национальном эквиваленте. */
  outgoingBalanceNatCurr: number;
  /** Признак выписки с рублевым эквивалентом. */
  nationalCurrency: boolean;
}
