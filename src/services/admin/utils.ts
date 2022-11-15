import type { IScrollerResponseDto } from 'interfaces';
import type { StatementHistoryResponseDto, StatementHistoryRow } from 'interfaces/admin';
import { mapDtoToViewForStatementList } from 'services/admin/mappers';
import type { ICollectionResponse } from '@platform/services';
import type { IServerDataResp } from '@platform/services/admin';

/**
 * Утилита обработки ответа сервера данных по выпискам.
 *
 * @param response - Данные ответа сервера.
 * @throws String - Ошибка ответа сервера.
 */
export const getStatementList = (
  response: IServerDataResp<IScrollerResponseDto<StatementHistoryResponseDto>>
): ICollectionResponse<StatementHistoryRow> => {
  if (response.error?.code) {
    throw response.error.message;
  }

  return {
    data: mapDtoToViewForStatementList(response.data.page),
    total: response.data.size,
  };
};
