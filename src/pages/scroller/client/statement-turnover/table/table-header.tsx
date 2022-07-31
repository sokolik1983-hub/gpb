import type { FC } from 'react';
import React from 'react';
import { FocusNode, NODE_TYPE } from 'components/focus-tree';
import type { IGroupedAccounts } from 'interfaces/dto';
import type { HeaderGroup } from 'react-table';
import { COMMON_SCROLLER_NODE, DATA_TABLE_COLUMN_NODE } from 'stream-constants/a11y-nodes';
import { Box, ServiceIcons, WithClickable, Typography, Horizon } from '@platform/ui';
import { COLUMN_NAMES } from './constants';
import css from './styles.scss';

/** Свойства компонента TableHeader. */
export interface ITableHeaderProps {
  /** Заголовки таблицы. */
  headerGroups: Array<HeaderGroup<IGroupedAccounts>>;
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

            const isRightAlign = column.id !== COLUMN_NAMES.ORGANIZATION_NAME && column.id !== COLUMN_NAMES.ACCOUNT_NUMBER;

            return (
              <FocusNode
                key={columnKey}
                nodeId={`${DATA_TABLE_COLUMN_NODE}-${columnKey}`}
                parentId={COMMON_SCROLLER_NODE}
                type={NODE_TYPE.HORIZONTAL}
              >
                <Box {...restHeaderProps} className={css.headerCell}>
                  <WithClickable>
                    {(ref, { hovered }) => (
                      <Horizon ref={ref} {...sortByToggleProps} align={'CENTER'}>
                        {isRightAlign && <Horizon.Spacer />}

                        {/* Стрелка показывающая сортировку. */}
                        {column.canSort && (column.isSorted || hovered) && (
                          <Box className={css.sortIconWrapper}>
                            <SortIcon fill={column.isSorted ? 'ACCENT' : 'FAINT'} scale="SM" />
                          </Box>
                        )}

                        {/* Текстовое содержимое заголовка таблицы. */}
                        <Typography.TextBold>{column.render('Header')}</Typography.TextBold>
                      </Horizon>
                    )}
                  </WithClickable>

                  {/* Разделитель колонок таблицы, после последней колонки не отображается. */}
                  {!isLastColumn && <Box {...column.getResizerProps()} className={css.headerColumnDelimiter} />}
                </Box>
              </FocusNode>
            );
          })}
        </Box>
      );
    })}
  </Box>
);

TableHeader.displayName = 'TableHeader';
