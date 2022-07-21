import React from 'react';
import type { TableBodyProps as TableBodyPropsPure, TableInstance } from 'react-table';
import type { IExecuter } from '@platform/core';
import type { IActionWithAuth } from '@platform/services';
import { Box } from '@platform/ui';
import { Row } from '../components';
import type { ICaptionRowComponentProps, IExpandedRowComponentProps, RecordCell } from '../types';

/** Свойства компонента тела таблицы. */
interface TableBodyProps<T> extends TableBodyPropsPure {
  /** Исполнитель экшенов. */
  executor: IExecuter<unknown>;
  /** Геттер кнопок раскрытой строки. */
  expandedRowActionsGetter?(row: T): IActionWithAuth[];
  /** Компонент раскрытой строки. */
  expandedRowComponent?: React.FC<IExpandedRowComponentProps<T>>;
  /** Геттер быстрых кнопок строки. */
  fastActions?: IActionWithAuth[] | ((row: T) => IActionWithAuth[]);
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
  /** Признак отображения только выбранных строк. */
  visibleOnlySelectedRows?: boolean;
}

/** Компонент тела таблицы. */
export const TableBody = <T,>({
  executor,
  expandedRowActionsGetter,
  expandedRowComponent,
  fastActions,
  onRowClick,
  onRowDoubleClick,
  refetch,
  rowCaptionComponent,
  tableInstance,
  visibleOnlySelectedRows,
}: TableBodyProps<T>): React.ReactElement => {
  const { getTableBodyProps, page, prepareRow } = tableInstance;

  return (
    <Box {...getTableBodyProps()}>
      {page.map((row, rowIndex) => {
        prepareRow(row);

        const { key } = row.getRowProps();

        const visibleRow = visibleOnlySelectedRows ? row.isSelected : true;

        return (
          visibleRow && (
            <Row<T>
              key={key}
              executor={executor}
              expandedRowActionsGetter={expandedRowActionsGetter}
              expandedRowComponent={expandedRowComponent}
              fastActions={fastActions}
              last={rowIndex === page.length - 1}
              refetch={refetch}
              row={row}
              rowCaptionComponent={rowCaptionComponent}
              onRowClick={onRowClick}
              onRowDoubleClick={onRowDoubleClick}
            />
          )
        );
      })}
    </Box>
  );
};

TableBody.displayName = 'TableBody';
