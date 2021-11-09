/** ДТО запроса создания выписки. */
export interface ICreateStatementDto {
  // TODO: уточнить после готовности реста создания выписки.
  /** Выбранные счета клиента. */
  selectedAccounts: string[];
}
