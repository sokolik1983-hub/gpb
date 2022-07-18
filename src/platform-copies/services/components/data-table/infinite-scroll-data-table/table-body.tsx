import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import type { TableBodyProps as TableBodyPropsPure, TableInstance } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import type { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import type { IExecuter } from '@platform/core';
import type { IActionWithAuth } from '@platform/services';
import { Box, LayoutScroll } from '@platform/ui';
import type { ICaptionRowComponentProps, IExpandedRowComponentProps, RecordCell } from '../types';
import { InfiniteRow } from './infinite-row';

/** Свойства компонента тела таблицы с бесконечным скроллингом. */
interface TableBodyWithInfiniteScrollProps<T> extends TableBodyPropsPure {
  /** Исполнитель экшенов. */
  executor: IExecuter<unknown>;
  /** Геттер кнопок раскрытой строки. */
  expandedRowActionsGetter?(row: T): IActionWithAuth[];
  /** Компонент раскрытой строки. */
  expandedRowComponent?: React.FC<IExpandedRowComponentProps<T>>;
  /** Геттер быстрых кнопок строки. */
  fastActions?: IActionWithAuth[] | ((row: T) => IActionWithAuth[]);
  /** Признак процесса загрузки данных. */
  loading: boolean;
  /** Признак процесса загрузки данных при скроллировании. */
  loadingMore: boolean;
  /** Признак необходимости проскроллировать вверх. */
  needScrollToTop: boolean;
  /** Функция загрузки данных при скроллинге. */
  onLoadMoreRows(): void;
  /** Обработчик одинарного клика по строке. */
  onRowClick?(row: T): void;
  /** Обработчик двойного клика по строке. */
  onRowDoubleClick?(row: T): void;
  /** Функция запроса данных с сервера. */
  refetch(): void;
  /** Контент подписи к строке (располагается внизу строки). */
  rowCaptionComponent?: React.FC<ICaptionRowComponentProps<T>>;
  /** Экземпляр таблицы. */
  tableInstance: TableInstance<RecordCell>;
}

const MINIMUM_BATCH_SIZE = 8;
const THRESHOLD = 4;

/** Компонент тела таблицы с бесконечным скроллингом. */
export const TableBody = <T,>({
  executor,
  expandedRowActionsGetter,
  expandedRowComponent,
  fastActions,
  loading,
  loadingMore,
  needScrollToTop,
  onLoadMoreRows,
  onRowClick,
  onRowDoubleClick,
  refetch,
  rowCaptionComponent,
  tableInstance,
}: TableBodyWithInfiniteScrollProps<T>): React.ReactElement => {
  const { canNextPage, getTableBodyProps, prepareRow, rows, totalColumnsWidth } = tableInstance;

  const rowSizeMap = useRef<Record<string, number>>({});
  const listRef = useRef<List>();

  const loadMoreRows = useCallback(
    (startIndex, endIndex) =>
      new Promise<void>(resolve => {
        if (!loadingMore && !loading && canNextPage && rows.length - endIndex <= THRESHOLD) {
          onLoadMoreRows();
        }

        resolve();
      }),
    [canNextPage, loading, loadingMore, onLoadMoreRows, rows.length]
  );

  const itemCount = useMemo(() => (canNextPage ? rows.length + 3 : rows.length), [canNextPage, rows.length]);

  const getItemSize = useCallback(index => rowSizeMap.current[index] || 50, []);

  const setRowSize = useCallback((index: number, size: number) => {
    rowSizeMap.current = { ...rowSizeMap.current, [index]: size };
    listRef.current?.resetAfterIndex(index);
  }, []);

  useEffect(() => {
    if (needScrollToTop) {
      listRef.current?.scrollToItem(0);
    }
  }, [needScrollToTop]);

  return (
    <Box {...getTableBodyProps({ style: { height: '100%' } })}>
      <LayoutScroll>
        <AutoSizer style={{ height: '100%', width: totalColumnsWidth }}>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={() => false}
              itemCount={itemCount}
              loadMoreItems={loadMoreRows}
              minimumBatchSize={MINIMUM_BATCH_SIZE}
              threshold={THRESHOLD}
            >
              {({ onItemsRendered, ref }) => (
                <VariableSizeList
                  ref={(list: List) => {
                    (ref as React.RefCallback<List>)(list);
                    listRef.current = list;
                  }}
                  height={height}
                  itemCount={itemCount}
                  itemSize={getItemSize}
                  width={width}
                  onItemsRendered={onItemsRendered}
                >
                  {({ index, style }) => {
                    const row = rows[index];

                    if (!row) {
                      return null;
                    }

                    prepareRow(row);

                    const { key } = row.getRowProps();

                    return (
                      <InfiniteRow<T>
                        key={key}
                        executor={executor}
                        expandedRowActionsGetter={expandedRowActionsGetter}
                        expandedRowComponent={expandedRowComponent}
                        fastActions={fastActions}
                        listIndex={index}
                        refetch={refetch}
                        row={row}
                        rowCaptionComponent={rowCaptionComponent}
                        setSize={setRowSize}
                        style={style}
                        onRowClick={onRowClick}
                        onRowDoubleClick={onRowDoubleClick}
                      />
                    );
                  }}
                </VariableSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </LayoutScroll>
    </Box>
  );
};

TableBody.displayName = 'TableBody';
