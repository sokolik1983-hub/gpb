import React, { useMemo, useState } from 'react';
import { ScrollerPageLayout, ScrollerHeader, FilterLayout } from 'components';
import { useRestPagination } from 'hooks';
import type { IFilterPanel, Sorting, IPagination, IUrlParams } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import { useParams } from 'react-router-dom';
import { DEFAULT_PAGINATION } from 'stream-constants';
import { useFilter } from '@platform/services';
import { FatalErrorContent, MainLayout } from '@platform/services/client';
import type { IFormState } from './filter';
import { tagLabels, STORAGE_KEY, QuickFilter, AdditionalFilter, TagsPanel, fields, StatementInfo } from './filter';
import { useGetCounterparties, useGetStatementSummaryInfo, useGetTransactionsList, useScrollerHeaderProps } from './hooks';
import { Footer, Table } from './table';
import type { ITransactionScrollerContext } from './transaction-scroller-context';
import { DEFAULT_SORTING, TransactionScrollerContext } from './transaction-scroller-context';

/**
 * Страница скроллера: [Выписки_ЗВ] ЭФ Клиента "Журнал проводок".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=286756666
 */
export const StatementTransactionScrollerPage = () => {
  // region элементы стейта контекста скроллера.
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sorting, setSorting] = useState<Sorting>(DEFAULT_SORTING);
  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);
  const [selectedRows, setSelectedRows] = useState<IStatementTransactionRow[]>([]);
  // endregion

  const { id } = useParams<IUrlParams>();

  // Вызывается один раз.
  const { counterparties, isCounterpartiesFetching, isCounterpartiesError } = useGetCounterparties();

  const { statementSummaryInfo, isStatementSummaryInfoError, isStatementSummaryInfoFetching } = useGetStatementSummaryInfo();

  const { dateFrom = '', dateTo = '' } = statementSummaryInfo ?? {};

  const headerProps = useScrollerHeaderProps({ dateFrom, dateTo });

  const { filterPanel, tagsPanel, filterValues } = useFilter({ fields, labels: tagLabels, storageKey: `${STORAGE_KEY}-${id}` });

  // Для улучшения типизации. Типу Record<string, unknown> нельзя присвоить интерфейс
  // у которого не определена "index signatures".
  const properlyTypedFilterPanel = (filterPanel as unknown) as IFilterPanel<IFormState>;

  const newPagination = useRestPagination({ filterValues, pagination, setPagination });

  const {
    response: { data: transactions, total: transactionsAmountByFilter, totalCount: totalTransactionsAmount },
    isTransactionsError,
    isTransactionsFetching,
  } = useGetTransactionsList({ filters: filterValues, sorting, pagination: newPagination });

  const contextValue: ITransactionScrollerContext = useMemo(
    () => ({
      hasError: hasError || isCounterpartiesError || isTransactionsError || isStatementSummaryInfoError,
      setHasError,
      isLoading: isLoading || isCounterpartiesFetching || isTransactionsFetching || isStatementSummaryInfoFetching,
      setIsLoading,
      filterPanel: properlyTypedFilterPanel,
      tagsPanel,
      counterparties,
      sorting,
      setSorting,
      pagination,
      setPagination,
      transactions,
      transactionsAmountByFilter,
      totalTransactionsAmount,
      statementSummaryInfo,
      selectedRows,
      setSelectedRows,
    }),
    [
      hasError,
      isCounterpartiesError,
      isTransactionsError,
      isStatementSummaryInfoError,
      isLoading,
      isCounterpartiesFetching,
      isTransactionsFetching,
      isStatementSummaryInfoFetching,
      properlyTypedFilterPanel,
      tagsPanel,
      counterparties,
      sorting,
      pagination,
      transactions,
      transactionsAmountByFilter,
      totalTransactionsAmount,
      statementSummaryInfo,
      selectedRows,
    ]
  );

  if (contextValue.hasError) {
    return (
      <MainLayout>
        <FatalErrorContent />
      </MainLayout>
    );
  }

  return (
    <TransactionScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <ScrollerPageLayout navigationLine={<ScrollerHeader {...headerProps} />}>
          <FilterLayout
            additionalFilter={AdditionalFilter}
            filterState={filterPanel}
            quickFilter={QuickFilter}
            tagsPanel={TagsPanel}
            tagsState={tagsPanel}
          />
          <StatementInfo />
          <Table />
          {selectedRows.length > 0 && <Footer />}
        </ScrollerPageLayout>
      </MainLayout>
    </TransactionScrollerContext.Provider>
  );
};

StatementTransactionScrollerPage.displayName = 'StatementTransactionScrollerPage';
