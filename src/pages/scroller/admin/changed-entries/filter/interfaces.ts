import type { TRANSACTION_TYPES } from 'interfaces';
import type { CHANGED_ENTRY_STATUSES } from 'interfaces/changed-entry-statuses';

/** Стейт формы фильтрации. */
export interface IFormState {
  /** Дата. */
  textSearch?: string;
  /** Сумма от. */
  amountFrom?: string;
  /** Сумма по. */
  amountTo?: string;
  /** Контрагенты. */
  counterparty?: string[];
  /** Счета контрагентов. */
  counterpartyAccountNumber?: string[];
  /** Клиенты. */
  client?: string[];
  /** Счета клиентов. */
  clientAccountNumber?: string[];
  /** Номер документа. */
  documentNumber?: string;
  /** Дата платежа. */
  paymentDate?: string;
  /** Дата платежа с. */
  paymentDateFrom?: string;
  /** Дата платежа по. */
  paymentDateTo?: string;
  /** Тип операции. */
  transactionType?: TRANSACTION_TYPES;
  /** Статус проводки. */
  status?: CHANGED_ENTRY_STATUSES;
  /** Источник вызова ЭФ Банка "Журнал проводок удаленных/добавленных". */
  source?: string;
}
