import type { STATEMENT_STATUSES } from 'interfaces';
import type {
  IGetDatePeriodResponseDto,
  IGetDatePeriodRequestDto,
  IGetTurnoversResponseDto,
  IGetTurnoversRequestDto,
  IStatementHistoryRow,
  IGetCounterpartiesResponseDto,
  IStatementTransactionRow,
} from 'interfaces/client';
import type { ILatestStatementDto } from 'interfaces/client/latest-statement-dto';
import type { IRequestStatementDto } from 'interfaces/client/request-statement-dto';
import type { IStatement } from 'interfaces/client/statement';
import { counterparty } from 'mocks/counterparty';
import { statement } from 'mocks/statement';
import { transactions } from 'mocks/transactions';
import type { ICollectionResponse } from '@platform/services';
import { request, metadataToRequestParams } from '@platform/services';
import type { IServerDataResp, IMetaData } from '@platform/services/client';

/** Базовый URL сервиса "Выписки". */
const BASE_URL = '/api/statement-client';

/** Базовый URL для рестов сущности "Выписки". */
const STATEMENT_URL = `${BASE_URL}/statement`;

/** Базовый URL для вспомогательных рестов сервиса "Выписки". */
const SUPPORT_STATEMENT_URL = `${STATEMENT_URL}/support`;

/** Базовый URL для рестов сущности "Запрос выписки". */
const STATEMENT_REQUEST_URL = `${STATEMENT_URL}/request`;

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
      url: `${SUPPORT_STATEMENT_URL}/calculate-period`,
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
      url: `${STATEMENT_REQUEST_URL}/get-page`,
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
  /** Возвращает список проводок. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTransactionList: (metaData: IMetaData): Promise<ICollectionResponse<IStatementTransactionRow>> =>
    // TODO: Заглушка удалить при подключении реста
    new Promise(resolve => {
      setTimeout(() => {
        const { pageSize, offset } = metaData;

        const out = transactions.slice(offset, offset + pageSize);

        resolve({
          data: out,
          total: transactions.length,
        });
      }, 500);
    }),
  /** Возвращает выписку. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStatement: (statementId: string): Promise<IStatement> =>
    // TODO: Заглушка удалить при подключении реста
    new Promise(resolve => {
      setTimeout(() => {
        resolve(statement);
      }, 0);
    }),
  /** Создать запрос выписки. */
  createStatement: (data: IRequestStatementDto): Promise<string> =>
    request({
      url: `${STATEMENT_REQUEST_URL}`,
      method: 'POST',
      data: { data },
    }).then(r => r.data.data),
  /** Получить сущность "Запрос выписки". */
  getStatementRequest: (id: string): Promise<IServerDataResp<ILatestStatementDto>> =>
    request<IServerDataResp<ILatestStatementDto>>({
      url: `${STATEMENT_REQUEST_URL}/${id}`,
    }).then(r => r.data),
  /** Получить последний запрос выписки у текущего пользователя. */
  getLatestStatementRequest: (): Promise<IServerDataResp<ILatestStatementDto>> =>
    request<IServerDataResp<ILatestStatementDto>>({
      url: `${STATEMENT_REQUEST_URL}/find-latest`,
    }).then(r => r.data),
  /** Получить статус Запроса выписки. */
  getStatus: (id: string): Promise<{ status: STATEMENT_STATUSES }> =>
    request({
      url: `${STATEMENT_REQUEST_URL}/get-status`,
      method: 'POST',
      data: { data: { id } },
    }).then(r => r.data.data),
};
