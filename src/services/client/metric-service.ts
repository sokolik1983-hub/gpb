import type { IMetricDataDto } from 'interfaces/dto/metric';
import { request } from '@platform/services';

/** Сервис для сбора метрик. */
export const metricService = {
  /** Отправить порцию данных для метрики. */
  pushMetricData: (dto: IMetricDataDto): Promise<void> =>
    request({
      method: 'POST',
      data: dto,
      url: '/api/statement-client/metric',
    }).then(result => result.data),
};
