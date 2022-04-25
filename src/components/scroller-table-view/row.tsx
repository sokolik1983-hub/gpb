import React, { useCallback, useContext } from 'react';
import cn from 'classnames';
import { AccessibilityContext } from 'components/scroller-table-view/accessibility';
import { Cell } from 'components/scroller-table-view/cell';
import type { RecordCell } from 'components/scroller-table-view/types';
import type { Row as RowPure } from 'react-table';
import { getHandlerDependingOnSelection } from 'utils';
import { Box, WithClickable } from '@platform/ui';
import css from './styles.scss';

/** Свойства строки таблицы. */
interface RowProps extends RowPure<RecordCell> {
  onClick?(row: RecordCell): void;
}

/** Компонент строки таблицы. */
export const Row: React.FC<RowProps> = ({ cells, getRowProps, onClick, original }) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      const clickHandler = getHandlerDependingOnSelection(onClick);

      clickHandler(original);
    }
  }, [onClick, original]);

  const { className, style } = getRowProps();

  const { getRowAccessibilityProps } = useContext(AccessibilityContext);

  return (
    <tr className={className} style={style} {...getRowAccessibilityProps()}>
      <WithClickable>
        {(ref, { hovered }) => (
          <Box ref={ref} className={cn(css.row, css.clickableRow)} fill={hovered ? 'FAINT' : 'BASE'} style={style} onClick={handleClick}>
            {cells.map(cell => (
              <Cell key={cell.column.id} {...cell} />
            ))}
          </Box>
        )}
      </WithClickable>
    </tr>
  );
};

Row.displayName = 'Row';
