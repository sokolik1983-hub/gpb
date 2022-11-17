import type { IScrollerResponseDto } from 'interfaces';
import type { StatementHistoryResponseDto, StatementHistoryRow } from 'interfaces/admin';
import { mapDtoToViewForStatementList } from 'services/admin/mappers';
import type { ICollectionResponse } from '@platform/services';
import type { IMetaData, IServerDataResp } from '@platform/services/admin';
import { metadataToRequestParams } from '@platform/services/admin';

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

/**
 * Получить параметры запроса на сервер с измененным фильтром.
 * Кастомная обертка над платформенным методом metadataToRequestParams.
 *
 * @param metaData - Данные для формирования параметров запроса на сервер.
 */
export const metadataToRequestParamsWithCustomFilter = (metaData: IMetaData) => {
  if (!metaData.filters) {
    return metadataToRequestParams(metaData);
  }

  return {
    params: {
      ...metadataToRequestParams(metaData).params,
      filter: Object.keys(metaData.filters || {}).reduce(
        (prevValue, item) =>
          metaData.filters?.[item].value
            ? {
                ...prevValue,
                [item]: metaData.filters[item].value,
              }
            : prevValue,
        {}
      ),
    },
  };
};

/**
 * Получить параметры запроса на сервер с измененной сортировкой.
 * Кастомная обертка над платформенным методом metadataToRequestParams.
 *
 * @param metaData - Данные для формирования параметров запроса на сервер.
 */
export const metadataToRequestParamsWithCustomSort = (metaData: IMetaData) => {
  const { multiSort, ...rest } = metadataToRequestParams(metaData).params;

  return {
    params: {
      ...rest,
      sorting: multiSort,
    },
  };
};
