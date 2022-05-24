import type {
  IExpandedCollectionResponse,
  IScrollerResponceDto,
  ICreateAttachmentResponse,
  FieldsRequired,
  IExpandedScrollerResponceDto,
} from 'interfaces';
import type { IStatementHistoryRow, IStatementTransactionRow, IStatement } from 'interfaces/client';
import type {
  IGetDatePeriodResponseDto,
  IGetDatePeriodRequestDto,
  IGetTurnoversResponseDto,
  IGetTurnoversRequestDto,
  IGetCounterpartiesResponseDto,
  IGetStatusResponceDto,
  IGetTransactionCardResponseDto,
  ICreateRequestStatementDto,
  IStatementSummaryInfoRequestDto,
  IGetTransactionCardRequestDto,
  ILatestStatementDto,
  IGetStatementRelevanceStatus,
  IStatementSummaryInfoResponseDto,
  ICreateAttachmentRequestDto,
  IGetAccountsResponseDto,
} from 'interfaces/dto';
import type { IHasClosedDayRequestDto } from 'interfaces/dto/has-closed-day-request-dto';
import type { ICollectionResponse } from '@platform/services';
import { request, metadataToRequestParams } from '@platform/services';
import type { IServerDataResp, IMetaData } from '@platform/services/client';

/** Базовый URL сервиса "Выписки". */
const BASE_URL = '/api/statement-client';

/** Базовый URL для рестов сущности "Проводка". */
const TRANSACTION_URL = `${BASE_URL}/entry`;

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
    request<IServerDataResp<IScrollerResponceDto<IStatementHistoryRow>>>({
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
  getTransactionList: (metaData: IMetaData, statementId: string): Promise<IExpandedCollectionResponse<IStatementTransactionRow>> =>
    request<IServerDataResp<IExpandedScrollerResponceDto<IStatementTransactionRow>>>({
      url: `${STATEMENT_URL}/get-accounting-entry`,
      method: 'POST',
      data: { ...metadataToRequestParams(metaData), statementId },
    })
      .then(res => {
        const {
          data: {
            totalCount,
            page: { page, size },
          },
        } = res.data;

        return {
          data: page,
          total: size,
          totalCount,
          status: res.status,
        };
      })
      .catch(err => {
        const { status } = err.response;

        return {
          data: [],
          total: 0,
          totalCount: 0,
          status,
        };
      }),
  /** Возвращает сводную информацию по выписке. */
  getStatementSummaryInfo: (data: IStatementSummaryInfoRequestDto): Promise<IStatementSummaryInfoResponseDto> =>
    request<IServerDataResp<IStatementSummaryInfoResponseDto>>({
      method: 'POST',
      url: `${STATEMENT_URL}/summary`,
      data,
    }).then(r => r.data.data),
  /** Возвращает выписку по id запроса выписки. */
  getStatementByStatementRequestId: (id: string): Promise<IServerDataResp<IStatement>> =>
    request<IServerDataResp<IStatement>>({
      url: `${STATEMENT_URL}/by-statement-request-id/${id}`,
    }).then(r => r.data),
  /** Создать запрос выписки. */
  createStatement: (data: FieldsRequired<ICreateRequestStatementDto, 'userDeviceInfo'>): Promise<IServerDataResp<string>> =>
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
  /** Возвращает проводку. */
  getTransaction: (data: IGetTransactionCardRequestDto): Promise<IServerDataResp<IGetTransactionCardResponseDto>> =>
    request<IServerDataResp<IGetTransactionCardResponseDto>>({
      method: 'POST',
      data,
      url: `${TRANSACTION_URL}`,
    }).then(r => r.data),
  /** Возвращает файл для экспорта по Id запроса выписки. */
  exportStatement: async (id: string): Promise<ICreateAttachmentResponse> => {
    const { data: resp } = await request({
      url: `${STATEMENT_URL}/attachment/${id}`,
    });

    return resp.data;
  },
  /** Возвращает файл для печати по Id запроса выписки. */
  printStatement: async (id: string): Promise<ICreateAttachmentResponse> => {
    const { data: resp } = await request({
      url: `${STATEMENT_URL}/print/${id}`,
    });

    return resp.data;
  },
  /** Формирует вложения для печати / экспорта. */
  createAttachment: async (data: ICreateAttachmentRequestDto): Promise<ICreateAttachmentResponse> => {
    const { data: resp } = await request({
      url: `${STATEMENT_URL}/create-attachment`,
      method: 'POST',
      data,
    });

    return resp.data;
  },
  /** Получить статус актуальности выписки. */
  getStatementRelevanceStatus: (statementRequestId: string): Promise<IServerDataResp<IGetStatementRelevanceStatus>> =>
    request({
      url: `${STATEMENT_URL}/get-status/${statementRequestId}`,
    }).then(r => r.data),
  /** Возвращает счета пользователя для формирования выписок. */
  getAccounts: (): Promise<IGetAccountsResponseDto[]> =>
    request<IServerDataResp<IGetAccountsResponseDto[]>>({
      url: `${SUPPORT_STATEMENT_URL}/search-user-account-for-statement`,
    }).then(result => result.data.data),
  /** Проверить на закрытый день. */
  hasClosedDay: (dto: IHasClosedDayRequestDto): Promise<boolean> =>
    request<IServerDataResp<boolean>>({
      url: `${SUPPORT_STATEMENT_URL}/has-closed-day`,
      method: 'POST',
      data: dto,
    }).then(x => x.data.data),
};
