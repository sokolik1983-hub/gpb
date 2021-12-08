import type { FC } from 'react';
import React, { useContext, useMemo, useEffect } from 'react';
import { ScrollerTableView } from 'components/scroller-table-view';
import type { IStatementHistoryRow } from 'interfaces/client';
import { locale } from 'localization';
import { useTable, useSortBy, useResizeColumns, useBlockLayout } from 'react-table';
import { Horizon, Typography, Gap } from '@platform/ui';
import { HistoryScrollerContext } from '../history-scroller-context';
import { columns } from './columns';
import css from './styles.scss';

/** Таблица скроллера истории запросов. */
export const Table: FC = () => {
  const { statements, isLoading, totalStatementsAmount, sorting, setSorting } = useContext(HistoryScrollerContext);

  const initialState = useMemo(
    () => ({
      sortBy: sorting,
    }),
    [sorting]
  );

  const tableInstance = useTable<IStatementHistoryRow>(
    {
      data: statements,
      columns,
      disableMultiSort: true,
      disableSortRemove: true,
      manualSortBy: true,
      expandSubRows: false,
      initialState,
    },
    useSortBy,
    useResizeColumns,
    useBlockLayout
  );

  const {
    state: { sortBy },
  } = tableInstance;

  useEffect(() => {
    setSorting(sortBy);
  }, [setSorting, sortBy]);

  return (
    <>
      <Gap.SM />
      {/* Общая информация о количестве записей. */}
      <Horizon className={css.totalWrapper}>
        <Typography.TextBold>{locale.historyScroller.table.total}</Typography.TextBold>
        <Gap.SM />
        <Typography.Text>
          {locale.historyScroller.table.totalValue({ total: totalStatementsAmount, exists: statements.length })}
        </Typography.Text>
      </Horizon>
      <Gap.LG />
      {/* Таблица. */}
      <ScrollerTableView isLoading={isLoading} placeholderLabel={locale.historyScroller.table.placeholder} tableInstance={tableInstance} />
    </>
  );
};

Table.displayName = 'Table';
