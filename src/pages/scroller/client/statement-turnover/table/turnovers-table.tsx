import type { FC } from 'react';
import React, { useContext, useEffect, useMemo } from 'react';
import { StickyRowsProvider } from 'components';
import { ScrollerSpinnerPlaceholder } from 'components/scroller-spinner-placeholder';
import type { IGroupedAccounts } from 'interfaces/dto';
import { SCROLLER_SETTING_TYPE, useStorageSettings } from 'platform-copies/services/components/data-table/hooks';
import { useTable, useSortBy, useResizeColumns, useExpanded, useBlockLayout } from 'react-table';
import type { IColumnsStorageObject } from '@platform/core';
import { Box, SettingsForm } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { getColumns } from './columns';
import { Placeholder } from './placeholder';
import css from './styles.scss';
import { TableBody } from './table-body';
import { TableHeader } from './table-header';

/**
 * Определяет путь до подстрок.
 *
 * @see https://react-table.tanstack.com/docs/api/useTable
 */
const getSubRows = (row: IGroupedAccounts) =>
  // any используется потому, что типы в react-table написаны так, что предполагается
  // что тип подстроки и тип главной (группирующей) строки, будут одинаковыми а
  // в реализации это не так. С бека приходят разные по структуре объекты.
  (row.groupedAccounts ?? []) as any;

/** Таблица оборотов ОСВ. */
export const TurnoversTable: FC = () => {
  const {
    setSorting,
    sorting,
    turnoversUpdating,
    groupByForRender,
    turnovers: { accounts = [] },
  } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const columns = useMemo(() => getColumns(groupByForRender), [groupByForRender]);

  const { values: settingColumns, setValues: setSettingsColumns } = useStorageSettings<IColumnsStorageObject[]>({
    value: columns.reduce<IColumnsStorageObject[]>((acc, { id, width, isVisible }) => {
      if (id) {
        acc.push({ id, width, isVisible });
      }

      return acc;
    }, []),
    settingsName: SCROLLER_SETTING_TYPE.COLUMNS,
  });

  /**
   * Раскрытые строки по-умолчанию.
   */
  const expanded = useMemo(
    () =>
      accounts.reduce((acc, el, i) => {
        acc[i] = true;

        return acc;
      }, {}),
    [accounts]
  );

  const initialState = useMemo(
    () => ({
      sortBy: sorting,
      expanded,
    }),
    [sorting, expanded]
  );

  const tableInstance = useTable<IGroupedAccounts>(
    {
      data: accounts ?? [],
      columns,
      getSubRows,
      disableMultiSort: true,
      manualSortBy: true,
      expandSubRows: false,
      initialState,
      customSettingsForm: SettingsForm,
      autoResetExpanded: true,
    },
    useSortBy,
    useExpanded,
    useResizeColumns,
    useBlockLayout
  );

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    state: { sortBy },
  } = tableInstance;

  useEffect(() => {
    if (setSorting) {
      setSorting(sortBy);
    }
  }, [setSorting, sortBy]);

  let tableContent: React.ReactNode;

  if (!turnoversUpdating && accounts.length === 0) {
    tableContent = <Placeholder />;
  } else if (turnoversUpdating && rows.length === 0) {
    tableContent = <ScrollerSpinnerPlaceholder />;
  } else {
    tableContent = (
      // key используется, чтобы размонтировать компонент, когда приходят данные для новой страницы.
      // Это нужно для того, чтобы сбросить стейт, контекста.
      // Если этого не делать, то массивы рефов на строки таблицы скроллера, будут содержать старые или дублирующмеся элементы.
      <StickyRowsProvider key={String(turnoversUpdating)}>
        <TableBody prepareRow={prepareRow} rows={rows} {...getTableBodyProps()} />
      </StickyRowsProvider>
    );
  }

  return (
    <Box className={css.tableWrapper}>
      <Box {...getTableProps()} className={css.table}>
        <TableHeader
          showSettingsButton
          setSettingsColumns={setSettingsColumns}
          settingColumns={settingColumns}
          tableInstance={tableInstance}
        />
        {tableContent}
      </Box>
    </Box>
  );
};

TurnoversTable.displayName = 'TurnoversTable';
