import type { CSSProperties } from 'react';
import React, { useCallback, useEffect, useRef } from 'react';
import type { Row as RowPure } from 'react-table';
import type { IExecuter } from '@platform/core';
import type { IActionWithAuth } from '@platform/services';
import { Box } from '@platform/ui';
import { Row } from '../components';
import type { ICaptionRowComponentProps, IExpandedRowComponentProps, RecordCell } from '../types';

/** Свойства строки таблицы с бесконечным сколлингом. */
interface RowForInfiniteScrollProps<T> {
  /** Исполнитель экшенов. */
  executor: IExecuter<unknown>;
  /** Геттер кнопок раскрытой строки. */
  expandedRowActionsGetter?(row: T): IActionWithAuth[];
  /** Компонент раскрытой строки. */
  expandedRowComponent?: React.FC<IExpandedRowComponentProps<T>>;
  /** Геттер быстрых кнопок строки. */
  fastActions?: IActionWithAuth[] | ((row: T) => IActionWithAuth[]);
  /** Индекс списка. */
  listIndex: number;
  /** Признак процесса загрузки данных. */
  loading?: boolean;
  /** Обработчик одинарного клика по строке. */
  onRowClick?(row: T): void;
  /** Обработчик двойного клика по строке. */
  onRowDoubleClick?(row: T): void;
  /** Функция запроса данных с сервера. */
  refetch(): void;
  /** Данные строки. */
  row: RowPure<RecordCell>;
  /** Контент подписи к строке (располагается внизу строки). */
  rowCaptionComponent?: React.FC<ICaptionRowComponentProps<T>>;
  /** Колбэк установки размера строки. */
  setSize(index: number, height?: number): void;
  /** CSS-стили строки для позиционирования. */
  style: CSSProperties;
  /** Признак отображения только выбранных строк. */
  visibleOnlySelectedRows?: boolean;
}

/** Компонент строки таблицы с бесконечным сколлингом. */
export const InfiniteRow = <T,>({
  executor,
  expandedRowActionsGetter,
  expandedRowComponent,
  fastActions,
  listIndex,
  refetch,
  onRowClick,
  onRowDoubleClick,
  row,
  rowCaptionComponent,
  setSize,
  style,
  visibleOnlySelectedRows,
}: RowForInfiniteScrollProps<T>) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => setSize(listIndex, ref.current?.getBoundingClientRect().height), [listIndex, setSize]);

  const setRefRow = useCallback(element => {
    ref.current = element;
  }, []);

  const { key } = row.getRowProps();

  const visibleRow = visibleOnlySelectedRows ? row.isSelected : true;

  return visibleRow ? (
    <Box key={key} className="InfiniteRow" style={style}>
      <Row<T>
        executor={executor}
        expandedRowActionsGetter={expandedRowActionsGetter}
        expandedRowComponent={expandedRowComponent}
        fastActions={fastActions}
        refetch={refetch}
        row={row}
        rowCaptionComponent={rowCaptionComponent}
        setRefRow={setRefRow}
        onRowClick={onRowClick}
        onRowDoubleClick={onRowDoubleClick}
      />
    </Box>
  ) : null;
};

InfiniteRow.displayName = 'InfiniteRow';
