import type { FC } from 'react';
import React from 'react';
import type { HeaderGroup } from 'react-table';
import { Box, ServiceIcons, WithClickable, Typography, Horizon } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента TableHeader. */
export interface ITableHeaderProps {
  /** Заголовки таблицы. */
  headerGroups: Array<HeaderGroup<Record<string, any>>>;
}

/** Шапка таблицы. */
export const TableHeader: FC<ITableHeaderProps> = ({ headerGroups }) => (
  <Box className={css.headerRowWrapper}>
    {headerGroups.map(headerGroup => {
      const { key: headerGroupKey, ...restHeaderGroupKey } = headerGroup.getHeaderGroupProps();

      return (
        <Box key={headerGroupKey} {...restHeaderGroupKey} className={css.headerRow}>
          {headerGroup.headers.map((column, index) => {
            const { key: columnKey, ...restHeaderProps } = column.getHeaderProps();

            const SortIcon = column.isSortedDesc ? ServiceIcons.ArrowDown : ServiceIcons.ArrowUp;

            const isLastColumn = index === headerGroup.headers.length - 1;

            const sortByToggleProps = column.getSortByToggleProps();

            // Удаляется дефолтный title, (если его не удалить, то он отображается при наведении).
            sortByToggleProps.title = undefined;

            return (
              <Box key={columnKey} {...restHeaderProps} className={css.headerCell}>
                <WithClickable>
                  {(ref, { hovered }) => (
                    <Horizon ref={ref} {...sortByToggleProps} align={'CENTER'}>
                      {/* Текстовое содержимое заголовка таблицы. */}
                      <Typography.TextBold>{column.render('Header')}</Typography.TextBold>

                      {/* Стрелка показывающая сортировку. */}
                      {column.canSort && (column.isSorted || hovered) && (
                        <Box className={css.sortIconWrapper}>
                          <SortIcon fill={column.isSorted ? 'ACCENT' : 'FAINT'} scale="SM" />
                        </Box>
                      )}

                      <Horizon.Spacer />
                    </Horizon>
                  )}
                </WithClickable>

                {/* Разделитель колонок таблицы, после последней колонки не отображается. */}
                {!isLastColumn && <Box {...column.getResizerProps()} className={css.headerColumnDelimiter} />}
              </Box>
            );
          })}
        </Box>
      );
    })}
  </Box>
);

TableHeader.displayName = 'TableHeader';
