import React, { useContext } from 'react';
import cn from 'classnames';
import { AccessibilityContext } from 'components/scroller-table-view/accessibility';
import { SortArrow } from 'components/scroller-table-view/sort-arrow';
import type { RecordCell } from 'components/scroller-table-view/types';
import { getCellPaddingClass } from 'components/scroller-table-view/utils';
import { HEADER_ALIGN } from 'interfaces';
import type { ColumnInstance } from 'react-table';
import { SORT_DIRECTION } from '@platform/services';
import { ACTIONS, Box, Horizon, ROLE, Typography, WithClickable } from '@platform/ui';
import css from './styles.scss';

/** Свойства ячейки шапки таблицы. */
interface HeaderCellProps {
  /** Свойства и методы колонки. */
  column: ColumnInstance<RecordCell>;
  /** Признак мультисортировки. */
  disableMultiSort: boolean;
  /** Признак последней ячейки. */
  isLastColumn: boolean;
}

/** Компонент ячейки шапки таблицы. */
export const HeaderCell: React.FC<HeaderCellProps> = ({ column, disableMultiSort, isLastColumn }) => {
  const {
    canResize,
    canSort,
    depth,
    getHeaderProps,
    getResizerProps,
    getSortByToggleProps,
    headerAlign = HEADER_ALIGN.LEFT,
    id,
    innerFocus,
    isSorted,
    isSortedDesc,
    paddingType,
    render,
  } = column;

  const sortByToggleProps = getSortByToggleProps();

  // Удаляется дефолтный title, (если его не удалить, то он отображается при наведении).
  sortByToggleProps.title = undefined;

  // Если выравнивание заголовка по левому краю, то стрелка расположена справа.
  const isSortArrowRight = headerAlign === HEADER_ALIGN.LEFT;

  const { getHeaderCellAccessibilityProps, getCellAccessibilityInnerFocusProps } = useContext(AccessibilityContext);

  const { className, style } = getHeaderProps();

  return (
    <th
      className={cn(className, getCellPaddingClass(paddingType), css.headerCell)}
      style={style}
      {...getHeaderCellAccessibilityProps({ columnId: id, depth, descending: isSortedDesc })}
    >
      <WithClickable>
        {(ref, { hovered }) => (
          <Horizon
            ref={ref}
            align={'CENTER'}
            data-action={ACTIONS.SORT_DIRECTION}
            data-direction={isSortedDesc ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC}
            role={ROLE.BUTTON}
            {...sortByToggleProps}
          >
            {/* Стрелка показывающая сортировку. */}

            {!isSortArrowRight && <Horizon.Spacer />}

            {!isSortArrowRight && canSort && (isSorted || hovered) && <SortArrow column={column} disableMultiSort={disableMultiSort} />}

            {/* Текстовое содержимое заголовка таблицы. */}
            <Typography.TextBold>{render('Header', innerFocus ? { getCellAccessibilityInnerFocusProps } : {})}</Typography.TextBold>

            {/* Стрелка показывающая сортировку. */}
            {isSortArrowRight && canSort && (isSorted || hovered) && <SortArrow column={column} disableMultiSort={disableMultiSort} />}

            {isSortArrowRight && <Horizon.Spacer />}
          </Horizon>
        )}
      </WithClickable>

      {/* Разделитель колонок таблицы, после последней колонки не отображается. */}
      {!isLastColumn && canResize && <Box {...getResizerProps()} className={css.headerColumnDelimiter} />}
    </th>
  );
};

HeaderCell.displayName = 'HeaderCell';
