import React from 'react';
import { AccordionGroup, AccordionItem } from 'components/common';
import { AggregateByAccountData } from 'pages/scroller/admin/entries-scroller/components/aggregate-by-account-data';
import { COMMON_SCROLLER_NODE, TURNOVERS_SCROLLER_ROW_CATEGORY_NODE } from 'stream-constants/a11y-nodes';
import type { IBaseEntity } from '@platform/services';
import { Box } from '@platform/ui';
import { AggregateByAccountHeaderRow } from '../components/aggregate-by-account-header-row';
import { TableBodySubRows } from './table-body-sub-rows';
import type { TableBodyPropsWithGrouping } from './types';

/** Компонент для отображения тела таблицы. */
export const TableBodyWithGrouping = <R extends IBaseEntity>({
  executor,
  expandedRowActionsGetter,
  expandedRowComponent,
  fastActions,
  refetch,
  rowCaptionComponent,
  tableInstance,
  visibleOnlySelectedRows,
  withGrouping,
  onRowClick,
  onRowDoubleClick,
  onSelectedRowsChange,
}: TableBodyPropsWithGrouping<R>): React.ReactElement => {
  const { getTableBodyProps, rows, prepareRow } = tableInstance;

  return (
    <AccordionGroup {...getTableBodyProps()}>
      <Box>
        {rows
          .filter(x => x.depth === 0)
          .map(row => {
            prepareRow(row);

            const { subRows, getRowProps, isExpanded, toggleRowExpanded, isSelected } = row;

            const { key } = getRowProps();
            const visibleRow = visibleOnlySelectedRows ? isSelected : true;

            if (visibleRow && !withGrouping) {
              return (
                <TableBodySubRows<R>
                  executor={executor}
                  expandedRowActionsGetter={expandedRowActionsGetter}
                  expandedRowComponent={expandedRowComponent}
                  fastActions={fastActions}
                  refetch={refetch}
                  rowCaptionComponent={rowCaptionComponent}
                  subRows={subRows}
                  tableInstance={tableInstance}
                  visibleOnlySelectedRows={visibleOnlySelectedRows}
                  onRowClick={onRowClick}
                  onRowDoubleClick={onRowDoubleClick}
                  onSelectedRowsChange={onSelectedRowsChange}
                />
              );
            }

            return (
              visibleRow && (
                <AccordionItem
                  key={key}
                  expand={toggleRowExpanded}
                  header={<AggregateByAccountHeaderRow row={row} />}
                  isExpanded={isExpanded}
                  nodesIds={[`${TURNOVERS_SCROLLER_ROW_CATEGORY_NODE}-${key}`, COMMON_SCROLLER_NODE]}
                  panel={
                    <>
                      <AggregateByAccountData row={row} />
                      <TableBodySubRows<R>
                        executor={executor}
                        expandedRowActionsGetter={expandedRowActionsGetter}
                        expandedRowComponent={expandedRowComponent}
                        fastActions={fastActions}
                        refetch={refetch}
                        rowCaptionComponent={rowCaptionComponent}
                        subRows={subRows}
                        tableInstance={tableInstance}
                        visibleOnlySelectedRows={visibleOnlySelectedRows}
                        onRowClick={onRowClick}
                        onRowDoubleClick={onRowDoubleClick}
                        onSelectedRowsChange={onSelectedRowsChange}
                      />
                    </>
                  }
                />
              )
            );
          })}
      </Box>
    </AccordionGroup>
  );
};

TableBodyWithGrouping.displayName = 'TableBodyWithGrouping';
