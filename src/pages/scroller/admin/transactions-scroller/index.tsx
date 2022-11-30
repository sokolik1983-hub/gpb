import React, { useMemo, useState } from 'react';
import type { ScrollerPageLayoutProps } from 'components/admin';
import { SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/admin';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useDataTable, usePrevious, useStreamContentHeight } from 'hooks/common';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization/index';
import { FORM_FIELDS } from 'pages/scroller/admin/changed-entries/filter/constants';
import type { ITransactionsScrollerContext } from 'pages/scroller/admin/transactions-scroller/context';
import { TransactionsScrollerContext } from 'pages/scroller/admin/transactions-scroller/context';
import { Filter } from 'pages/scroller/admin/transactions-scroller/filter';
import { Table } from 'pages/scroller/admin/transactions-scroller/table';
import { statementService } from 'services/admin';
import { QUICK_FILTER_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import type { IFilters } from '@platform/core';
import { MainLayout } from '@platform/services/admin';

/** Компонент страницы со скрллером проводок. */
export const TransactionsScrollerPage: React.FC = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [filter, setFilter] = useState<IFilters>({});

  const height = useStreamContentHeight();
  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT.BASE - QUICK_FILTER_HEIGHT;

  const emptyFilter = Object.keys(filter)
    .filter(item => item !== FORM_FIELDS.TABLE_SEARCH)
    .every(filterValue => !filterValue);

  const { fetch, initialed: tableDataInitialed, loading: transactionsFetching, total } = useDataTable<BankAccountingEntryCard>({
    apiMethod: statementService.getTransactionsPage,
    filter,
    returnEmptyData: emptyFilter,
  });

  // TODO Добавить действия заголовка
  const actions = useMemo(() => [], []);

  const headerProps: ScrollerPageLayoutProps['headerProps'] = {
    actions,
    header: locale.admin.transactionsScroller.pageTitle,
  };

  const handleSetFilters = (filtersValue: IFilters) => {
    setSearchString(filtersValue[FORM_FIELDS.TABLE_SEARCH]?.value || '');
    setFilter(filtersValue);
  };

  const prevTransactionsFetching = usePrevious(transactionsFetching);

  const contextValue: ITransactionsScrollerContext = useMemo<ITransactionsScrollerContext>(
    () => ({
      searchQuery: searchString,
      newTransactionsFetched: Boolean(tableDataInitialed && prevTransactionsFetching && !transactionsFetching),
    }),
    [prevTransactionsFetching, searchString, tableDataInitialed, transactionsFetching]
  );

  return (
    <TransactionsScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <FocusLock>
          <FocusTree treeId={COMMON_SCROLLER_NODE}>
            <ScrollerPageLayout headerProps={headerProps}>
              <Filter setFilters={handleSetFilters} />
              <Table emptyFilter={emptyFilter} fetch={fetch} height={tableHeight} initialed={tableDataInitialed} total={total} />
            </ScrollerPageLayout>
          </FocusTree>
        </FocusLock>
      </MainLayout>
    </TransactionsScrollerContext.Provider>
  );
};

TransactionsScrollerPage.displayName = 'TransactionsScrollerPage';
