import React, { useCallback, useContext } from 'react';
import { executor, viewTransaction } from 'actions/client';
import type { IUrlParams } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import { FOOTER_ACTIONS, FOOTER_DROPDOWN_ACTIONS } from 'pages/scroller/client/statement-transaction/action-configs';
import { CaptionRow } from 'pages/scroller/client/statement-transaction/table/caption-row';
import { Footer } from 'pages/scroller/client/statement-transaction/table/footer';
import type { ITransactionScrollerContext } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import { DEFAULT_SORTING, TransactionScrollerContext } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import { DataTable } from 'platform-copies/services';
import { useParams } from 'react-router-dom';
import { PRIVILEGE } from 'stream-constants/client';
import { getActiveActionButtons, isFunctionAvailability } from 'utils';
import { useAuth } from '@platform/services/client';
import type { IFetchDataResponse } from '@platform/services/common/dist-types/components/data-table/interfaces';
import { LayoutScroll } from '@platform/ui';
import { columns } from './columns';

/** Таблица скроллера проводок. */
export const Table = () => {
  const {
    isTransactionsFetched,
    isTransactionsError,
    pagination,
    selectedRows,
    setHasError,
    setPagination,
    setSelectedRows,
    setSorting,
    transactions,
    transactionsAmountByFilter,
  } = useContext<ITransactionScrollerContext>(TransactionScrollerContext);

  const { getAvailableActions } = useAuth();
  const { id } = useParams<IUrlParams>();

  const footerActions = useCallback(
    scrollerExecutor => (rows: IStatementTransactionRow[]) =>
      getActiveActionButtons(getAvailableActions([...FOOTER_ACTIONS, ...FOOTER_DROPDOWN_ACTIONS]), scrollerExecutor, [rows, id]),
    [getAvailableActions, id]
  );

  const sendTransactionsToDataTable = useCallback(
    ({ multiSort }): Promise<IFetchDataResponse<IStatementTransactionRow>> =>
      new Promise((resolve, reject) => {
        setSorting(multiSort);

        if (isTransactionsFetched) {
          resolve({ rows: transactions, pageCount: Math.ceil(transactionsAmountByFilter / pagination.pageSize) });
        }

        if (isTransactionsError) {
          setHasError(true);

          reject();
        }
      }),
    [isTransactionsError, isTransactionsFetched, pagination.pageSize, setHasError, setSorting, transactions, transactionsAmountByFilter]
  );

  const handRowClick = useCallback(
    (row: IStatementTransactionRow) => {
      // TODO: в дальнейшем заменить на платформенный аналог
      if (!isFunctionAvailability(PRIVILEGE.ACCOUNTING_ENTRY_CARD_VIEW)) {
        return;
      }

      void executor.execute(viewTransaction, [row], id);
    },
    [id]
  );

  return (
    <LayoutScroll>
      <DataTable<IStatementTransactionRow>
        columns={columns}
        defaultSort={DEFAULT_SORTING}
        executor={executor}
        fetchData={sendTransactionsToDataTable}
        footerActionsGetter={footerActions}
        footerContent={Footer}
        paginationState={pagination}
        rowCaptionComponent={CaptionRow}
        selectedRows={selectedRows}
        onPaginationChange={setPagination}
        onRowClick={handRowClick}
        onSelectedRowsChange={setSelectedRows}
      />
    </LayoutScroll>
  );
};

Table.displayName = 'Table';
