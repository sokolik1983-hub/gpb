import type { Counterparty as CounterpartyCommon } from 'interfaces/common';

/** Контрагент. */
export interface Counterparty extends CounterpartyCommon {
  /** Номер счета контрагента. */
  accountNumber: string;
}
