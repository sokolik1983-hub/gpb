import type { DATE_PERIODS } from 'interfaces';

/** ДТО запроса периода. */
export interface IGetDatePeriodRequestDto {
  /** Тип периода. */
  periodType: Exclude<DATE_PERIODS, DATE_PERIODS.SELECT_PERIOD | DATE_PERIODS.TODAY | DATE_PERIODS.YESTERDAY>;
}

/** ДТО ответа запроса периода. */
export interface IGetDatePeriodResponseDto {
  /** Начальная дата периода, по которому запрашивается выписка. */
  dateFrom: string;
  /** Конечная дата периода, по которому запрашивается выписка. */
  dateTo: string;
}
