import type { IBaseEntity } from '@platform/services/admin';

/** Дто ответа сервера по сверке остатков/оборотов. */
export interface ReconciliationTurnoverDto extends IBaseEntity {
  /** Номер счета. */
  accountNumber: string;
  /** Код валюты. */
  currencyCode: string;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Операционная дата. */
  operationDate: string;
  /** Исходящий остаток. */
  outgoingBalance: number;
  /** Дата сверки. */
  reconciliationDate: string;
  /** Источник записи. */
  recordSource: string;
  /** Статус сверки. */
  status: string;
  /** Обороты по кредиту (Приход). */
  turnoverCredit: number;
  /** Обороты по дебету (Расход). */
  turnoverDebit: number;
}

/** Сверка остатков/оборотов в строке таблицы. */
export interface ReconciliationTurnoverRow extends Omit<ReconciliationTurnoverDto, 'reconciliationDate'> {
  /** Дата сверки. */
  reconciliationDate: {
    /** Дата. */
    date: string;
    /** Время. */
    time: string;
  };
}