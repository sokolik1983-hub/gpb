import type { FC } from 'react';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { executor, gotoTransactionsScrollerByStatementRequest } from 'actions/client';
import { useScrollButton } from 'hooks';
import type { IStatementHistoryRow } from 'interfaces/client';
import { ACTION } from 'interfaces/client';
import { locale } from 'localization';
import { STORAGE_KEY } from 'pages/scroller/client/statement-history/filter';
import { DataTable } from 'platform-copies/services';
import type Scrollbars from 'react-custom-scrollbars';
import { PRIVILEGE } from 'stream-constants/client';
import { isFunctionAvailability } from 'utils';
import type { IFetchDataResponse } from '@platform/services';
import { Box, Gap, Horizon, LayoutScroll, ROLE, Typography } from '@platform/ui';
import { DEFAULT_SORTING, HistoryScrollerContext } from '../history-scroller-context';
import { columns } from './columns';
import css from './styles.scss';

/** Cкроллер истории запросов. */
export const Table: FC = () => {
  const {
    statements,
    totalStatementsAmount,
    setSorting,
    pagination,
    setPagination,
    setHasError,
    isStatementsError,
    isStatementsFetched,
  } = useContext(HistoryScrollerContext);

  const [selectedRows, setSelectedRows] = useState<IStatementHistoryRow[]>([]);

  const handleRowClick = useCallback((doc: IStatementHistoryRow) => {
    if (doc.accountsIds.length === 1) {
      // TODO: в дальнейшем заменить на платформенный аналог
      if (!isFunctionAvailability(PRIVILEGE.ACCOUNTING_ENTRY_VIEW)) {
        return;
      }

      void executor.execute(gotoTransactionsScrollerByStatementRequest, [doc], ACTION.VIEW);
    }
  }, []);

  const sendHistoryToDataTable = useCallback(
    ({ multiSort }): Promise<IFetchDataResponse<IStatementHistoryRow>> =>
      new Promise((resolve, reject) => {
        setSorting(multiSort);

        if (isStatementsFetched) {
          resolve({ rows: statements, pageCount: Math.ceil(totalStatementsAmount / pagination.pageSize) });
        }

        if (isStatementsError) {
          setHasError(true);

          reject();
        }
      }),
    [isStatementsError, isStatementsFetched, pagination.pageSize, setHasError, setSorting, statements, totalStatementsAmount]
  );

  const scrollRef = useRef<Scrollbars>();
  const { handleScrollButtonClick, ScrollIcon, handleScroll, isScrollButtonVisible, setScrolledElementRef } = useScrollButton();

  const setScrollRef = ref => {
    scrollRef.current = ref;
    setScrolledElementRef(ref);
  };

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

      <LayoutScroll innerRef={setScrollRef} scrollMarginVerticalBottom={40} onScroll={handleScroll}>
        <DataTable<IStatementHistoryRow>
          columns={columns}
          defaultSort={DEFAULT_SORTING}
          executor={executor}
          fetchData={sendHistoryToDataTable}
          paginationState={pagination}
          selectedRows={selectedRows}
          storageKey={STORAGE_KEY}
          onPaginationChange={setPagination}
          onRowClick={handleRowClick}
          onSelectedRowsChange={setSelectedRows}
        />
      </LayoutScroll>

      {isScrollButtonVisible && (
        <Box inverse className={css.scrollIcon} fill="BASE" radius="MAX" role={ROLE.BUTTON} shadow="MD" onClick={handleScrollButtonClick}>
          {<ScrollIcon fill={'BASE'} scale={'MD'} />}
        </Box>
      )}
    </>
  );
};

Table.displayName = 'Table';
