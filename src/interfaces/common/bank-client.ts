/** Клиент банка. */
export interface BankClient {
  /** Номер счета. */
  accountNumber: string;
  /** ИНН клиента. */
  inn: string;
  /** Наименование клиента. */
  name: string;
}
