import type {
  FORMAT,
  ServerResponseList,
  ServerResponseData,
  ServerResponsePage,
  ScrollerResponseDto,
  IScrollerResponseDto,
} from 'interfaces';
import type {
  Account,
  AccountType,
  StatementBranch,
  ClientUserDto,
  ClosedDayResponseDto,
  ClosedDayRow,
  Counterparty,
  CreateStatementAttachmentRequestDto,
  CreateStatementRequestDto,
  Currency,
  CurrencyRateDto,
  CurrencyRateRow,
  ExtendedStatementRequestCard,
  MaintenanceRow,
  MaintenanceResponseDto,
  StatementHistoryRow,
  StatementHistoryResponseDto,
  IFileDataResponse,
  Organization,
  ReconciliationTurnoverDto,
  ReconciliationTurnoverRow,
  Branch,
  StatementRequestCard,
  StatementSummary,
  TotalTurnoverGroupedByCurrencyResponseDto,
  User,
} from 'interfaces/admin';
import type { AccountingEntryAttachmentRequest } from 'interfaces/admin/accounting-entry-attachment-request';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import type { BankAccountingEntryGroup } from 'interfaces/admin/dto/bank-accounting-entry-group';
import type { CreateReportFileDto, TurnoverCard } from 'interfaces/admin/dto/turnover';
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
  mapDtoToViewForMaintenanceList,
  mapDtoToViewForOrganizationList,
  mapDtoToViewForReconciliationTurnovers,
  mapDtoToViewForServiceBranchList,
  mapDtoToViewForStatementSummary,
  mapDtoToViewForUserList,
  mapDtoToViewStatementRequestCard,
  mapForTurnovers,
} from 'services/admin/mappers';
import { getStatementList, metadataToRequestParamsWithCustomFilter, metadataToRequestParamsWithCustomSort } from 'services/admin/utils';
import type { ICollectionResponse, IMetaData, IServerResp } from '@platform/services';
import { AUTH_REQUEST_CONFIG } from '@platform/services';
import type { IServerDataResp } from '@platform/services/admin';
import { metadataToRequestParams, request } from '@platform/services/admin';

/** Префикс для любого URL любого сервиса. */
const API_PREFIX = '/api';

/** URL сервиса выписок. */
const STATEMENT_BANK_URL = `${API_PREFIX}/statement-bank`;

/** URL сервиса выписок. */
const STATEMENT_URL = `${STATEMENT_BANK_URL}/statement`;

/** URL запросов выписки. */
const STATEMENT_REQUEST_URL = `${STATEMENT_URL}/request`;

/** URL вспомогательных методов сервиса выпискок. */
const STATEMENT_SUPPORT_URL = `${STATEMENT_URL}/support`;

/** URL сервиса справочника клиентов (банковская часть). */
const CLIENT_DICTIONARY_BANK_URL = `${API_PREFIX}/client-dictionary-bank/internal/dictionary/client`;

/** URL сервиса аутентификации и авторизации (банковская часть). */
const UAA_BANK_URL = `${API_PREFIX}/uaa-bank`;

/** URL пользователей типа CLIENT. */
const CLIENT_USER_URL = `${UAA_BANK_URL}/admin/clientuser`;

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
  getStatementRequest: (id: string): Promise<ExtendedStatementRequestCard> =>
    request<IServerDataResp<StatementRequestCard>>({
      url: `${STATEMENT_REQUEST_URL}/card/${id}`,
      // TODO: Вынести в утилиту проверку на ошибку и получение результата
      // eslint-disable-next-line sonarjs/no-identical-functions
    }).then(response => {
      if (response.data.error?.code) {
        throw new Error(response.data.error.message);
      }

      return mapDtoToViewStatementRequestCard(response.data.data);
    }),
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
      url: `${STATEMENT_REQUEST_URL}/page`,
    }).then(({ data }) => getStatementList(data)),
  /** Возвращает список связанных запросов. */
  getRelatedQueryList: (metaData: IMetaData): Promise<ICollectionResponse<StatementHistoryRow>> =>
    request<IServerDataResp<IScrollerResponseDto<StatementHistoryResponseDto>>>({
      data: metadataToRequestParams(metaData),
      url: `${STATEMENT_REQUEST_URL}/page`,
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
        ids: statementRequestIds,
        dateFrom,
        dateTo,
        format,
      },
      method: 'POST',
      url: `${STATEMENT_REQUEST_URL}/generate-report`,
    }).then(response => response.data.data),
  /** Возвращает список контрагентов и их счетов в выписке. */
  getCounterparties: (id: string): Promise<Counterparty[]> =>
    request<IServerDataResp<Counterparty[]>>({
      url: `${STATEMENT_URL}/get-counterparties/${id}`,
    }).then(r => r.data.data),
  /** Возвращает список клиентов и их счетов в выписке. */
  getClients: (id: string): Promise<BankClient[]> =>
    request<IServerDataResp<BankClient[]>>({
      url: `${STATEMENT_URL}/get-clients/${id}`,
    }).then(r => r.data.data),
  /** Получить страницу счетов. */
  getAccountsPage: (metaData: IMetaData): Promise<Account[]> =>
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
  /** Получить страницу организаций. */
  getOrganizationsPage: (metaData: IMetaData): Promise<Organization[]> =>
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
  getServiceBranchList: (): Promise<Branch[]> =>
    request<ServerResponseList<Branch>>({
      method: 'GET',
      url: `${CLIENT_DICTIONARY_BANK_URL}/branch/v2/filial-branches`,
    }).then(response => mapDtoToViewForServiceBranchList(response.data.list)),
  /** Возвращает все филиалы. */
  getAllBranches: (): Promise<StatementBranch[]> =>
    request<IServerDataResp<StatementBranch[]>>({
      method: 'GET',
      url: `${STATEMENT_BANK_URL}/branch/all`,
    }).then(response => (response.data.error?.code ? [] : response.data.data)),
  /** Получить страницу филиалов. */
  getBranchesPage: (metaData: IMetaData): Promise<Branch[]> =>
    request<IServerResp<ServerResponsePage<ServerResponseList<Branch>>>>({
      data: metadataToRequestParams(metaData),
      method: 'POST',
      url: `${CLIENT_DICTIONARY_BANK_URL}/branch/get-page`,
    }).then(response => mapDtoToViewForServiceBranchList(response.data.data.page.list)),
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
      url: `${STATEMENT_URL}/create-attachment`,
    }).then(response => response.data.data),
  /** Возвращает сводную информацию по выписке. */
  getStatementSummary: (statementId: string): Promise<StatementSummary> =>
    request<IServerResp<TotalTurnoverGroupedByCurrencyResponseDto>>({
      url: `${STATEMENT_URL}/turnover/${statementId}/total/grouped-by-currency`,
    }).then(x => mapDtoToViewForStatementSummary(x.data.data)),
  /** API остатков и оборотов. */
  turnover: {
    /** Получение страницы остатков и оборотов. */
    page: (metaData: IMetaData) => {
      const { params } = metadataToRequestParams(metaData);

      return request<IServerDataResp<IScrollerResponseDto<TurnoverCard>>>({
        data: params,
        method: 'POST',
        url: `${STATEMENT_BANK_URL}/statement/turnover/page`,
      }).then(x => {
        if (x.data.error?.code) {
          throw new Error(x.data.error.message);
        }

        return {
          data: mapForTurnovers(x.data.data.page),
          total: x.data.data.size,
        };
      });
    },
    /** Генерация ПФ журнала остатков и оборотов. */
    generateReport: (dto: CreateReportFileDto) =>
      request<IServerDataResp<IFileDataResponse>>({
        data: dto,
        method: 'POST',
        url: `${STATEMENT_BANK_URL}/statement/turnover/generate-report`,
      }).then(x => x.data.data),
  },
  /** Возвращает закрытые дни. */
  getClosedDays: (metaData: IMetaData): Promise<ICollectionResponse<ClosedDayRow>> =>
    request<IServerDataResp<IScrollerResponseDto<ClosedDayResponseDto>>>({
      data: metadataToRequestParamsWithCustomFilter(metaData),
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
  /** Возвращает сверку остатков/оборотов. */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getReconciliationTurnovers: (metaData: IMetaData): Promise<ICollectionResponse<ReconciliationTurnoverRow>> =>
    // TODO: Для целевого использования.
    request<IServerDataResp<IScrollerResponseDto<ReconciliationTurnoverDto>>>({
      data: metadataToRequestParamsWithCustomSort(metaData).params,
      method: 'POST',
      url: `${STATEMENT_BANK_URL}/statement/turnover/reconciliation/page`,
    }).then(response => {
      if (response.data.error?.code) {
        throw new Error(response.data.error.message);
      }

      return {
        data: mapDtoToViewForReconciliationTurnovers(response.data.data.page),
        total: response.data.data.size,
      };
    }),
  /** Сформировать документы выписки/основания без привязки к выписке. */
  exportEntries: (requestData: AccountingEntryAttachmentRequest): Promise<IFileDataResponse> =>
    request<IServerDataResp<IFileDataResponse>>({
      data: requestData,
      method: 'POST',
      url: `${STATEMENT_BANK_URL}/entry/create-attachment`,
    }).then(x => x.data.data),
  /** Получение данных скроллера добавленных/удалённых проводок. */
  // TODO Убрать после реализации API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getChangedEntries: (metaData: IMetaData, statementId: string): Promise<ScrollerResponseDto<BankAccountingEntryGroup>> => {
    const { params } = metadataToRequestParams({
      ...metaData,
      filters: {
        ...metaData.filters,
        modifiedAccountingEntry: {
          fieldName: 'modifiedAccountingEntry',
          condition: 'eq',
          value: true,
        },
      },
    });
    const { multiSort, ...rest } = params;

    return request<IServerResp<ScrollerResponseDto<BankAccountingEntryGroup>>>({
      url: `${STATEMENT_BANK_URL}/entry/${statementId}/page`,
      method: 'POST',
      data: { ...rest, sorting: multiSort },
    }).then(x => x.data.data);
  },
  /** Возвращает список курсов валют. */
  getCurrencyRates: (metaData: IMetaData): Promise<ICollectionResponse<CurrencyRateRow>> =>
    request<IServerDataResp<IScrollerResponseDto<CurrencyRateDto>>>({
      data: metadataToRequestParamsWithCustomSort(metaData).params,
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
  /** Получить страницу журнала технических работ. */
  getMaintenance: (metaData: IMetaData): Promise<ICollectionResponse<MaintenanceRow>> =>
    request<IServerDataResp<ScrollerResponseDto<MaintenanceResponseDto>>>({
      data: metadataToRequestParamsWithCustomFilter(metaData),
      method: 'POST',
      url: `${STATEMENT_BANK_URL}/maintenance/get-page`,
    }).then(response => {
      if (response.data.error?.code) {
        throw new Error(response.data.error.message);
      }

      return {
        data: mapDtoToViewForMaintenanceList(response.data.data.page),
        total: response.data.data.size,
      };
    }),
  /** Создать запрос выписки. */
  createStatement: (data: CreateStatementRequestDto): Promise<IServerDataResp<string>> =>
    request<IServerDataResp<string>>({
      url: `${STATEMENT_REQUEST_URL}`,
      method: 'POST',
      data: { data },
      headers: AUTH_REQUEST_CONFIG.headers,
    }).then(response => {
      if (response.data.error?.code) {
        throw new Error(response.data.error.message);
      }

      return response.data;
    }),
  /** Возвращает страницу записей типов счета. */
  getAccountTypePage: (metaData: IMetaData): Promise<AccountType[]> =>
    request<IServerResp<ServerResponsePage<ServerResponseList<AccountType>>>>({
      data: metadataToRequestParams(metaData),
      method: 'POST',
      url: `${CLIENT_DICTIONARY_BANK_URL}/account-type/get-page`,
    }).then(response => {
      if (response.data.errorInfo?.code) {
        throw new Error(response.data.errorInfo.message);
      }

      return response.data.data.page.list;
    }),
};
