import type { FC } from 'react';
import React from 'react';
import cn from 'classnames';
import { getCellPaddingClass } from 'components/scroller-table-view/utils';
import { HEADER_ALIGN } from 'interfaces';
import type { HeaderGroup } from 'react-table';
import { Box, WithClickable, Typography, Horizon } from '@platform/ui';
import { SortArrow } from './sort-arrow';
import css from './styles.scss';

/** Свойства компонента TableHeader. */
export interface ITableHeaderProps {
  /** Заголовки таблицы. */
  headerGroups: Array<HeaderGroup<Record<string, any>>>;
  /** Если true - то мультисортировка отключена. */
  disableMultiSort: boolean;
}

/** Шапка таблицы. */
export const TableHeader: FC<ITableHeaderProps> = ({ headerGroups, disableMultiSort }) => (
  <Box className={css.headerRowWrapper}>
    {headerGroups.map(headerGroup => {
      const { key: headerGroupKey, ...restHeaderGroupKey } = headerGroup.getHeaderGroupProps();

      return (
        <Box key={headerGroupKey} {...restHeaderGroupKey} className={css.headerRow}>
          {headerGroup.headers.map((column, index) => {
            const {
              getHeaderProps,
              canSort,
              isSorted,
              render,
              canResize,
              getResizerProps,
              paddingType,
              headerAlign = HEADER_ALIGN.LEFT,
            } = column;

            const { key: columnKey, ...restHeaderProps } = getHeaderProps();

            const isLastColumn = index === headerGroup.headers.length - 1;

            const sortByToggleProps = column.getSortByToggleProps();

            // Удаляется дефолтный title, (если его не удалить, то он отображается при наведении).
            sortByToggleProps.title = undefined;

            // Если выравнивание заголовка по левому краю, то стрелка расположена справа.
            const isSortArrowRight = headerAlign === HEADER_ALIGN.LEFT;

            return (
              <Box key={columnKey} {...restHeaderProps} className={cn(getCellPaddingClass(paddingType), css.headerCell)}>
                <WithClickable>
                  {(ref, { hovered }) => (
                    <Horizon ref={ref} {...sortByToggleProps} align={'CENTER'}>
                      {/* Стрелка показывающая сортировку. */}

                      {!isSortArrowRight && <Horizon.Spacer />}

                      {!isSortArrowRight && canSort && (isSorted || hovered) && (
                        <SortArrow column={column} disableMultiSort={disableMultiSort} />
                      )}

                      {/* Текстовое содержимое заголовка таблицы. */}
                      <Typography.TextBold>{render('Header')}</Typography.TextBold>

                      {/* Стрелка показывающая сортировку. */}
                      {isSortArrowRight && canSort && (isSorted || hovered) && (
                        <SortArrow column={column} disableMultiSort={disableMultiSort} />
                      )}

                      {isSortArrowRight && <Horizon.Spacer />}
                    </Horizon>
                  )}
                </WithClickable>

                {/* Разделитель колонок таблицы, после последней колонки не отображается. */}
                {!isLastColumn && canResize && <Box {...getResizerProps()} className={css.headerColumnDelimiter} />}
              </Box>
            );
          })}
        </Box>
      );
    })}
  </Box>
);

TableHeader.displayName = 'TableHeader';
