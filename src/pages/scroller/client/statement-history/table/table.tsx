import type { FC } from 'react';
import React, { useContext, useMemo, useEffect, useCallback } from 'react';
import { executor, gotoTransactionsScrollerByStatementRequest } from 'actions/client';
import { ScrollerTableView } from 'components/scroller-table-view';
import type { IStatementHistoryRow } from 'interfaces/client';
import { locale } from 'localization';
import { useTable, useSortBy, useResizeColumns, useBlockLayout, usePagination } from 'react-table';
import { Horizon, Typography, Gap, Box } from '@platform/ui';
import { HistoryScrollerContext } from '../history-scroller-context';
import { columns } from './columns';
import css from './styles.scss';

/** Таблица скроллера истории запросов. */
export const Table: FC = () => {
  const { statements, isLoading, totalStatementsAmount, sorting, setSorting, pagination, setPagination } = useContext(
    HistoryScrollerContext
  );

  const tableInstance = useTable<IStatementHistoryRow>(
    {
      data: statements,
      columns,
      disableMultiSort: true,
      manualPagination: true,
      manualSortBy: true,
      expandSubRows: false,
      pageCount: Math.ceil(totalStatementsAmount / pagination.pageSize),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useControlledState: state => React.useMemo(() => ({ ...state, ...pagination }), [state, pagination]),
      initialState: {
        sortBy: sorting,
        ...pagination,
      },
    },
    useSortBy,
    usePagination,
    useResizeColumns,
    useBlockLayout
  );

  const handleDoubleClick = useCallback((row: IStatementHistoryRow) => {
    void executor.execute(gotoTransactionsScrollerByStatementRequest, [row]);
  }, []);

  const {
    state: { sortBy, pageIndex, pageSize },
  } = tableInstance;

  useEffect(() => {
    setSorting(sortBy);
  }, [setSorting, sortBy]);

  const newPaginationState = useMemo(() => ({ pageIndex, pageSize }), [pageSize, pageIndex]);

  useEffect(() => {
    setPagination(newPaginationState);
  }, [setPagination, newPaginationState]);

  return (
    <>
      <Box className={css.totalWrapper}>
        <Gap.SM />
        <Horizon>
          {/* Общая информация о количестве записей. */}
          <Typography.TextBold>{locale.historyScroller.table.total}</Typography.TextBold>
          <Gap.SM />
          <Typography.Text>
            {locale.historyScroller.table.totalValue({ total: totalStatementsAmount, exists: statements.length })}
          </Typography.Text>
        </Horizon>
        <Gap.LG />
      </Box>
      {/* Таблица. */}
      <ScrollerTableView
        isLoading={isLoading}
        placeholderLabel={locale.historyScroller.table.placeholder}
        setPagination={setPagination}
        tableInstance={tableInstance}
        onDoubleClick={handleDoubleClick}
      />
    </>
  );
};

Table.displayName = 'Table';
