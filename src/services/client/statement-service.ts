import type {
  IExpandedCollectionResponse,
  IScrollerResponseDto,
  ICreateAttachmentResponse,
  FieldsRequired,
  IExpandedScrollerResponceDto,
} from 'interfaces';
import type { IStatementHistoryRow, IStatementTransactionRow, IStatement, IStatementScheduleRow } from 'interfaces/client';
import type { Counterparty } from 'interfaces/common';
import type {
  IGetDatePeriodResponseDto,
  IGetDatePeriodRequestDto,
  IGetTurnoversResponseDto,
  IGetTurnoversRequestDto,
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
import type { StatementAttachmentStatusDto } from 'interfaces/dto/statement-attachment-status-dto';
import { scheduleRequestHistory } from 'mocks/shedule-request-history';
import { scheduleStatements } from 'mocks/shedule-statements';
import { getTestData } from 'utils/client/get-test-data';
import type { ICollectionResponse, IServerResp } from '@platform/services';
import { request, metadataToRequestParams, AUTH_REQUEST_CONFIG } from '@platform/services';
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
    request<IServerDataResp<IScrollerResponseDto<IStatementHistoryRow>>>({
      url: `${STATEMENT_REQUEST_URL}/get-page`,
      method: 'POST',
      data: metadataToRequestParams(metaData),
    }).then(res => ({
      data: res.data.data.page,
      total: res.data.data.size,
    })),
  /** Возвращает список выписок для скроллера выписок по расписанию. */
  getScheduleList: (metaData: IMetaData): Promise<any> =>
    request<IServerDataResp<IScrollerResponseDto<IStatementScheduleRow>>>({
      url: `${STATEMENT_REQUEST_URL}/get-page`,
      method: 'POST',
      data: metadataToRequestParams(metaData),
    }).then(res => ({
      data: getTestData(scheduleStatements),
      total: res.data.data.size,
    })),
  /** Возвращает список контрагентов. */
  getCounterparties: (id: string): Promise<Counterparty[]> =>
    request<IServerDataResp<Counterparty[]>>({
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
      headers: AUTH_REQUEST_CONFIG.headers,
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
      headers: AUTH_REQUEST_CONFIG.headers,
    }).then(r => r.data),
  /** Получить сущность "Запрос выписки". */
  getStatementRequest: (id: string): Promise<IServerDataResp<ILatestStatementDto>> =>
    request<IServerDataResp<ILatestStatementDto>>({
      url: `${STATEMENT_REQUEST_URL}/${id}`,
      headers: AUTH_REQUEST_CONFIG.headers,
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
  /** Возвращает Id файла для экспорта и токен по Id запроса выписки для дальнейшей загрузки через file storage. */
  exportStatement: async (id: string) => {
    const { data: resp } = await request({
      url: `${STATEMENT_URL}/generate-download-token/${id}`,
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
      headers: AUTH_REQUEST_CONFIG.headers,
    });

    return resp.data;
  },
  /** Методы для асинхронной работы с вложениями. */
  createAttachmentAsync: {
    /** Асинхронно сформировать запрос для экспорта или печати. */
    createAttachment: async (data: ICreateAttachmentRequestDto) =>
      request<IServerResp<string>>({
        url: `${STATEMENT_URL}/create-attachment/create-attachment`,
        method: 'POST',
        data,
        headers: AUTH_REQUEST_CONFIG.headers,
      }).then(r => r.data),
    /** Получить статус запроса для экспорта или печати. */
    getStatus: (id: string) =>
      request<IServerResp<StatementAttachmentStatusDto>>({
        url: `${STATEMENT_URL}/create-attachment/get-status/${id}`,
      }).then(r => r.data),
    /** Возвращает Id файла и токен для экспорта или печатипо Id запроса выписки для дальнейшей загрузки через file storage. */
    generateTokenAndFileId: async (id: string) =>
      request<IServerResp<{ token: string; fileId: string }>>({
        url: `${STATEMENT_URL}/create-attachment/generate-download-token/${id}`,
      }).then(r => r.data),
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
  /** Возвращает список выписок для скроллера истории запросов параметров заявки. */
  getScheduleRequestList: (metaData: IMetaData): Promise<any> =>
    request<IServerDataResp<IScrollerResponseDto<IStatementScheduleRow>>>({
      url: `${STATEMENT_REQUEST_URL}/get-page`,
      method: 'POST',
      data: metadataToRequestParams(metaData),
    }).then(() => ({
      data: getTestData(scheduleRequestHistory),
      total: 2,
    })),
};
