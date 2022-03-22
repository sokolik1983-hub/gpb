import React, { useMemo, useState } from 'react';
import { ScrollerHeader, FilterLayout, ScrollerPageLayout } from 'components';
import { useScrollerTabsProps, useTurnoverScrollerHeaderProps, useAccounts, useScrollerPagination } from 'hooks';
import type { IFilterPanel, Sorting } from 'interfaces';
import { Table } from 'pages/scroller/client/statement-history/table';
import { DEFAULT_PAGINATION } from 'stream-constants';
import { FatalErrorContent, MainLayout } from '@platform/services/client';
import type { IFormState } from './filter';
import { QuickFilter, fields, tagLabels, STORAGE_KEY, ADDITIONAL_FORM_FIELDS } from './filter';
import { AdditionalFilter } from './filter/additional-filter';
import { TagsPanel } from './filter/tags-panel';
import type { IHistoryScrollerContext } from './history-scroller-context';
import { HistoryScrollerContext, DEFAULT_SORTING } from './history-scroller-context';
import { useGetStatementList } from './hooks';

/**
 * Страница скроллера выписок, вкладка: "Обороты (ОСВ)".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34448309
 */
export const StatementHistoryScrollerPage = () => {
  const tabsProps = useScrollerTabsProps();

  // region элементы стейта контекста скроллера.
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sorting, setSorting] = useState<Sorting>(DEFAULT_SORTING);
  const { pagination, setPagination, filterPanel, tagsPanel, filterValues } = useScrollerPagination({
    fields,
    labels: tagLabels,
    storageKey: STORAGE_KEY,
    defaultPagination: DEFAULT_PAGINATION,
  });
  // endregion

  // Для улучшения типизации. Типу Record<string, unknown> нельзя присвоить интерфейс
  // у которого не определена "index signatures".
  const properlyTypedFilterPanel = (filterPanel as unknown) as IFilterPanel<IFormState>;

  const headerProps = useTurnoverScrollerHeaderProps();

  // Вызывается один раз.
  const { accounts, isAccountsError, isAccountsFetching } = useAccounts();

  const {
    response: { data: statements, total: totalStatementsAmount },
    isStatementsError,
    isStatementsFetching,
  } = useGetStatementList({ filters: filterValues, sorting, pagination });

  const contextValue: IHistoryScrollerContext = useMemo(
    () => ({
      hasError: hasError || isAccountsError || isStatementsError,
      setHasError,
      isLoading: isLoading || isAccountsFetching || isStatementsFetching,
      setIsLoading,
      filterPanel: properlyTypedFilterPanel,
      tagsPanel,
      accounts,
      statements,
      totalStatementsAmount,
      sorting,
      setSorting,
      pagination,
      setPagination,
    }),
    [
      accounts,
      hasError,
      isAccountsError,
      isAccountsFetching,
      isLoading,
      isStatementsError,
      isStatementsFetching,
      pagination,
      properlyTypedFilterPanel,
      setPagination,
      sorting,
      statements,
      tagsPanel,
      totalStatementsAmount,
    ]
  );

  if (hasError || isAccountsError || isStatementsError) {
    return (
      <MainLayout>
        <FatalErrorContent />
      </MainLayout>
    );
  }

  return (
    <HistoryScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <ScrollerPageLayout categoryTabsProps={tabsProps} navigationLine={<ScrollerHeader {...headerProps} />}>
          <FilterLayout
            AdditionalFilter={AdditionalFilter}
            QuickFilter={QuickFilter}
            TagsPanel={TagsPanel}
            additionalFilterFields={ADDITIONAL_FORM_FIELDS}
            filterFields={fields}
            filterState={filterPanel}
            tagsState={tagsPanel}
          />
          <Table />
        </ScrollerPageLayout>
      </MainLayout>
    </HistoryScrollerContext.Provider>
  );
};

StatementHistoryScrollerPage.displayName = 'StatementHistoryScrollerPage';
