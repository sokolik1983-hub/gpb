import type { FC } from 'react';
import React, { useContext, useEffect, useMemo } from 'react';
import { StickyRowsProvider } from 'components';
import { ScrollerSpinnerPlaceholder } from 'components/scroller-spinner-placeholder';
import type { IGroupedAccounts } from 'interfaces/dto';
import { GROUPING_TYPE, GROUPING_VALUES } from 'interfaces/dto';
import { useTable, useSortBy, useResizeColumns, useExpanded, useBlockLayout } from 'react-table';
import { Box } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { getColumns } from './columns';
import { COLUMN_NAMES } from './constants';
import { Placeholder } from './placeholder';
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
    isLoading,
    groupByForRender,
    turnovers: { accounts = [] },
  } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const columns = useMemo(() => getColumns(groupByForRender), [groupByForRender]);

  const organizations = accounts.filter(item => item.groupInfo.groupingType === GROUPING_TYPE.ORGANIZATIONS);

  /**
   * Раскрытые строки по-умолчанию.
   */
  const expanded = useMemo(
    () =>
      accounts.reduce((acc, el, i) => {
        const { groupInfo } = el;

        if (groupInfo.groupingType === GROUPING_TYPE.ORGANIZATIONS) {
          acc[i] = true;
        }

        if ([GROUPING_TYPE.ACCOUNT_TYPE, GROUPING_TYPE.BRANCHES, GROUPING_TYPE.CURRENCIES].includes(groupInfo.groupingType)) {
          acc[i] = groupByForRender === GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES ? organizations.length === 1 : true;
        }

        return acc;
      }, {}),
    [accounts, groupByForRender, organizations.length]
  );

  const initialState = useMemo(
    () => ({
      sortBy: sorting,
      hiddenColumns: getHiddenColumns(groupByForRender),
      expanded,
    }),
    [sorting, groupByForRender, expanded]
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
  } else if (isLoading && rows.length === 0) {
    tableContent = <ScrollerSpinnerPlaceholder />;
  } else {
    tableContent = (
      // key используется, чтобы размонтировать компонент, когда приходят данные для новой страницы.
      // Это нужно для того, чтобы сбросить стейт, контекста.
      // Если этого не делать, то массивы рефов на строки таблицы скроллера, будут содержать старые или дублирующмеся элементы.
      <StickyRowsProvider key={String(isLoading)}>
        <TableBody prepareRow={prepareRow} rows={rows} {...getTableBodyProps()} />
      </StickyRowsProvider>
    );
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
