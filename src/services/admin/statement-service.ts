import type { IScrollerResponceDto, FORMAT, ServerResponseList, ServerResponseData, ServerResponsePage } from 'interfaces';
import type {
  Account,
  CreateStatementAttachmentRequestDto,
  StatementHistoryRow,
  StatementHistoryResponseDto,
  IFileDataResponse,
  Organization,
  ServiceBranch,
  User,
} from 'interfaces/admin';
import type { IGetTransactionCardResponseDto, IGetDatePeriodRequestDto, IGetDatePeriodResponseDto } from 'interfaces/dto';
import type { IClientBankResponseDto, UserRequestDto } from 'interfaces/dto/admin';
import {
  mapDtoToViewForAccountList,
  mapDtoToViewForOrganizationList,
  mapDtoToViewForServiceBranchList,
  mapDtoToViewForStatementList,
  mapDtoToViewForUserList,
} from 'services/admin/mappers';
import { asyncNoop } from 'utils/common';
import type { ICollectionResponse } from '@platform/services';
import { metadataToRequestParams, request } from '@platform/services/admin';
import type { IMetaData, IServerDataResp, IServerResp } from '@platform/services/admin';

/** Базовый URL сервиса "Выписки". */
const BASE_URL = '/api';

/** URL сервиса выписок. */
const STATEMENT_BANK_URL = `${BASE_URL}/statement-bank`;

/** URL сервиса справочника клиентов (банковская часть). */
const CLIENT_DICTIONARY_BANK_URL = `${BASE_URL}/client-dictionary-bank/internal/dictionary/client`;

/** URL сервиса аутентификации и авторизации (банковская часть). */
const UAA_BANK_URL = `${BASE_URL}/uaa-bank`;

/** URL пользователей типа CLIENT. */
const CLIENTUSER_URL = `${UAA_BANK_URL}/admin/clientuser`;

/** URL вспомогательных методов сервиса Выписки. */
const STATEMENT_SUPPORT_URL = `${STATEMENT_BANK_URL}/statement/support`;

/** Сервис выписок админа. */
export const statementService = {
  /** Получить сущность "Запрос выписки". */
  // TODO убрать eslint-disable после реализации метода
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStatementRequest: (id: string) => asyncNoop,
  /** Возвращает проводку. */
  // TODO убрать eslint-disable после реализации метода
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTransaction: ({ accountingEntryId }: { accountingEntryId: string }): Promise<IServerDataResp<IGetTransactionCardResponseDto>> =>
    asyncNoop(),
  /** Возвращает временной период. */
  getDatePeriod: (data: IGetDatePeriodRequestDto): Promise<IGetDatePeriodResponseDto> =>
    request<IServerDataResp<IGetDatePeriodResponseDto>>({
      method: 'POST',
      data,
      url: `${STATEMENT_SUPPORT_URL}/calculate-period`,
    }).then(result => result.data.data),
  /** Возвращает список выписок истории запросов. */
  getStatementList: (metaData: IMetaData): Promise<ICollectionResponse<StatementHistoryRow>> =>
    request<IServerDataResp<IScrollerResponceDto<StatementHistoryResponseDto>>>({
      data: metadataToRequestParams(metaData),
      method: 'POST',
      url: `${STATEMENT_BANK_URL}/statement/request/page`,
    }).then(response => {
      if (response.data.error?.code) {
        throw response.data.error.message;
      }

      return {
        data: mapDtoToViewForStatementList(response.data.data.page),
        total: response.data.data.size,
      };
    }),
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
  getCounterparties: (id: string): Promise<IClientBankResponseDto[]> =>
    request<IServerDataResp<IClientBankResponseDto[]>>({
      url: `${STATEMENT_BANK_URL}/get-counterparties/${id}`,
    }).then(r => r.data.data),
  /** Возвращает список клиентов и их счетов в выписке. */
  getClients: (id: string): Promise<IClientBankResponseDto[]> =>
    request<IServerDataResp<IClientBankResponseDto[]>>({
      url: `${STATEMENT_BANK_URL}/get-clients/${id}`,
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
  /** Возвращает список пользователей. */
  getUserList: (metaData: IMetaData): Promise<User[]> =>
    request<IServerResp<ServerResponsePage<ServerResponseList<User>>>>({
      data: metadataToRequestParams(metaData),
      method: 'POST',
      url: `${CLIENTUSER_URL}/get-page`,
    }).then(response => mapDtoToViewForUserList(response.data.data.page.list)),
  /** Возвращает список пользователей по ФИО. */
  getUserListByFio: (data: UserRequestDto): Promise<User[]> =>
    request<IServerDataResp<User[]>>({
      data,
      method: 'POST',
      url: `${CLIENTUSER_URL}/find/fio`,
    }).then(response => response.data.data),
  createStatementAttachment: (data: CreateStatementAttachmentRequestDto): Promise<IFileDataResponse> =>
    request<IServerDataResp<IFileDataResponse>>({
      data,
      method: 'POST',
      url: `${STATEMENT_BANK_URL}/statement/create-attachment`,
    }).then(response => response.data.data),
};
