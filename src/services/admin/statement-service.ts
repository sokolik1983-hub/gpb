import type { IScrollerResponceDto, FORMAT } from 'interfaces';
import type { StatementHistoryRow, StatementHistoryResponseDto, IFileDataResponse } from 'interfaces/admin';
import type { RequestPeriodType, IGetTransactionCardResponseDto } from 'interfaces/dto';
import { mapDtoToViewForStatementList } from 'services/admin/mappers';
import { asyncNoop } from 'utils/common';
import type { ICollectionResponse } from '@platform/services';
import { DATE_FORMAT } from '@platform/services';
import { metadataToRequestParams, request } from '@platform/services/admin';
import type { IServerDataResp } from '@platform/services/client';
import type { IMetaData } from '@platform/services/client/dist-types/interfaces/common';
import { formatDateTime } from '@platform/tools/date-time';

/** Базовый URL сервиса "Выписки". */
const BASE_URL = '/api';

/** URL сервиса выписок. */
const STATEMENT_BANK_URL = `${BASE_URL}/statement-bank`;

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
  // TODO убрать eslint-disable после реализации метода
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDatePeriod: ({ periodType }: { periodType: RequestPeriodType }) => asyncNoop,
  /** Возвращает список выписок истории запросов. */
  getStatementList: (metaData: IMetaData): Promise<ICollectionResponse<StatementHistoryRow>> =>
    request<IServerDataResp<IScrollerResponceDto<StatementHistoryResponseDto>>>({
      url: `${STATEMENT_BANK_URL}/statement/request/page`,
      method: 'POST',
      data: metadataToRequestParams(metaData),
    })
      .then(response => {
        if (response.data.error?.code) {
          throw response.data.error.message;
        }

        return {
          data: mapDtoToViewForStatementList(response.data.data.page),
          total: response.data.data.size,
        };
      })
      .catch(() => ({
        data: [],
        total: 0,
      })),
  /** Генерация ПФ Список запросов выписки. */
  generateReport: async ({
    statementIds,
    dateFrom,
    dateTo,
    format,
  }: {
    statementIds: string[];
    dateFrom: Date;
    dateTo: Date;
    format: FORMAT.EXCEL | FORMAT.PDF;
  }) => {
    const { data: resp } = await request<IFileDataResponse>({
      url: `${STATEMENT_BANK_URL}/statement/request/generate-report`,
      method: 'POST',
      data: {
        statementIds,
        dateFrom: formatDateTime(dateFrom, { keepLocalTime: false, format: DATE_FORMAT }),
        dateTo: formatDateTime(dateTo, { keepLocalTime: false, format: DATE_FORMAT }),
        format,
      },
    });

    return resp;
  },
};
