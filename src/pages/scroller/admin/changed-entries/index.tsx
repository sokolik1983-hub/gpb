import type { FC } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import { executor, viewStatementHistoryScroller } from 'actions/admin';
import type { ScrollerPageLayoutProps } from 'components/admin';
import { SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/admin';
import { ContentLoader } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useStreamContentHeight } from 'hooks/common';
import type { BankAccountingChangedEntry } from 'interfaces/admin/dto/bank-accounting-changed-entry';
import { locale } from 'localization';
import { FORM_FIELDS } from 'pages/scroller/admin/changed-entries/filter/constants';
import type { IFetchDataResponse, IFetchDataParams } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import { convertTablePaginationToMetaData } from 'utils/common';
import type { IFilters } from '@platform/core';
import type { IMetaData } from '@platform/services';
import { MainLayout } from '@platform/services/admin';
import { Box } from '@platform/ui';
import { ChangedEntriesScrollerContext } from './context';
import type { IChangedEntriesScrollerContext } from './context';
import { Filter } from './filter';
import { Table } from './table';

/**
 * [Выписки_ЗВ] ЭФ Банка "Журнал проводок удаленных/добавленных".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=80646436
 */
export const ChangedEntriesScrollerPage: FC = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [filters, setFilters] = useState<IFilters>({});
  const [total, setTotal] = useState<number>(0);
  const [tableDataInitialed, setTableDataInitialed] = useState<boolean>(false);

  const headerProps: ScrollerPageLayoutProps['headerProps'] = {
    backButtonTitle: locale.common.button.toStatementRequests,
    header: locale.admin.changedEntriesScroller.pageTitle,
    onBack: () => void executor.execute(viewStatementHistoryScroller),
  };

  const handleSetFilters = (filtersValue: IFilters) => {
    setSearchString(filtersValue[FORM_FIELDS.TABLE_SEARCH]?.value || '');
    setFilters(filtersValue);
  };

  const fetch = useCallback(
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<BankAccountingChangedEntry>> => {
      try {
        const metaData: IMetaData = {
          filters,
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
    [filters, tableDataInitialed]
  );

  const contextValue: IChangedEntriesScrollerContext = useMemo<IChangedEntriesScrollerContext>(
    () => ({
      fetch,
      total,
      searchQuery: searchString,
    }),
    [fetch, searchString, total]
  );

  const height = useStreamContentHeight();

  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT.WITH_BACK_BUTTON;

  return (
    <ChangedEntriesScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <FocusLock>
          <FocusTree treeId={COMMON_SCROLLER_NODE}>
            <ScrollerPageLayout headerProps={headerProps}>
              <Filter fetchedNewTransactions setFilters={handleSetFilters} />
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
