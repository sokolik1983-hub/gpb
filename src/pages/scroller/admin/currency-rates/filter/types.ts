/** Свойства полей формы фильтрации справочника курсов валют. */
export interface FilterValues {
  /** Буквенный код валюты. */
  currencyCode: string;
  /** Начало периода. */
  dateFrom: string;
  /** Конец периода. */
  dateTo: string;
}
