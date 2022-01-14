import type {
  IGetDatePeriodResponseDto,
  IGetDatePeriodRequestDto,
  IGetTurnoversResponseDto,
  IGetTurnoversRequestDto,
  IStatementHistoryRow,
  IGetCounterpartiesResponseDto,
  IStatementTransactionRow,
  ILatestStatementDto,
  IStatementSummaryInfo,
  IStatement,
  IGetStatusResponceDto,
  ICreateRequestStatementDto,
} from 'interfaces/client';
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
 * @see http://api-gateway.sandbox.gboteam.ru/statement-client/swagger-ui.html
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
  getCounterparties: (id: string): Promise<IGetCounterpartiesResponseDto[]> =>
    request<IServerDataResp<IGetCounterpartiesResponseDto[]>>({
      url: `${STATEMENT_URL}/get-counterparties/${id}`,
    }).then(r => r.data.data),
  /** Возвращает список проводок. */
  getTransactionList: (metaData: IMetaData, statementId: string): Promise<ICollectionResponse<IStatementTransactionRow>> =>
    request({
      url: `${STATEMENT_URL}/get-accounting-entry`,
      method: 'POST',
      data: { ...metadataToRequestParams(metaData), statementId },
    }).then(res => ({
      data: res.data.data.page,
      total: res.data.data.size,
    })),
  /** Возвращает сводную информацию по выписке. */
  getStatementSummaryInfo: (id: string): Promise<IStatementSummaryInfo> =>
    request<IServerDataResp<IStatementSummaryInfo>>({
      url: `${STATEMENT_URL}/summary/${id}`,
    }).then(r => r.data.data),
  /** Возвращает выписку по id запроса выписки. */
  getStatementByStatementRequestId: (id: string): Promise<IServerDataResp<IStatement>> =>
    request<IServerDataResp<IStatement>>({
      url: `${STATEMENT_URL}/by-statement-request-id/${id}`,
    }).then(r => r.data),
  /** Создать запрос выписки. */
  createStatement: (data: ICreateRequestStatementDto): Promise<IServerDataResp<string>> =>
    request<IServerDataResp<string>>({
      url: `${STATEMENT_REQUEST_URL}`,
      method: 'POST',
      data: { data },
    }).then(r => r.data),
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
  getStatus: (id: string): Promise<IServerDataResp<IGetStatusResponceDto>> =>
    request<IServerDataResp<IGetStatusResponceDto>>({
      url: `${STATEMENT_REQUEST_URL}/get-status`,
      method: 'POST',
      data: { data: { id } },
    }).then(r => r.data),
};
