import type { CSSProperties } from 'react';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import type { TableBodyProps as TableBodyPropsPure, TableInstance } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import type { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import type { IExecuter } from '@platform/core';
import type { IActionWithAuth } from '@platform/services';
import { Box, Spinner } from '@platform/ui';
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
  /** Высота хедера. */
  headerHeight: number;
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
  /** Реф списка строк таблицы. */
  rowListRef: React.MutableRefObject<List | undefined>;
  /** Экземпляр таблицы. */
  tableInstance: TableInstance<RecordCell>;
  /** Признак отображения только выбранных строк. */
  visibleOnlySelectedRows?: boolean;
}

const MINIMUM_BATCH_SIZE = 8;
const THRESHOLD = 4;

/** Свойства блока контента тела таблицы (строки и лоадер). */
interface TableBodyContentProps {
  /** CSS-стили. */
  style: CSSProperties;
  /** Строки таблицы. */
  children: React.ReactElement;
}

/** Компонент тела таблицы с бесконечным скроллингом. */
export const TableBody = <T,>({
  executor,
  expandedRowActionsGetter,
  expandedRowComponent,
  fastActions,
  headerHeight,
  loading,
  loadingMore,
  needScrollToTop,
  onLoadMoreRows,
  onRowClick,
  onRowDoubleClick,
  refetch,
  rowCaptionComponent,
  rowListRef,
  tableInstance,
  visibleOnlySelectedRows,
}: TableBodyWithInfiniteScrollProps<T>): React.ReactElement => {
  const { allColumns, canNextPage, getTableBodyProps, prepareRow, rows, totalColumnsWidth, visibleColumns } = tableInstance;

  const rowSizeMap = useRef<Record<string, number>>({});

  const loadMoreRows = useCallback(
    (startIndex, endIndex) =>
      new Promise<void>(resolve => {
        if (!visibleOnlySelectedRows && !loadingMore && !loading && canNextPage && rows.length - endIndex <= THRESHOLD) {
          onLoadMoreRows();
        }

        resolve();
      }),
    [canNextPage, loading, loadingMore, onLoadMoreRows, rows.length, visibleOnlySelectedRows]
  );

  const itemCount = useMemo(() => {
    if (visibleOnlySelectedRows) {
      return rows.length;
    }

    return canNextPage ? rows.length + 1 : rows.length;
  }, [canNextPage, rows.length, visibleOnlySelectedRows]);

  const getItemSize = useCallback(index => rowSizeMap.current[index] || 0, []);

  const setRowSize = useCallback(
    (index: number, size: number) => {
      rowSizeMap.current = { ...rowSizeMap.current, [index]: size };
      rowListRef.current?.resetAfterIndex(index);
    },
    [rowListRef]
  );

  useEffect(() => {
    if (needScrollToTop) {
      rowListRef.current?.scrollToItem(0);
    }
  }, [needScrollToTop, rowListRef]);

  const tableBodyContent = forwardRef<any, TableBodyContentProps>(({ style, children }, ref) => (
    <>
      <Box ref={ref} style={style}>
        {children}
      </Box>

      {loadingMore && (
        <Box style={{ height: 120 }}>
          <Spinner small={false} />
        </Box>
      )}
    </>
  ));

  tableBodyContent.displayName = 'TableBodyContent';

  return (
    <Box {...getTableBodyProps({ style: { height: `calc(100% - ${headerHeight}px)`, width: '100%' } })}>
      <AutoSizer style={{ height: '100%', width: allColumns.length === visibleColumns.length ? totalColumnsWidth : '100%' }}>
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
                  rowListRef.current = list;
                }}
                height={height}
                innerElementType={tableBodyContent}
                itemCount={itemCount}
                itemSize={getItemSize}
                style={{ overflow: undefined }}
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
                      visibleOnlySelectedRows={visibleOnlySelectedRows}
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
    </Box>
  );
};

TableBody.displayName = 'TableBody';
