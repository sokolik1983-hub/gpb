import React from 'react';
import cn from 'classnames';
import type { RecordCell } from 'platform-copies/services';
import { SettingsButton } from 'platform-copies/services/components/data-table/components/settings-button';
import type { TableInstance } from 'react-table';
import type { IColumnsStorageObject } from '@platform/core';
import { Box, ServiceIcons, WithClickable, Typography, Horizon } from '@platform/ui';
import { COLUMN_NAMES } from './constants';
import css from './styles.scss';

/** Свойства компонента TableHeader. */
export interface ITableHeaderProps<T extends RecordCell> {
  /** Функция изменения настроек для колонок. */
  setSettingsColumns(value: IColumnsStorageObject[]): void;
  /** Настройки для колонок. */
  settingColumns: IColumnsStorageObject[];
  /** Флаг отображения кнопки настроек колонок таблицы. */
  showSettingsButton?: boolean;
  /** Экземпляр таблицы. */
  tableInstance: TableInstance<T>;
}

/** Шапка таблицы. */
export const TableHeader = <T extends RecordCell>({
  tableInstance,
  setSettingsColumns,
  settingColumns,
  showSettingsButton,
}: ITableHeaderProps<T>) => (
  <Box className={css.headerRowWrapper}>
    {tableInstance.headerGroups.map(headerGroup => {
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
              <Box
                key={columnKey}
                {...restHeaderProps}
                className={cn(css.headerCell, { [css.settingButton]: isLastColumn && showSettingsButton })}
              >
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
            );
          })}
          {showSettingsButton && (
            <SettingsButton setSettingsColumns={setSettingsColumns} settingColumns={settingColumns} tableInstance={tableInstance} />
          )}
        </Box>
      );
    })}
  </Box>
);

TableHeader.displayName = 'TableHeader';
