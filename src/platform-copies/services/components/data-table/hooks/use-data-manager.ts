import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { UsePaginationState } from 'react-table';
import type { IExecuter } from '@platform/core';
import { applyMiddlewares, onSuccessMiddleware } from '@platform/core';
import type { IBaseEntity, ISortSettings } from '@platform/services';
import type { FetchDataParams, FetchDataResponse, IExpandedRowComponentProps } from '../types';
import { getServiceColumnWidth } from '../utils';
import { DEFAULT_PAGINATION_STATE } from './use-pagination-controller';

/** Входные данные хука менеджера данных таблицы с бесконечным скроллированием. */
interface DataManagerParams<T extends IBaseEntity> {
  /** Компонент раскрытой строки. */
  expandedRowComponent?: React.FC<IExpandedRowComponentProps<T>>;
  /** Функция запроса данных с сервера. */
  fetchData(params: FetchDataParams): Promise<FetchDataResponse<T>>;
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
  /** Функция устанавливает признак загрузки данных при скроллинге. */
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
  const [pageCount, setPageCount] = useState(0);
  const [needMoreRows, setNeedMoreRows] = useState(false);
  const [rows, setRows] = useState<T[]>([]);

  const loading = useRef(false);
  const loadingMore = useRef(false);
  const needScrollToTop = useRef(false);
  const paginationState = useRef(DEFAULT_PAGINATION_STATE);

  const fetch = useCallback(async () => {
    if (paginationState.current.pageIndex === 0) {
      loading.current = true;
      needScrollToTop.current = true;
    } else {
      loadingMore.current = true;
    }

    try {
      const data = await fetchData({
        page: paginationState.current.pageIndex,
        pageSize: paginationState.current.pageSize,
        multiSort,
      });

      setRows(prevState => (paginationState.current.pageIndex === 0 ? data.rows : [...prevState, ...data.rows]));
      setPageCount(data.total!);
    } finally {
      if (paginationState.current.pageIndex === 0) {
        loading.current = false;
        needScrollToTop.current = false;
      } else {
        loadingMore.current = false;
      }
    }
  }, [fetchData, multiSort]);

  // Используем debounce для исключения повторных запросов
  // value в useDebounce уходит в setState, поэтому используем сеттер
  // const fetchDebounced = useDebounce(() => fetch, 100);

  useEffect(() => {
    paginationState.current = { ...paginationState.current, pageIndex: 0 };

    void fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, multiSort]);

  const handleLoadMoreRows = useCallback(() => setNeedMoreRows(true), []);

  useEffect(() => {
    if (needMoreRows && !loadingMore.current && !loading.current) {
      paginationState.current = { ...paginationState.current, pageIndex: paginationState.current.pageIndex + 1 };

      setNeedMoreRows(false);

      void fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needMoreRows, loading, loadingMore.current]);

  const executer = applyMiddlewares(
    onSuccessMiddleware(() => {
      void fetch();
    })
  )(originalExecuter);

  const showExpanded = Boolean(expandedRowComponent);
  const showCheckbox = Boolean(onSelectedRowsChange);
  const serviceColumnWidth = getServiceColumnWidth(showExpanded, showCheckbox);

  return {
    executer,
    fetch,
    loading: loading.current,
    loadingMore: loadingMore.current,
    needScrollToTop: needScrollToTop.current,
    onLoadMoreRows: handleLoadMoreRows,
    paginationState: paginationState.current,
    pageCount,
    rows,
    serviceColumnWidth,
    showCheckbox,
    showExpanded,
  };
};
