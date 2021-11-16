import type { IGetDatePeriodResponseDto, IGetDatePeriodRequestDto } from 'interfaces/client';
import type { IServerDataResp } from '@platform/services/client';
import { request } from '@platform/services/client';

const STATEMENT_BASE_URL = '/api/statement-client';

/**
 * Сервис выписок клиента.
 *
 * @see {@link http://api-gateway.sandbox.gboteam.ru/statement-client/swagger-ui.html}
 */
export const statementService = {
  /** Возвращает временной период. */
  getDatePeriod: (data: IGetDatePeriodRequestDto): Promise<IGetDatePeriodResponseDto> =>
    request<IServerDataResp<IGetDatePeriodResponseDto>>({
      method: 'POST',
      data: { data },
      url: `${STATEMENT_BASE_URL}/calculate-period`,
    }).then(result => result.data.data),
};
