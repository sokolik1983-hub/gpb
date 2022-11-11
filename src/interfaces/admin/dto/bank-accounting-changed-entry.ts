import type { CHANGED_ENTRY_STATUSES } from 'interfaces/changed-entry-statuses';
import type { IBaseEntity } from '@platform/services';

/** Карточка добавленной/удалённой бухгалтерской проводки для ‘bank’ модуля. */
export interface BankAccountingChangedEntry extends IBaseEntity {
  /** Сумма по кредиту. */
  amountByCredit: number;
  /** Сумма по дебету. */
  amountByDebit: number;
  /** Номер счета контрагента. */
  counterpartyAccountNumber: string;
  /** Наименование контрагента. */
  counterpartyName: string;
  /** Признак дебетования. */
  debitSign: boolean;
  /** Дата документа. */
  documentDate: string;
  /** Номер документа. */
  documentNumber: number;
  /** Дата проводки (операции). */
  entryDate: string;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
  /** Назначение платежа. */
  paymentPurpose: string;
  /** Обороты по кредиту. */
  turnoverByCredit: number;
  /** Обороты по дебету. */
  turnoverByDebit: number;
  /** Цифровой код валюты по дебету. */
  currencyNumericCodeByDebit: string;
  /** Цифровой код валюты по кредиту. */
  currencyNumericCodeByCredit: string;
  /** Номер счета клиента банка. */
  bankClientAccountNumber: string;
  /** Наименование клиента банка. */
  bankClientName: string;
  /** Состояние проводки. */
  status: CHANGED_ENTRY_STATUSES;
}
