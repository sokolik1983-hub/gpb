/** Выписка. */
export interface IStatement {
  /** Дата начала периода. */
  dateStart: string;
  /** Дата окончания периода. */
  dateEnd: string;
  /** Счёт выписки. */
  accountNumber: string;
  /** Имя организации. */
  organizationName: string;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Расход. */
  outcome: number;
  /** Количество проводок с расходом. */
  outcomeTransactions: number;
  /** Приход. */
  income: number;
  /** Количество проводок с приходом. */
  incomeTransactions: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
  /** Код валюты. */
  currencyCode: string;
}
