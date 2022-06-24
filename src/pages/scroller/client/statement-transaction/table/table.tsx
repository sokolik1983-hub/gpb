import React, { useCallback, useContext, useEffect, useState } from 'react';
import { executor, viewTransaction } from 'actions/client';
import type { IUrlParams } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import { locale } from 'localization';
import { FOOTER_ACTIONS, FOOTER_DROPDOWN_ACTIONS } from 'pages/scroller/client/statement-transaction/action-configs';
import { CaptionRow } from 'pages/scroller/client/statement-transaction/table/caption-row';
import { ONLY_SELECTED_ROWS_CKECKBOX } from 'pages/scroller/client/statement-transaction/table/constants';
import { Footer } from 'pages/scroller/client/statement-transaction/table/footer';
import type { ITransactionScrollerContext } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import { DEFAULT_SORTING, TransactionScrollerContext } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import { DataTable } from 'platform-copies/services';
import { useParams } from 'react-router-dom';
import { PRIVILEGE } from 'stream-constants/client';
import { getActiveActionButtons, isFunctionAvailability } from 'utils';
import { useAuth } from '@platform/services/client';
import type { IFetchDataResponse } from '@platform/services/common/dist-types/components/data-table/interfaces';
import { Box, Checkbox, Gap, Horizon, LayoutScroll, Typography } from '@platform/ui';
import { columns } from './columns';

/** Таблица скроллера проводок. */
export const Table = () => {
  const [visibleOnlySelectedRows, setVisibleOnlySelectedRows] = useState<boolean>(false);

  const {
    isTransactionsFetched,
    isTransactionsError,
    pagination,
    selectedRows,
    setHasError,
    setPagination,
    setSelectedRows,
    setSorting,
    totalTransactionsAmount,
    transactions,
    transactionsAmountByFilter,
  } = useContext<ITransactionScrollerContext>(TransactionScrollerContext);

  useEffect(() => {
    if (selectedRows.length === 0) {
      setVisibleOnlySelectedRows(false);
    }
  }, [selectedRows, setVisibleOnlySelectedRows]);

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
    <>
      <Box>
        <Gap.SM />
        <Horizon>
          <Gap />
          <Gap />
          <Typography.TextBold>{locale.transactionsScroller.table.total}</Typography.TextBold>
          <Gap.SM />
          <Typography.Text data-field={'total'}>
            {locale.transactionsScroller.table.totalValue({
              total: totalTransactionsAmount,
              totalByFilters: transactionsAmountByFilter,
            })}
          </Typography.Text>
          <Horizon.Spacer />
          {selectedRows.length > 0 && (
            <Checkbox
              extraSmall
              dimension="SM"
              label={locale.transactionsScroller.labels.showOnlySelectedRows}
              name={ONLY_SELECTED_ROWS_CKECKBOX}
              value={visibleOnlySelectedRows}
              onChange={() => setVisibleOnlySelectedRows(!visibleOnlySelectedRows)}
            />
          )}
          <Gap />
          <Gap />
        </Horizon>
        <Gap.SM />
      </Box>
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
          visibleOnlySelectedRows={visibleOnlySelectedRows}
          onPaginationChange={setPagination}
          onRowClick={handRowClick}
          onSelectedRowsChange={setSelectedRows}
        />
      </LayoutScroll>
    </>
  );
};

Table.displayName = 'Table';
