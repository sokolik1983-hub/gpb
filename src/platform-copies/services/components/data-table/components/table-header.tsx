import React from 'react';
import { locale } from 'localization';
import type { TableInstance } from 'react-table';
import type { IColumnsStorageObject } from '@platform/core';
import { ACTIONS, Box, Gap, Horizon, ROLE, ServiceIcons, Typography, WithClickable, WithInfoTooltip } from '@platform/ui';
import { MIN_WIDTH } from '../constants';
import css from '../styles.scss';
import type { RecordCell } from '../types';
import { HEADER_ALIGN } from '../types';
import { SettingsButton } from './settings-button';

/** Свойства хедера таблицы. */
interface TableHeaderProps {
  /** Экземпляр таблицы. */
  tableInstance: TableInstance<RecordCell>;
  /** Функция изменения настроек для колонок. */
  setSettingsColumns(value: IColumnsStorageObject[]): void;
  /** Настройки для колонок. */
  settingColumns: IColumnsStorageObject[];
  /** Флаг отображения кнопки настроек колонок таблицы. */
  showSettingsButton?: boolean;
}

/** Хедер таблицы. */
export const TableHeader: React.FC<TableHeaderProps> = ({
  tableInstance,
  tableInstance: { headerGroups },
  settingColumns,
  setSettingsColumns,
  showSettingsButton,
}) => (
  <>
    {headerGroups.map(headerGroup => (
      // eslint-disable-next-line react/jsx-key
      <Box
        {...headerGroup.getHeaderGroupProps({ role: ROLE.GRID_HEADER })}
        style={{ ...headerGroup.getHeaderGroupProps().style, minWidth: MIN_WIDTH, position: 'relative' }}
      >
        {headerGroup.headers.map((column, index) => {
          const SortIcon = column.isSortedDesc ? ServiceIcons.ArrowDown : ServiceIcons.ArrowUp;

          const isFirstColumn = index === 0;
          const isSecondColumn = index === 1;
          const isLastColumn = index === headerGroup.headers.length - 1;

          const sortByToggleProps = column.getSortByToggleProps();

          delete sortByToggleProps.title;

          const sortIndex = column.sortedIndex + 1;
          let sortDirection = '';

          if (column.isSorted) {
            sortDirection = column.isSortedDesc ? 'desc' : 'asc';
          }

          const columnResizerProps = column.getResizerProps ? column.getResizerProps() : { style: {} };

          return (
            // eslint-disable-next-line react/jsx-key
            <Box data-name={column.id} {...column.getHeaderProps()}>
              <WithClickable>
                {(ref, { hovered }) => (
                  <Horizon
                    ref={ref}
                    data-action={ACTIONS.SORT_DIRECTION}
                    data-direction={sortDirection}
                    data-role={ROLE.BUTTON}
                    {...sortByToggleProps}
                    align={'CENTER'}
                    className={css.header}
                  >
                    {column.headerAlign === HEADER_ALIGN.RIGHT && <Box className={css.headerLeftGap} />}
                    {!isFirstColumn && !isSecondColumn && <Gap.SM />}
                    <Typography.TextBold line="COLLAPSE">{column.render('Header')}</Typography.TextBold>
                    {!isFirstColumn && column.canSort && (
                      <WithInfoTooltip extraSmall text={locale.column.tooltip}>
                        {tooltipRef => (
                          <Box ref={tooltipRef} className={css.sortIconWrapper}>
                            {(hovered || column.isSorted) && <SortIcon fill={column.isSorted ? 'ACCENT' : 'FAINT'} scale="SM" />}
                            {column.isSorted && Boolean(sortIndex) && (
                              <Typography.SmallText inline className={css.sortIndex} fill={'ACCENT'}>
                                {sortIndex}
                              </Typography.SmallText>
                            )}
                          </Box>
                        )}
                      </WithInfoTooltip>
                    )}
                    <Gap.SM />
                  </Horizon>
                )}
              </WithClickable>
              {!isFirstColumn && !isLastColumn && (
                <Box
                  border={['FAINT', 'SM']}
                  className={css.verticalSeparator}
                  {...columnResizerProps}
                  style={{
                    ...columnResizerProps.style,

                    borderTop: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                  }}
                  title={''}
                />
              )}
            </Box>
          );
        })}
        {showSettingsButton && (
          <SettingsButton setSettingsColumns={setSettingsColumns} settingColumns={settingColumns} tableInstance={tableInstance} />
        )}
      </Box>
    ))}
  </>
);

TableHeader.displayName = 'TableHeader';
