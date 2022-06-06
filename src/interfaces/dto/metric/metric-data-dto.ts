import type { METRIC_ACTION } from './metric-action';

/** Порция данных для накопления метрики по сервису. */
export interface IMetricDataDto {
  /** Действие, которое фиксируется в метрике. */
  tag: METRIC_ACTION;
  /** URL текущей страницы. */
  sourcePage: string;
  /** URL страница, с которой перещли на текущую (referer). */
  refererPage?: string;
  /** Параметры запроса к АПИ. */
  requestBody?: string;
  /** URL АПИ с запросом, который выполняется после отправки данных для снятия метрики. */
  url: string;
}
