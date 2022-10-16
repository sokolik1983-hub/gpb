/** Ответ на запрос получения клиента. */
export interface IClientBankResponseDto {
  /** Наименование клиента. */
  name: string;
  /** ИНН клиента. */
  inn: string;
  /** Номер счета клиента. */
  accountNumber: string;
}
