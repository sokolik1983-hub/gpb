import type {
  IGetDatePeriodResponseDto,
  IGetDatePeriodRequestDto,
  IGetTurnoversResponseDto,
  IGetTurnoversRequestDto,
  IStatementHistoryRow,
  IGetCounterpartiesResponseDto,
} from 'interfaces/client';
import type { ILatestStatementDto } from 'interfaces/client/latest-statement-dto';
import type { IRequestStatementDto } from 'interfaces/client/request-statement-dto';
import { counterparty } from 'mocks/counterparty';
import type { ICollectionResponse } from '@platform/services';
import { request, metadataToRequestParams } from '@platform/services';
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
  getStatementList: (metaData: IMetaData): Promise<ICollectionResponse<IStatementHistoryRow>> =>
    request({
      url: `${STATEMENT_URL}/get-page`,
      method: 'POST',
      data: metadataToRequestParams(metaData),
    }).then(res => ({
      data: res.data.data.page,
      total: res.data.data.size,
    })),
  /** Возвращает список контрагентов. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCounterparties(statementId: string): Promise<IGetCounterpartiesResponseDto[]> {
    // TODO: Заглушка удалить при подключении реста
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(counterparty);
      }, 300);
    });
  },
  /** Создать запрос выписки. */
  createStatement: (data: IRequestStatementDto): Promise<IRequestStatementDto> =>
    request({
      url: `${STATEMENT_URL}/statement`,
      method: 'POST',
      data,
    }).then(r => r.data.data),
  /** Найти последний запрос выписки у текущего пользователя. */
  findLatest: (): Promise<ILatestStatementDto> =>
    request({
      url: `${STATEMENT_URL}/find-latest`,
    }).then(r => r.data.data),
};
