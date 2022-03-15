import type { FC } from 'react';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { executor, viewTransaction } from 'actions/client';
import { ScrollerTableView, useCheckboxColumn } from 'components/scroller-table-view';
import type { IUrlParams } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import { locale } from 'localization';
import { useParams } from 'react-router-dom';
import { useTable, useSortBy, useResizeColumns, useBlockLayout, usePagination, useRowSelect } from 'react-table';
import { PRIVILEGE } from 'stream-constants/client';
import { isFunctionAvailability } from 'utils';
import { Horizon, Typography, Gap, Box, Checkbox } from '@platform/ui';
import type { ITransactionScrollerContext } from '../transaction-scroller-context';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import { columns } from './columns';
import { ONLY_SELECTED_ROWS_CKECKBOX } from './constants';
import css from './styles.scss';

/** Таблица скроллера проводок. */
export const Table: FC = () => {
  const {
    transactions,
    isLoading,
    transactionsAmountByFilter,
    totalTransactionsAmount,
    sorting,
    setSorting,
    pagination,
    setPagination,
    setSelectedRows,
    selectedRows,
  } = useContext<ITransactionScrollerContext>(TransactionScrollerContext);

  const [isVisibleOnlySelectedRows, setIsVisibleOnlySelectedRows] = useState<boolean>(false);

  const tableInstance = useTable<IStatementTransactionRow>(
    {
      data: transactions,
      columns,
      manualPagination: true,
      manualSortBy: true,
      expandSubRows: false,
      pageCount: Math.ceil(transactionsAmountByFilter / pagination.pageSize),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useControlledState: state => React.useMemo(() => ({ ...state, ...pagination }), [state, pagination]),
      initialState: {
        sortBy: sorting,
        ...pagination,
      },
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
    state: { sortBy },
    selectedFlatRows,
  } = tableInstance;

  const { id } = useParams<IUrlParams>();

  const handleClick = useCallback(
    (doc: IStatementTransactionRow) => {
      // TODO: в дальнейшем заменить на платформенный аналог
      if (!isFunctionAvailability(PRIVILEGE.ACCOUNTING_ENTRY_CARD_VIEW)) {
        return;
      }

      void executor.execute(viewTransaction, [doc], id);
    },
    [id]
  );

  useEffect(() => {
    setSorting(sortBy);
  }, [setSorting, sortBy]);

  useEffect(() => {
    setSelectedRows(selectedFlatRows.map(row => row.original));

    if (selectedFlatRows.length === 0) {
      setIsVisibleOnlySelectedRows(false);
    }
  }, [selectedFlatRows, setSelectedRows]);

  return (
    <>
      {/* Общая информация о количестве записей. */}
      <Box>
        <Horizon className={css.totalWrapper}>
          <Typography.TextBold>{locale.transactionsScroller.table.total}</Typography.TextBold>
          <Gap.SM />
          <Typography.Text data-field={'total'}>
            {locale.transactionsScroller.table.totalValue({ total: totalTransactionsAmount, totalByFilters: transactionsAmountByFilter })}
          </Typography.Text>
          <Horizon.Spacer />
          {selectedRows.length > 0 && (
            <Checkbox
              extraSmall
              dimension="SM"
              label={locale.transactionsScroller.labels.showOnlySelectedRows}
              name={ONLY_SELECTED_ROWS_CKECKBOX}
              value={isVisibleOnlySelectedRows}
              onChange={() => setIsVisibleOnlySelectedRows(!isVisibleOnlySelectedRows)}
            />
          )}
        </Horizon>
        <Gap.SM />
      </Box>
      {/* Таблица. */}
      <ScrollerTableView
        isLoading={isLoading}
        isVisibleOnlySelectedRows={isVisibleOnlySelectedRows && selectedRows.length > 0}
        placeholderLabel={locale.transactionsScroller.table.placeholder}
        setPagination={setPagination}
        tableInstance={tableInstance}
        totalAmount={totalTransactionsAmount}
        onClick={handleClick}
      />
    </>
  );
};

Table.displayName = 'Table';
