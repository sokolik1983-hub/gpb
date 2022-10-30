import type { AccountOrganization } from 'interfaces/admin';
import type { CurrencyCard } from 'interfaces/admin/dto/currency-card';

/** Счет. */
interface Account {
  /** Организация. */
  bankClient: AccountOrganization;
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
  /** Код валюты. */
  currencyCode: string;
}

/** Сводная информация по выписке. */
export interface StatementSummary {
  /** Номера счетов. */
  accountNumbers: string[];
  /** Суммарный оборот сгруппированный по валюте. */
  currencyGroups: TotalTurnover[];
  /** Общее количество поступлений. */
  incomingCount: number;
  /** Название организаций. */
  organizationNames: string[];
  /** Общее количество списаний. */
  outgoingCount: number;
  /** Данные выписки. */
  statement: Statement;
}
