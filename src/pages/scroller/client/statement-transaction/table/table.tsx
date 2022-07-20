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
import { InfiniteDataTable } from 'platform-copies/services';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { useParams } from 'react-router-dom';
import { PRIVILEGE } from 'stream-constants/client';
import { getActiveActionButtons, isFunctionAvailability } from 'utils';
import { useAuth } from '@platform/services/client';
import { Box, Checkbox, Gap, Horizon, Typography } from '@platform/ui';
import { columns } from './columns';

/** Свойства таблицы проводок. */
interface TableProps {
  /** Функция запроса проводок на сервер. */
  fetchData(params: IFetchDataParams): Promise<IFetchDataResponse<IStatementTransactionRow>>;
}

/** Таблица проводок. */
export const Table: React.FC<TableProps> = ({ fetchData }) => {
  const [visibleOnlySelectedRows, setVisibleOnlySelectedRows] = useState<boolean>(false);

  const { selectedRows, setSelectedRows, totalTransactions } = useContext<ITransactionScrollerContext>(TransactionScrollerContext);

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
          <Gap.X2S />
          <Typography.Text data-field={'total'}>{totalTransactions}</Typography.Text>
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
      <InfiniteDataTable<IStatementTransactionRow>
        columns={columns}
        defaultSort={DEFAULT_SORTING}
        executor={executor}
        fetchData={fetchData}
        footerActionsGetter={footerActions}
        footerContent={Footer}
        rowCaptionComponent={CaptionRow}
        selectedRows={selectedRows}
        visibleOnlySelectedRows={visibleOnlySelectedRows}
        onRowClick={handRowClick}
        onSelectedRowsChange={setSelectedRows}
      />
    </>
  );
};

Table.displayName = 'Table';
