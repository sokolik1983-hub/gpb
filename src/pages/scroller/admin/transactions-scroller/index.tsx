import React, { useCallback, useMemo, useState } from 'react';
import { ContentLoader, SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useStreamContentHeight } from 'hooks/common';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization/index';
import type { ITransactionsScrollerContext } from 'pages/scroller/admin/transactions-scroller/context';
import { TransactionsScrollerContext } from 'pages/scroller/admin/transactions-scroller/context';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import { convertTablePaginationToMetaData } from 'utils/common';
import type { IMetaData } from '@platform/services/admin';
import { MainLayout } from '@platform/services/admin';
import { Box } from '@platform/ui';
import { Table } from './table';

/** Компонент страницы со скрллером проводок. */
export const TransactionsScrollerPage: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [tableDataInitialed, setTableDataInitialed] = useState<boolean>(false);

  // TODO Добавить действия заголовка
  const actions = useMemo(() => [], []);

  const headerProps = {
    actions,
    header: locale.admin.transactionsScroller.pageTitle,
  };

  const fetch = useCallback(async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<
    IFetchDataResponse<BankAccountingEntryCard>
  > => {
    try {
      const metaData: IMetaData = {
        multiSort,
        ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
      };

      const { page: rows, size: totalItems } = await statementService.getTransactionsPage(metaData);

      setTotal(totalItems);

      return { rows, pageCount: totalItems };
    } catch {
      return { rows: [], pageCount: 0 };
    } finally {
      if (!tableDataInitialed) {
        setTableDataInitialed(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue: ITransactionsScrollerContext = useMemo<ITransactionsScrollerContext>(
    () => ({
      fetch,
      total,
    }),
    [fetch, total]
  );

  const height = useStreamContentHeight();

  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT;

  return (
    <TransactionsScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <FocusLock>
          <FocusTree treeId={COMMON_SCROLLER_NODE}>
            <ScrollerPageLayout headerProps={headerProps}>
              <ContentLoader height={tableHeight} loading={!tableDataInitialed}>
                <Box />
              </ContentLoader>
              <Table />
            </ScrollerPageLayout>
          </FocusTree>
        </FocusLock>
      </MainLayout>
    </TransactionsScrollerContext.Provider>
  );
};

TransactionsScrollerPage.displayName = 'TransactionsScrollerPage';