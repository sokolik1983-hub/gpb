import type { BankClientCard } from 'interfaces/admin/dto/bank-client-card';
import type { CurrencyCard } from 'interfaces/admin/dto/currency-card';

/** Счет. */
interface Account {
  /** Организация. */
  bankClient: BankClientCard;
  /** Данные валюты. */
  currency: CurrencyCard;
  /** Идентификатор. */
  id: string;
  /** Номер. */
  number: string;
}

/** Суммы оборотов. */
interface TurnoverAmounts {
  /** Входящий остаток. */
  incomingBalance: number;
  /** Количество поступлений. */
  incomingCount: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
  /** Количество списаний. */
  outgoingCount: number;
  /** Обороты по кредиту (Приход). */
  turnoverCredit: number;
  /** Обороты по дебету (Расход). */
  turnoverDebit: number;
}

/** Суммарный оборот сгруппированный по валюте. */
interface CurrencyGroup extends TurnoverAmounts {
  /** Список счетов. */
  accounts: Account[];
  /** Данные валюты. */
  currency: CurrencyCard;
}

/** Данные выписки. */
interface Statement {
  /** Дата начала интервала выписки. */
  dateFrom: string;
  /** Дата окончания интервала выписки. */
  dateTo: string;
  /** Идентификатор. */
  id: string;
}

/** Дто ответа список суммарных оборотов сгруппированных по валюте. */
export interface TotalTurnoverGroupedByCurrencyResponseDto {
  /** Список групп. */
  groups: CurrencyGroup[];
  /** Данные выписки. */
  statement: Statement;
}

/** Суммарные остатки и обороты.  */
export interface TotalTurnover extends TurnoverAmounts {
  /** Номера счетов. */
  accountNumbers: string[];
  /** Код валюты. */
  currencyCode: string;
  /** Название организаций. */
  organizationNames: string[];
  /** Данные выписки. */
  statement: Statement;
}

/** Сводная информация по выписке. */
export interface StatementSummary {
  /** Группы по валютам. */
  groups: TotalTurnover[];
  /** Данные выписки. */
  statement: Statement;
}
