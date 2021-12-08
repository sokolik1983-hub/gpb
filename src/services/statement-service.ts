import type {
  IGetDatePeriodResponseDto,
  IGetDatePeriodRequestDto,
  IGetTurnoversResponseDto,
  IGetTurnoversRequestDto,
  IStatementHistoryRow,
} from 'interfaces/client';
import { statementHistoryResponce } from 'mocks';
import type { ICollectionResponse } from '@platform/services';
import { request } from '@platform/services';
import type { IServerDataResp, IMetaData } from '@platform/services/client';

const BASE_URL = '/api/statement-client';
const STATEMENT_URL = `${BASE_URL}/statement`;

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
      url: `${STATEMENT_URL}/support/calculate-period`,
    }).then(result => result.data.data),
  /** Возвращает обороты по счетам. */
  getTurnovers: (data: IGetTurnoversRequestDto): Promise<IGetTurnoversResponseDto> =>
    request<IServerDataResp<IGetTurnoversResponseDto>>({
      method: 'POST',
      data: { data },
      url: `${STATEMENT_URL}/get-turnovers`,
    }).then(result => result.data.data),
  /** Возвращает список выписок для скроллера истории запросов. */
  // TODO: заглушка. Удалить при подключени реста
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStatementList: (metaData: IMetaData): Promise<ICollectionResponse<IStatementHistoryRow>> =>
    new Promise<ICollectionResponse<IStatementHistoryRow>>(resolve => {
      setTimeout(() => {
        resolve({
          data: statementHistoryResponce,
          total: 100,
        });
      }, 500);
    }),
};
