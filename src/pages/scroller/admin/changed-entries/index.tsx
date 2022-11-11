import type { FC } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import { ContentLoader, SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useStreamContentHeight } from 'hooks/common';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import type { IFetchDataResponse, IFetchDataParams } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import { convertTablePaginationToMetaData } from 'utils/common';
import type { IMetaData } from '@platform/services';
import { MainLayout } from '@platform/services/admin';
import { Box } from '@platform/ui';
import { ChangedEntriesScrollerContext } from './context';
import type { IChangedEntriesScrollerContext } from './context';
import { Table } from './table';

/**
 * [Выписки_ЗВ] ЭФ Банка "Журнал проводок удаленных/добавленных".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=80646436
 */
export const ChangedEntriesScrollerPage: FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [tableDataInitialed, setTableDataInitialed] = useState<boolean>(false);

  const headerProps = {
    header: locale.admin.transactionsScroller.pageTitle,
  };

  const fetch = useCallback(
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<BankAccountingEntryCard>> => {
      try {
        const metaData: IMetaData = {
          multiSort,
          ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
        };

        setTotal(0);

        const { data: rows, total: pageCount } = await statementService.getChangedEntries(metaData);

        return { rows, pageCount };
      } catch {
        return { rows: [], pageCount: 0 };
      } finally {
        if (!tableDataInitialed) {
          setTableDataInitialed(true);
        }
      }
    },
    [tableDataInitialed]
  );

  const contextValue: IChangedEntriesScrollerContext = useMemo<IChangedEntriesScrollerContext>(
    () => ({
      fetch,
      total,
    }),
    [fetch, total]
  );

  const height = useStreamContentHeight();

  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT;

  return (
    <ChangedEntriesScrollerContext.Provider value={contextValue}>
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
    </ChangedEntriesScrollerContext.Provider>
  );
};

ChangedEntriesScrollerPage.displayName = 'ChangedEntriesScrollerPage';
