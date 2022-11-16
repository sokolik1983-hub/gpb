import type { ServerResponseList, ServerResponseData, ServerResponsePage, ScrollerResponseDto, IScrollerResponseDto } from 'interfaces';
import { FORMAT } from 'interfaces';
import type {
  Account,
  Branch,
  ClientUserDto,
  ClosedDayResponseDto,
  ClosedDayRow,
  Counterparty,
  CreateStatementAttachmentRequestDto,
  Currency,
  CurrencyRateDto,
  CurrencyRateRow,
  StatementHistoryRow,
  StatementHistoryResponseDto,
  IFileDataResponse,
  Organization,
  ReconciliationTurnoverDto,
  ReconciliationTurnoverRow,
  ServiceBranch,
  StatementRequestCard,
  StatementSummary,
  TotalTurnoverGroupedByCurrencyResponseDto,
  User,
} from 'interfaces/admin';
import type { BankAccountingChangedEntry } from 'interfaces/admin/dto/bank-accounting-changed-entry';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import type { BankAccountingEntryGroup } from 'interfaces/admin/dto/bank-accounting-entry-group';
import type { ITurnoverMockDto } from 'interfaces/admin/dto/turnover-mock-dto';
import type { BankClient } from 'interfaces/common';
import type { IGetTransactionCardResponseDto, IGetDatePeriodRequestDto, IGetDatePeriodResponseDto } from 'interfaces/dto';
import type { UserRequestDto } from 'interfaces/dto/admin';
import type { IHasClosedDayRequestDto } from 'interfaces/dto/has-closed-day-request-dto';
import type { GROUP_BY } from 'pages/scroller/admin/entries-scroller/constants';
import {
  mapDtoToViewForAccountList,
  mapDtoToViewForClosedDays,
  mapDtoToViewForCurrencyList,
  mapDtoToViewForCurrencyRates,
  mapDtoToViewForOrganizationList,
  mapDtoToViewForReconciliationTurnovers,
  mapDtoToViewForServiceBranchList,
  mapDtoToViewForStatementSummary,
  mapDtoToViewForUserList,
} from 'services/admin/mappers';
import { mockChangedEntriesData } from 'services/admin/mock/changed-entries';
import { getEmptyFileMock } from 'services/admin/mock/get-empty-file-mock';
import { getTurnoversMock } from 'services/admin/mock/get-turnover-mock';
import { mockReconciliationTurnoversData } from 'services/admin/mock/reconciliation-turnovers';
import { getStatementList, metadataToRequestCustomParams } from 'services/admin/utils';
import type { ICollectionResponse, IMetaData, IServerResp } from '@platform/services';
import type { IServerDataResp } from '@platform/services/admin';
import { metadataToRequestParams, request } from '@platform/services/admin';

/** Префикс для любого URL любого сервиса. */
const API_PREFIX = '/api';

/** URL сервиса выписок. */
const STATEMENT_BANK_URL = `${API_PREFIX}/statement-bank`;

/** URL сервиса справочника клиентов (банковская часть). */
const CLIENT_DICTIONARY_BANK_URL = `${API_PREFIX}/client-dictionary-bank/internal/dictionary/client`;

/** URL сервиса аутентификации и авторизации (банковская часть). */
const UAA_BANK_URL = `${API_PREFIX}/uaa-bank`;

/** URL пользователей типа CLIENT. */
const CLIENT_USER_URL = `${UAA_BANK_URL}/admin/clientuser`;

/** URL вспомогательных методов сервиса Выписки. */
const STATEMENT_SUPPORT_URL = `${STATEMENT_BANK_URL}/statement/support`;

/**
 * Сервисы администратора Банка.
 *
 * @see http://api-gateway.sandbox.gboteam.ru/statement-bank/swagger-ui.html
 * @see http://api-gateway.stage.gboteam.ru/statement-bank/swagger-ui.html
 */
export const statementService = {
  /** Получение страницы бухгалтерских проводок по идентификатору выписки. */
  getEntries: (metaData: IMetaData, statementId: string, groupBy: GROUP_BY): Promise<ScrollerResponseDto<BankAccountingEntryGroup>> => {
    const { params } = metadataToRequestParams(metaData);
    const { multiSort, ...rest } = params;

    return request<IServerResp<ScrollerResponseDto<BankAccountingEntryGroup>>>({
      url: `${STATEMENT_BANK_URL}/entry/${statementId}/page`,
      method: 'POST',
      data: { ...rest, grouping: groupBy, sorting: multiSort },
    }).then(x => x.data.data);
  },
  /** Получение страницы бухгалтерских проводок. */
  getTransactionsPage: (metaData: IMetaData): Promise<ScrollerResponseDto<BankAccountingEntryCard>> => {
    const { params } = metadataToRequestParams(metaData);
    const { multiSort, ...rest } = params;

    return request<IServerDataResp<ScrollerResponseDto<BankAccountingEntryCard>>>({
      url: `${STATEMENT_BANK_URL}/entry/page`,
      method: 'POST',
      data: { ...rest, sorting: multiSort },
    }).then(response => {
      if (response.data.error?.code) {
        throw new Error(response.data.error.message);
      }

      return response.data.data;
    });
  },
  /** Получить сущность "Запрос выписки". */
  getStatementRequest: (id: string): Promise<IServerDataResp<StatementRequestCard>> =>
    request<IServerDataResp<StatementRequestCard>>({
      url: `${STATEMENT_BANK_URL}/statement/request/card/${id}`,
    }).then(r => r.data),
  /** Возвращает проводку. */
  getTransaction: ({ accountingEntryId }: { accountingEntryId: string }) =>
    request<IServerDataResp<IGetTransactionCardResponseDto>>({
      url: `${STATEMENT_BANK_URL}/entry/${accountingEntryId}`,
    }).then(r => r.data),
  /** Возвращает временной период. */
  getDatePeriod: (data: IGetDatePeriodRequestDto): Promise<IGetDatePeriodResponseDto> =>
    request<IServerDataResp<IGetDatePeriodResponseDto>>({
      method: 'POST',
      data,
      url: `${STATEMENT_SUPPORT_URL}/calculate-period`,
    }).then(result => result.data.data),
  /** Возвращает список выписок истории запросов. */
  getStatementHistoryList: (metaData: IMetaData): Promise<ICollectionResponse<StatementHistoryRow>> =>
    request<IServerDataResp<IScrollerResponseDto<StatementHistoryResponseDto>>>({
      data: metadataToRequestParams(metaData),
      method: 'POST',
      url: `${STATEMENT_BANK_URL}/statement/request/page`,
    }).then(({ data }) => getStatementList(data)),
  /** Возвращает список связанных запросов. */
  getRelatedQueryList: (metaData: IMetaData): Promise<ICollectionResponse<StatementHistoryRow>> =>
    request<IServerDataResp<IScrollerResponseDto<StatementHistoryResponseDto>>>({
      data: metadataToRequestParams(metaData),
      url: `${STATEMENT_BANK_URL}/statement/request/page`,
      method: 'POST',
    }).then(({ data }) => getStatementList(data)),
  /** Генерация ПФ Список запросов выписки. */
  generateStatementsReport: ({
    dateFrom,
    dateTo,
    format,
    statementRequestIds,
  }: {
    dateFrom: string;
    dateTo: string;
    format: FORMAT.EXCEL | FORMAT.PDF;
    statementRequestIds: string[];
  }): Promise<IFileDataResponse> =>
    request<IServerDataResp<IFileDataResponse>>({
      data: {
        statementRequestIds,
        dateFrom,
        dateTo,
        format,
      },
      method: 'POST',
      url: `${STATEMENT_BANK_URL}/statement/request/generate-report`,
    }).then(response => response.data.data),
  /** Возвращает список контрагентов и их счетов в выписке. */
  getCounterparties: (id: string): Promise<Counterparty[]> =>
    request<IServerDataResp<Counterparty[]>>({
      url: `${STATEMENT_BANK_URL}/statement/get-counterparties/${id}`,
    }).then(r => r.data.data),
  /** Возвращает список клиентов и их счетов в выписке. */
  getClients: (id: string): Promise<BankClient[]> =>
    request<IServerDataResp<BankClient[]>>({
      url: `${STATEMENT_BANK_URL}/statement/get-clients/${id}`,
    }).then(r => r.data.data),
  /** Возвращает список счетов. */
  getAccountList: (metaData: IMetaData): Promise<Account[]> =>
    request<IServerResp<ServerResponsePage<ServerResponseList<Account>>>>({
      data: metadataToRequestParams(metaData),
      method: 'POST',
      url: `${CLIENT_DICTIONARY_BANK_URL}/account/get-page`,
    }).then(response => mapDtoToViewForAccountList(response.data.data.page.list)),
  /** Возвращает список счетов по переданным идентификаторам. */
  getAccountListByIds: (data: { ids: string[] }): Promise<Account[]> =>
    request<IServerResp<ServerResponseData<Account[]>>>({
      data,
      method: 'POST',
      url: `${CLIENT_DICTIONARY_BANK_URL}/account/list`,
    }).then(response => mapDtoToViewForAccountList(response.data.data.data)),
  /** Возвращает список организаций. */
  getOrganizationList: (metaData: IMetaData): Promise<Organization[]> =>
    request<IServerResp<ServerResponsePage<ServerResponseList<Organization>>>>({
      data: metadataToRequestParams(metaData),
      method: 'POST',
      url: `${CLIENT_DICTIONARY_BANK_URL}/bank-client/get-page`,
    }).then(response => mapDtoToViewForOrganizationList(response.data.data.page.list)),
  /** Возвращает список организаций по переданным идентификаторам. */
  getOrganizationListByIds: (data: { list: string[] }): Promise<Organization[]> =>
    request<IServerResp<Organization[]>>({
      data,
      method: 'POST',
      url: `${CLIENT_DICTIONARY_BANK_URL}/bank-client/list`,
    }).then(response => mapDtoToViewForOrganizationList(response.data.data)),
  /** Возвращает список подразделений обслуживания. */
  getServiceBranchList: (): Promise<ServiceBranch[]> =>
    request<ServerResponseList<ServiceBranch>>({
      method: 'GET',
      url: `${CLIENT_DICTIONARY_BANK_URL}/branch/v2/filial-branches`,
    }).then(response => mapDtoToViewForServiceBranchList(response.data.list)),
  /** Возвращает все филиалы. */
  getAllBranches: (): Promise<Branch[]> =>
    request<IServerDataResp<Branch[]>>({
      method: 'GET',
      url: `${STATEMENT_BANK_URL}/branch/all`,
    }).then(response => (response.data.error?.code ? [] : response.data.data)),
  /** Возвращает список пользователей. */
  getUserList: (metaData: IMetaData): Promise<User[]> =>
    request<IServerResp<ServerResponsePage<ServerResponseList<ClientUserDto>>>>({
      data: metadataToRequestParams(metaData),
      method: 'POST',
      url: `${CLIENT_USER_URL}/get-page`,
    }).then(response => mapDtoToViewForUserList(response.data.data.page.list)),
  /** Возвращает список пользователей по ФИО. */
  getUserListByFio: (data: UserRequestDto): Promise<User[]> =>
    request<IServerDataResp<User[]>>({
      data,
      method: 'POST',
      url: `${CLIENT_USER_URL}/find/fio`,
    }).then(response => response.data.data),
  createStatementAttachment: (data: CreateStatementAttachmentRequestDto) =>
    request<IServerDataResp<IFileDataResponse>>({
      data,
      method: 'POST',
      url: `${STATEMENT_BANK_URL}/statement/create-attachment`,
    }).then(response => response.data.data),
  /** Возвращает сводную информацию по выписке. */
  getStatementSummary: (statementId: string): Promise<StatementSummary> =>
    request<IServerResp<TotalTurnoverGroupedByCurrencyResponseDto>>({
      url: `${STATEMENT_BANK_URL}/statement/${statementId}/turnover/total/grouped-by-currency`,
    }).then(x => mapDtoToViewForStatementSummary(x.data.data)),
  /** Вернуть информацию об остатках и оборотах. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTurnovers: (metaData: IMetaData): Promise<ScrollerResponseDto<ITurnoverMockDto>> => getTurnoversMock(),
  /** Возвращает закрытые дни. */
  getClosedDays: (metaData: IMetaData): Promise<ICollectionResponse<ClosedDayRow>> =>
    request<IServerDataResp<IScrollerResponseDto<ClosedDayResponseDto>>>({
      data: metadataToRequestCustomParams(metaData),
      method: 'POST',
      url: `${STATEMENT_BANK_URL}/closed-day/get-page`,
    }).then(response => {
      if (response.data.error?.code) {
        throw new Error(response.data.error.message);
      }

      return {
        data: mapDtoToViewForClosedDays(response.data.data.page),
        total: response.data.data.size,
      };
    }),
  /** Генерация ПФ журнала остатков и оборотов. */
  generateTurnoversReport: ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dateFrom,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dateTo,
    format,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    statementIds,
  }: {
    dateFrom: string;
    dateTo: string;
    format: FORMAT.EXCEL | FORMAT.PDF;
    statementIds: string[];
  }): Promise<IFileDataResponse> =>
    new Promise<IServerDataResp<IFileDataResponse>>(resolve => {
      resolve(getEmptyFileMock(format));
      // request<IServerDataResp<IFileDataResponse>>({
      //   data: {
      //     statementId,
      //     dateFrom,
      //     dateTo,
      //     format,
      //   },
      //   method: 'POST',
      //   url: `${STATEMENT_BANK_URL}/statement/generate-turnovers-report`,
    }).then(response => response.data),
  /** Возвращает сверку остатков/оборотов. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getReconciliationTurnovers: (metaData: IMetaData): Promise<ICollectionResponse<ReconciliationTurnoverRow>> =>
    // TODO: Для целевого использования.
    // request<IServerDataResp<IScrollerResponseDto<ReconciliationTurnoverDto>>>({
    //   data: metadataToRequestParams(metaData),
    //   method: 'POST',
    //   url: `${API_PREFIX}/reconciliation-turnovers/page`,
    // })
    new Promise<{ data: IServerDataResp<IScrollerResponseDto<ReconciliationTurnoverDto>> }>(resolve => {
      resolve({ data: mockReconciliationTurnoversData });
    }).then(response => {
      if (response.data.error?.code) {
        throw new Error(response.data.error.message);
      }

      return {
        data: mapDtoToViewForReconciliationTurnovers(response.data.data.page),
        total: response.data.data.size,
      };
    }),
  /** Генерация ПФ журнала остатков и оборотов. */
  // TODO Убрать после реализации API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exportEntries: ({ entriesIds }: { entriesIds: string[] }): Promise<IFileDataResponse> =>
    new Promise<IServerDataResp<IFileDataResponse>>(resolve => {
      resolve(getEmptyFileMock(FORMAT.PDF));
    }).then(response => response.data),
  /** Получение данных скроллера добавленных/удалённых проводок. */
  // TODO Убрать после реализации API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getChangedEntries: (metaData: IMetaData): Promise<ICollectionResponse<BankAccountingChangedEntry>> =>
    new Promise<{ data: IServerDataResp<IScrollerResponseDto<BankAccountingChangedEntry>> }>(resolve => {
      resolve({ data: mockChangedEntriesData });
    }).then(response => {
      if (response.data.error?.code) {
        throw new Error(response.data.error.message);
      }

      return {
        data: response.data.data.page,
        total: response.data.data.size,
      };
    }),
  /** Возвращает список курсов валют. */
  getCurrencyRates: (metaData: IMetaData): Promise<ICollectionResponse<CurrencyRateRow>> =>
    request<IServerDataResp<IScrollerResponseDto<CurrencyRateDto>>>({
      data: metadataToRequestParams(metaData),
      method: 'POST',
      url: `${STATEMENT_BANK_URL}/currency/rate/page`,
    }).then(response => {
      if (response.data.error?.code) {
        throw new Error(response.data.error.message);
      }

      return {
        data: mapDtoToViewForCurrencyRates(response.data.data.page),
        total: response.data.data.size,
      };
    }),
  /** Возвращает список валют. */
  getCurrencies: (metaData: IMetaData): Promise<Currency[]> =>
    request<IServerResp<ServerResponsePage<ServerResponseList<Currency>>>>({
      data: metadataToRequestParams(metaData),
      method: 'POST',
      url: `${CLIENT_DICTIONARY_BANK_URL}/currency/get-page`,
    }).then(response => (response.data.errorInfo?.code ? [] : mapDtoToViewForCurrencyList(response.data.data.page.list))),
  /** Проверить на закрытый день. */
  hasClosedDay: (dto: IHasClosedDayRequestDto): Promise<boolean> =>
    request<IServerDataResp<boolean>>({
      url: `${STATEMENT_SUPPORT_URL}/has-closed-day`,
      method: 'POST',
      data: dto,
    }).then(x => x.data.data),
};
