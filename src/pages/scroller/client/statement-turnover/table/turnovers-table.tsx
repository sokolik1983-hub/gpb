import type { FC } from 'react';
import React, { useContext, useEffect, useMemo } from 'react';
import { ScrollerSpinnerPlaceholder } from 'components/scroller-spinner-placeholder';
import type { IGroupedAccounts } from 'interfaces/client';
import { GROUPING_VALUES } from 'interfaces/client';
import { useTable, useSortBy, useResizeColumns, useExpanded, useBlockLayout } from 'react-table';
import { Box } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { getColumns } from './columns';
import { COLUMN_NAMES } from './constatnts';
import { Placeholder } from './plaseholder';
import css from './styles.scss';
import { TableBody } from './table-body';
import { TableHeader } from './table-header';

/**
 * Возвращает список скрытых колонок.
 *
 * @param grouping - Значение группировки, выбранное в фильтре.
 */
const getHiddenColumns = (grouping: GROUPING_VALUES) =>
  [GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES, GROUPING_VALUES.ORGANIZATIONS].includes(grouping) ? [COLUMN_NAMES.ORGANIZATION_NAME] : [];

/**
 * Определяет путь до подстрок.
 *
 * @see {@link https://react-table.tanstack.com/docs/api/useTable}
 */
const getSubRows = (row: IGroupedAccounts) =>
  // any используется потому, что типы в react-table написаны так, что предполагается
  // что тип подстроки и тип главной (группирующей) строки, будут одинаковыми а
  // в реализации это не так. С бека приходят разные по структуре объекты.
  (row.groupedAccounts ?? []) as any;

/** Таблица оборотов ОСВ. */
export const TurnoversTable: FC = () => {
  const {
    filterPanel: { values: filterFormValue },
    setSorting,
    sorting,
    isLoading,
    turnovers: { accounts = [] },
  } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const { grouping } = filterFormValue;

  const columns = useMemo(() => getColumns(grouping), [grouping]);

  const initialState = useMemo(
    () => ({
      sortBy: sorting,
      hiddenColumns: getHiddenColumns(grouping),
    }),
    [sorting, grouping]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable<IGroupedAccounts>(
    {
      data: accounts ?? [],
      columns,
      getSubRows,
      disableMultiSort: false,
      disableSortRemove: true,
      manualSortBy: true,
      expandSubRows: false,
      initialState,
    },
    useSortBy,
    useExpanded,
    useResizeColumns,
    useBlockLayout
  );

  useEffect(() => {
    if (setSorting) {
      setSorting(sortBy);
    }
  }, [setSorting, sortBy]);

  let tableContent: React.ReactNode;

  if (!isLoading && accounts.length === 0) {
    tableContent = <Placeholder />;
  } else if (isLoading) {
    tableContent = <ScrollerSpinnerPlaceholder />;
  } else {
    tableContent = <TableBody prepareRow={prepareRow} rows={rows} {...getTableBodyProps()} />;
  }

  return (
    <Box className={css.tableWrapper}>
      <Box {...getTableProps()} className={css.table}>
        <TableHeader headerGroups={headerGroups} />
        {tableContent}
      </Box>
    </Box>
  );
};

TurnoversTable.displayName = 'TurnoversTable';
