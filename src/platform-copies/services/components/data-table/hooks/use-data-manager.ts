import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { UsePaginationState } from 'react-table';
import type { IExecuter } from '@platform/core';
import { applyMiddlewares, onSuccessMiddleware } from '@platform/core';
import type { IBaseEntity, ISortSettings } from '@platform/services';
import { useDebounce } from '@platform/ui';
import type { IFetchDataParams, IFetchDataResponse, IExpandedRowComponentProps } from '../types';
import { getServiceColumnWidth } from '../utils';
import { DEFAULT_PAGINATION_STATE } from './use-pagination-controller';

/** Входные данные хука менеджера данных таблицы с бесконечным скроллированием. */
interface DataManagerParams<T extends IBaseEntity> {
  /** Компонент раскрытой строки. */
  expandedRowComponent?: React.FC<IExpandedRowComponentProps<T>>;
  /** Функция запроса данных с сервера. */
  fetchData(params: IFetchDataParams): Promise<IFetchDataResponse<T>>;
  /** Данные мультисортировки. */
  multiSort: ISortSettings;
  /** Обработчик изменения выбранных строк. */
  onSelectedRowsChange?(rows: unknown): void;
  /** Оригинальный исполнитель экшенов. */
  originalExecuter: IExecuter<unknown>;
}

/** Выходные данные хука менеджера данных таблицы с бесконечным скроллированием. */
interface TableDataState<T extends IBaseEntity> {
  /** Исполнитель экшенов. */
  executer: IExecuter<unknown>;
  /** Функция-обертка над `fetchData`. */
  fetch(): void;
  /** Признак загрузки данных (при сортировке, изменении данных запроса). */
  loading: boolean;
  /** Признак загрузки данных при скроллировании. */
  loadingMore: boolean;
  /** Признак необходимости проскроллировать вверх (при сортировке и изменении данных запроса). */
  needScrollToTop: boolean;
  /** Данные таблицы. */
  rows: T[];
  /** Функция устанавливает признак загрузки данных при скроллировании. */
  onLoadMoreRows(): void;
  /** Данные пагинации (при скроллировании переключаются страницы и данные добавляются в конец списка). */
  paginationState: UsePaginationState<T>;
  /** Количество страниц для скроллирования. */
  pageCount: number;
  /** Ширина колонки для выбора строки (чекбокса) или кнопки раскрытия строки. */
  serviceColumnWidth: number;
  /** Признак выбора строки (отображение чекбокса). */
  showCheckbox: boolean;
  /** Признак раскрывания строки. */
  showExpanded: boolean;
}

/** Хук менеджер данных таблицы с бесконечным скроллированием. */
export const useDataManager = <T extends IBaseEntity>({
  expandedRowComponent,
  fetchData,
  multiSort,
  onSelectedRowsChange,
  originalExecuter,
}: DataManagerParams<T>): TableDataState<T> => {
  const [paginationState, setPaginationState] = useState(DEFAULT_PAGINATION_STATE);
  const [pageCount, setPageCount] = useState(0);
  const [rows, setRows] = useState<T[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [needMoreRows, setNeedMoreRows] = useState(false);
  const [needScrollToTop, setNeedScrollToTop] = useState(false);

  // Флаг для выполнения запроса с сервера - используется в debounce.
  const [flagToFetch, setFlagToFetch] = useState<Record<string, unknown> | null>(null);

  const fetch = useCallback(async () => {
    if (paginationState.pageIndex === 0) {
      setLoading(true);
      setNeedScrollToTop(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const data = await fetchData({
        page: paginationState.pageIndex,
        pageSize: paginationState.pageSize,
        multiSort,
      });

      setRows(prevState => (paginationState.pageIndex === 0 ? data.rows : [...prevState, ...data.rows]));
      setPageCount(data.total!);
    } finally {
      if (paginationState.pageIndex === 0) {
        setLoading(false);
        setNeedScrollToTop(false);
      } else {
        setLoadingMore(false);
      }
    }
  }, [fetchData, multiSort, paginationState.pageIndex, paginationState.pageSize]);

  // Флаг для выполнения запроса с сервера.
  const flagToFetchDebounced = useDebounce(flagToFetch, 100);

  useEffect(() => {
    setFlagToFetch({});

    setPaginationState(prevState => ({ ...prevState, pageIndex: 0 }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, multiSort]);

  const handleLoadMoreRows = useCallback(() => setNeedMoreRows(true), []);

  useEffect(() => {
    if (needMoreRows && !loadingMore && !loading) {
      setNeedMoreRows(false);

      setLoadingMore(true);

      setFlagToFetch({});

      setPaginationState(prevState => ({ ...prevState, pageIndex: prevState.pageIndex + 1 }));
    }
  }, [needMoreRows, loading, loadingMore]);

  const executer = applyMiddlewares(
    onSuccessMiddleware(() => {
      setFlagToFetch({});
    })
  )(originalExecuter);

  useEffect(() => {
    if (flagToFetch) {
      void fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagToFetchDebounced]);

  const showExpanded = Boolean(expandedRowComponent);
  const showCheckbox = Boolean(onSelectedRowsChange);
  const serviceColumnWidth = getServiceColumnWidth(showExpanded, showCheckbox);

  return {
    executer,
    fetch,
    loading,
    loadingMore,
    needScrollToTop,
    onLoadMoreRows: handleLoadMoreRows,
    paginationState,
    pageCount,
    rows,
    serviceColumnWidth,
    showCheckbox,
    showExpanded,
  };
};
