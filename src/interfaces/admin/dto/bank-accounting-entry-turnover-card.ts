import type { CHANGED_ENTRY_STATUSES } from 'interfaces/changed-entry-statuses';
import type { IBaseEntity } from '@platform/services';
import type { BankAccountingEntryAccount } from './bank-accounting-entry-account';

/** Карточка бухгалтерской проводки с данными оборота для ‘bank’ модуля. */
export interface BankAccountingEntryTurnoverCard extends IBaseEntity {
  /** Счет бухгалтерской проводки для ‘bank’ модуля. */
  account: BankAccountingEntryAccount;
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
  /** Признак удаления. */
  deleted: CHANGED_ENTRY_STATUSES;
}
