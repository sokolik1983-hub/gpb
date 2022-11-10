import { useCallback, useState } from 'react';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { convertTablePaginationToMetaData, getPageCount } from 'utils/common';
import type { IFilters } from '@platform/core';
import type { ICollectionResponse, IMetaData } from '@platform/services';

/** Входные данные хука useDataTable. */
interface UseDataTableRequest<R> {
  /** Api-метод запроса данных на сервер. */
  apiMethod(metaData: IMetaData): Promise<ICollectionResponse<R>>;
  /** Значения формы фильтрации. */
  filter: IFilters;
}

/** Выходные данные хука useDataTable. */
interface UseDataTableResponse<R> {
  /** Метод запроса данных с сервера. */
  fetch(params: IFetchDataParams): Promise<IFetchDataResponse<R>>;
  /** Признак инициализации таблицы. */
  initialed: boolean;
  /** Общее количество записей. */
  total: number;
}

/** Хук для таблиц скроллеров. */
export const useDataTable = <R>({ apiMethod, filter }: UseDataTableRequest<R>): UseDataTableResponse<R> => {
  const [total, setTotal] = useState(0);
  const [initialed, setInitialed] = useState(false);

  /** Метод срабатывает при получении данных таблицы.
   * Устанавливает признак инициализации таблицы (получение первых данных). */
  const setDataTableFetched = useCallback(() => {
    if (!initialed) {
      setInitialed(true);
    }
  }, [initialed]);

  /** Метод запроса данных с сервера. */
  const fetch = useCallback(
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<any>> => {
      try {
        const metaData: IMetaData = {
          filters: filter,
          multiSort,
          ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
        };

        const { data: rows, total: totalItems } = await apiMethod(metaData);

        setTotal(totalItems);

        return { rows, pageCount: getPageCount(totalItems, pageSize) };
      } catch {
        return { rows: [], pageCount: 0 };
      } finally {
        setDataTableFetched();
      }
    },
    // Должно срабатывать только при изменении фильтра.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );

  return {
    fetch,
    initialed,
    total,
  };
};
