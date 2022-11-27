import type { FORMAT } from 'interfaces';

/** Запрос на создание отчетов. */
export interface CreateReportFileDto {
  /** Начало периода запроса. */
  dateFrom: string;
  /** Конец периода запроса. */
  dateTo: string;
  /** Формат. */
  format: FORMAT.EXCEL | FORMAT.PDF;
  /** Список id сущностей для печати. */
  ids: Array<{ accountNumber: string; balanceBranchCode: string; operationDate: string }>;
}
