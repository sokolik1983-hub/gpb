import React from 'react';
import cn from 'classnames';
import type { IFocusParentNodeProps } from 'components/focus-tree';
import { FocusNode, NODE_TYPE } from 'components/focus-tree';
import type { Cell as CellPure } from 'react-table';
import { Adjust } from '@platform/ui';
import css from '../styles.scss';
import type { RecordCell } from '../types';

/** Свойства компонента ячейки таблицы. */
interface CellProps extends CellPure<RecordCell>, IFocusParentNodeProps {
  /** Признак первой ячейки в строке. */
  first?: boolean;
  /** Функция запроса данных с сервера. */
  refetch(): void;
}

/** Отступы первой ячейки. */
const firstCellPadding = Adjust.getPadClass(['X2S', null, 'X2S', null]);

/** Компонент ячейки таблицы. */
export const Cell: React.FC<CellProps> = ({ column, first, getCellProps, refetch, render, nodesIds: [nodeId, parentId] }) => (
  <FocusNode
    className={cn(first ? firstCellPadding : css.cellPadding)}
    data-field={column.id}
    {...getCellProps()}
    nodeId={nodeId}
    parentId={parentId}
    type={NODE_TYPE.HORIZONTAL}
  >
    {render('Cell', { refetch })}
  </FocusNode>
);

Cell.displayName = 'Cell';
