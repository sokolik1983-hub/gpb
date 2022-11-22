/** Набор фильтров ЭФ скроллера остатков и оборотов. */
export interface FilterValues {
  /** Начало периода. */
  dateFrom?: string;
  /** Конец периода. */
  dateTo?: string;
  /** Организации. */
  bankClientIds?: string[];
  /** Счета. */
  accountNumbers: string[];
}
