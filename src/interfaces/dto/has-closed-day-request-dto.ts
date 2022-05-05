/** ДТО запроса для проверки на закрытый день. */
export interface IHasClosedDayRequestDto {
  /** Коды филиалов РКО Ф1. */
  absNumbers: string[];
  /** Завершение периода. */
  dateTo: string;
}
