import type { FC } from 'react';
import React from 'react';
import cn from 'classnames';
import { getCellPaddingClass } from 'components/scroller-table-view/utils';
import { locale } from 'localization';
import type { HeaderGroup } from 'react-table';
import { Box, ServiceIcons, WithClickable, Typography, Horizon, WithInfoTooltip } from '@platform/ui';
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
              sortedIndex,
              isSortedDesc,
              canSort,
              isSorted,
              render,
              canResize,
              getResizerProps,
              paddingType,
            } = column;

            const { key: columnKey, ...restHeaderProps } = getHeaderProps();

            const SortIcon = isSortedDesc ? ServiceIcons.ArrowDown : ServiceIcons.ArrowUp;

            const isLastColumn = index === headerGroup.headers.length - 1;

            const sortByToggleProps = column.getSortByToggleProps();

            // Удаляется дефолтный title, (если его не удалить, то он отображается при наведении).
            sortByToggleProps.title = undefined;

            // Индексы сортировки начинаются с нуля, если сортировка не задана то индекс равен -1
            const sortIndex = sortedIndex + 1;

            return (
              <Box key={columnKey} {...restHeaderProps} className={cn(getCellPaddingClass(paddingType), css.headerCell)}>
                <WithClickable>
                  {(ref, { hovered }) => (
                    <Horizon ref={ref} {...sortByToggleProps} align={'CENTER'}>
                      {/* Текстовое содержимое заголовка таблицы. */}
                      <Typography.TextBold>{render('Header')}</Typography.TextBold>

                      {/* Стрелка показывающая сортировку. */}
                      {canSort && (isSorted || hovered) && (
                        <WithInfoTooltip extraSmall text={locale.table.header.sortInfo}>
                          {tooltipRef => (
                            // textOverflow: "ellipsis" добавляется чтобы убрать тултип.
                            <Box
                              ref={tooltipRef}
                              className={css.sortIconWrapper}
                              style={{ textOverflow: disableMultiSort ? 'ellipsis' : undefined }}
                            >
                              <SortIcon fill={isSorted ? 'ACCENT' : 'FAINT'} scale="SM" />
                              {!disableMultiSort && Boolean(sortIndex) && (
                                <Typography.SmallText inline className={css.sortIndex} fill={'ACCENT'}>
                                  {sortIndex}
                                </Typography.SmallText>
                              )}
                            </Box>
                          )}
                        </WithInfoTooltip>
                      )}

                      <Horizon.Spacer />
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
