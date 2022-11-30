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
  /** Признак, что необходимо вернуть пустые данные. */
  returnEmptyData?: boolean;
}

/** Выходные данные хука useDataTable. */
interface UseDataTableResponse<R> {
  /** Метод запроса данных с сервера. */
  fetch(params: IFetchDataParams): Promise<IFetchDataResponse<R>>;
  /** Признак инициализации таблицы. */
  initialed: boolean;
  /** Данные таблицы. */
  items: R[];
  /** Признак процесса запроса данных на сервер. */
  loading: boolean;
  /** Общее количество записей. */
  total: number;
}

/** Хук для таблиц скроллеров. */
export const useDataTable = <R>({ apiMethod, filter, returnEmptyData }: UseDataTableRequest<R>): UseDataTableResponse<R> => {
  const [initialed, setInitialed] = useState(false);
  const [items, setItems] = useState<R[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  /** Метод срабатывает при получении данных таблицы.
   * Устанавливает признак инициализации таблицы (получение первых данных). */
  const setDataTableFetched = useCallback(() => {
    if (!initialed) {
      setInitialed(true);
    }
  }, [initialed]);

  /** Метод запроса данных с сервера. */
  const fetch = useCallback(
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<R>> => {
      try {
        if (returnEmptyData) {
          return { rows: [], pageCount: 0 };
        }

        setLoading(true);

        const metaData: IMetaData = {
          filters: filter,
          multiSort,
          ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
        };

        const { data: rows, total: totalItems } = await apiMethod(metaData);

        setItems(rows);
        setTotal(totalItems);

        return { rows, pageCount: getPageCount(totalItems, pageSize) };
      } catch {
        return { rows: [], pageCount: 0 };
      } finally {
        setLoading(false);

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
    items,
    loading,
    total,
  };
};
