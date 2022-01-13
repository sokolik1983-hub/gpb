import type { FC } from 'react';
import React, { useContext, useMemo, useEffect, useCallback } from 'react';
import { executor, viewTransaction } from 'actions/client';
import { ScrollerTableView, useCheckboxColumn } from 'components/scroller-table-view';
import type { IStatementTransactionRow } from 'interfaces/client';
import { locale } from 'localization';
import { useTable, useSortBy, useResizeColumns, useBlockLayout, usePagination, useRowSelect } from 'react-table';
import { Horizon, Typography, Gap, Box } from '@platform/ui';
import type { ITransactionScrollerContext } from '../transaction-scroller-context';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import { columns } from './columns';
import css from './styles.scss';

/** Таблица скроллера проводок. */
export const Table: FC = () => {
  const { transactions, isLoading, totalTransactionsAmount, sorting, setSorting, pagination, setPagination, setSelectedRows } = useContext<
    ITransactionScrollerContext
  >(TransactionScrollerContext);

  const initialState = useMemo(
    () => ({
      sortBy: sorting,
      ...pagination,
    }),
    [sorting, pagination]
  );

  const tableInstance = useTable<IStatementTransactionRow>(
    {
      data: transactions,
      columns,
      manualPagination: true,
      manualSortBy: true,
      expandSubRows: false,
      pageCount: Math.ceil(totalTransactionsAmount / pagination.pageSize),
      initialState,
      maxMultiSortColCount: 2,
    },
    useSortBy,
    usePagination,
    useResizeColumns,
    useBlockLayout,
    useRowSelect,
    useCheckboxColumn
  );

  const {
    state: { sortBy, pageIndex, pageSize },
    selectedFlatRows,
  } = tableInstance;

  useEffect(() => {
    setSorting(sortBy);
  }, [setSorting, sortBy]);

  const newPaginationState = useMemo(() => ({ pageIndex, pageSize }), [pageSize, pageIndex]);

  const handleDoubleClick = useCallback((row: IStatementTransactionRow) => {
    void executor.execute(viewTransaction, [row]);
  }, []);

  useEffect(() => {
    setPagination(newPaginationState);
  }, [setPagination, newPaginationState]);

  useEffect(() => {
    setSelectedRows(selectedFlatRows.map(row => row.original));
  }, [selectedFlatRows, setSelectedRows]);

  return (
    <>
      {/* Общая информация о количестве записей. */}
      <Box>
        <Horizon className={css.totalWrapper}>
          <Typography.TextBold>{locale.transactionsScroller.table.total}</Typography.TextBold>
          <Gap.SM />
          <Typography.Text>
            {locale.transactionsScroller.table.totalValue({ total: totalTransactionsAmount, exists: transactions.length })}
          </Typography.Text>
        </Horizon>
        <Gap.SM />
      </Box>
      {/* Таблица. */}
      <ScrollerTableView
        isLoading={isLoading}
        placeholderLabel={locale.transactionsScroller.table.placeholder}
        tableInstance={tableInstance}
        onDoubleClick={handleDoubleClick}
      />
    </>
  );
};

Table.displayName = 'Table';
