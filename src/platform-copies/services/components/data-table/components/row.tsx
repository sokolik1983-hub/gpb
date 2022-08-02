import React, { useMemo } from 'react';
import { FocusNode } from 'components/focus-tree';
import type { Row as RowPure } from 'react-table';
import { COMMON_SCROLLER_NODE, DATA_TABLE_ROW_CELL_NODE, DATA_TABLE_ROW_NODE } from 'stream-constants/a11y-nodes';
import type { IExecuter } from '@platform/core';
import { getActionButtons } from '@platform/core';
import type { IActionWithAuth } from '@platform/services';
import { useAuth } from '@platform/services';
import { Box, FastActionsPanel, noop, WithClickable } from '@platform/ui';
import { MIN_WIDTH } from '../constants';
import css from '../styles.scss';
import type { ICaptionRowComponentProps, IExpandedRowComponentProps } from '../types';
import { Cell } from './cell';

/** Свойства строки таблицы. */
interface RowProps<T> {
  row: RowPure<Record<string, any>>;
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
  /** Реф на элемент строки. */
  setRefRow?: React.RefCallback<HTMLDivElement>;
  /** Функция запроса данных с сервера. */
  refetch(): void;
  /** Контент подписи к строке (располагается внизу строки). */
  rowCaptionComponent?: React.FC<ICaptionRowComponentProps<T>>;
  /** Признак последней строки. */
  last?: boolean;
}

/** Компонент строки таблицы. */
export const Row = <T,>({
  executor,
  expandedRowComponent: ExpandedRowComponent,
  expandedRowActionsGetter,
  fastActions = () => [],
  last,
  onRowClick = noop,
  onRowDoubleClick = noop,
  setRefRow,
  refetch,
  row,
  row: { cells, getRowProps, isExpanded, original },
  rowCaptionComponent: RowCaptionComponent,
}: RowProps<T>): React.ReactElement => {
  const { getAvailableActions } = useAuth();

  const fastActionGetter = useMemo(() => (typeof fastActions === 'function' ? fastActions : () => fastActions), [fastActions]);

  const handleRowClick = React.useCallback(item => () => onRowClick(item.original), [onRowClick]);

  const handleRowDoubleClick = React.useCallback(item => () => onRowDoubleClick(item.original), [onRowDoubleClick]);

  const rowActionButtons = getActionButtons(getAvailableActions(fastActionGetter(original)), executor, [[original]]).filter(
    ({ disabled }) => !disabled
  );

  const extendedRowActionButtons = expandedRowActionsGetter
    ? getActionButtons(getAvailableActions(expandedRowActionsGetter(original)), executor, [[original]])
    : [];

  const { key: rowKey, style: rowStyle, ...restRowProps } = getRowProps();

  return (
    <WithClickable key={rowKey}>
      {(ref, { hovered }) => (
        <React.Fragment key={`rowLayout_${rowKey}`}>
          <div ref={setRefRow}>
            <FocusNode
              ref={ref}
              border={['FAINT', 'SM']}
              className={css.row}
              data-id={original.id}
              nodeId={`${DATA_TABLE_ROW_NODE}-${row.index}`}
              parentId={COMMON_SCROLLER_NODE}
              {...restRowProps}
              key={`row_${rowKey}`}
              aria-expanded={isExpanded}
              fill={hovered ? 'FAINT' : 'BASE'}
              style={{
                ...rowStyle,
                borderRight: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                minWidth: MIN_WIDTH,
              }}
              onClick={handleRowClick(row)}
              onDoubleClick={handleRowDoubleClick(row)}
            >
              <Box className={css.rowContent} style={{ display: 'flex' }}>
                {cells.map((cell, cellIndex) => {
                  const { key } = cell.getCellProps();

                  return (
                    <Cell
                      key={key}
                      {...cell}
                      first={cellIndex === 0 || cellIndex === 1}
                      nodesIds={[`${DATA_TABLE_ROW_CELL_NODE}-${row.index}-${cellIndex}`, `${DATA_TABLE_ROW_NODE}-${row.index}`]}
                      refetch={refetch}
                    />
                  );
                })}
                {hovered && <FastActionsPanel actions={rowActionButtons} />}
              </Box>
              {RowCaptionComponent ? <RowCaptionComponent row={row.original} /> : null}
              {ExpandedRowComponent && row.isExpanded ? (
                <ExpandedRowComponent
                  actions={extendedRowActionButtons}
                  row={row.original}
                  {...row.getRowProps()}
                  key={`expanded_${row.getRowProps().key}`}
                  style={{
                    ...rowStyle,
                    minWidth: MIN_WIDTH,
                  }}
                />
              ) : null}
            </FocusNode>
          </div>
          {last ? (
            <Box
              border={['FAINT', 'SM']}
              {...row.getRowProps()}
              key={`divider_${row.getRowProps().key}`}
              style={{
                ...rowStyle,
                borderTop: 'none',
                borderRight: 'none',
                borderLeft: 'none',
                minWidth: MIN_WIDTH,
              }}
            />
          ) : null}
        </React.Fragment>
      )}
    </WithClickable>
  );
};

Row.displayName = 'Row';
