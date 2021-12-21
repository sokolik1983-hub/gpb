import type { DATE_PERIODS } from 'interfaces';

/** Допустимые значения типа периода для запроса актуальных дат. */
export type RequestPeriodType =  Exclude<DATE_PERIODS, DATE_PERIODS.SELECT_PERIOD>;

/** ДТО запроса периода. */
export interface IGetDatePeriodRequestDto {
  /** Тип периода. */
  periodType: RequestPeriodType;
}

/** ДТО ответа запроса периода. */
export interface IGetDatePeriodResponseDto {
  /** Начальная дата периода, по которому запрашивается выписка. */
  dateFrom: string;
  /** Конечная дата периода, по которому запрашивается выписка. */
  dateTo: string;
}
