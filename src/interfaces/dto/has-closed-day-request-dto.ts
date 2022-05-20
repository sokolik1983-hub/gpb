/** ДТО запроса для проверки на закрытый день. */
export interface IHasClosedDayRequestDto {
  /** Идентификаторы счетов. */
  accountIds?: string[];
  /** Завершение периода. */
  dateTo?: string;
  /** Идентификатор выписки. */
  statementId?: string;
}
