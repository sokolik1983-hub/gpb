import React, { useContext } from 'react';
import cn from 'classnames';
import { AccessibilityContext } from 'components/scroller-table-view/accessibility';
import type { RecordCell } from 'components/scroller-table-view/types';
import { getCellPaddingClass } from 'components/scroller-table-view/utils';
import type { Cell as CellPure } from 'react-table';

/** Компонент ячейки таблицы. */
export const Cell: React.FC<CellPure<RecordCell>> = ({ column: { id, innerFocus, paddingType }, getCellProps, render, row }) => {
  const { className, style } = getCellProps();

  const { getCellAccessibilityProps, getCellAccessibilityInnerFocusProps } = useContext(AccessibilityContext);

  return (
    <td className={cn(className, getCellPaddingClass(paddingType))} style={style} {...getCellAccessibilityProps(row.index, id)}>
      {render('Cell', innerFocus ? { getCellAccessibilityInnerFocusProps } : {})}
    </td>
  );
};

Cell.displayName = 'Cell';
