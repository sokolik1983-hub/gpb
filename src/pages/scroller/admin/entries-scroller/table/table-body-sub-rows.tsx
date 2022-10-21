import React from 'react';
import { Row } from 'platform-copies/services/components/data-table/components';
import type { IBaseEntity } from '@platform/services';
import { Box } from '@platform/ui';
import type { TableBodySubRowsProps } from './types';

/** Компонент для отображения подгруппы тела таблицы. */
export const TableBodySubRows = <R extends IBaseEntity>({
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
  subRows,
}: TableBodySubRowsProps<R>): React.ReactElement => {
  const { prepareRow } = tableInstance;

  return (
    <Box>
      {subRows.map((subRow, rowIndex) => {
        prepareRow(subRow);

        const { key } = subRow.getRowProps();

        const visibleRow = visibleOnlySelectedRows ? subRow.isSelected : true;

        return (
          visibleRow && (
            <Row<R>
              key={key}
              executor={executor}
              expandedRowActionsGetter={expandedRowActionsGetter}
              expandedRowComponent={expandedRowComponent}
              fastActions={fastActions}
              last={rowIndex === subRows.length - 1}
              refetch={refetch}
              row={subRow}
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

TableBodySubRows.displayName = 'TableBodySubRows';
