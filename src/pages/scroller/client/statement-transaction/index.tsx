import React, { useMemo, useState } from 'react';
import { ScrollerPageLayout, ScrollerHeader, FilterLayout, RouteError } from 'components';
import { useScrollerPagination } from 'hooks';
import type { IFilterPanel, Sorting, IUrlParams } from 'interfaces';
import { HTTP_STATUS_CODE } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import { useParams } from 'react-router-dom';
import { DEFAULT_PAGINATION } from 'stream-constants';
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
  const { id } = useParams<IUrlParams>();

  // region элементы стейта контекста скроллера.
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sorting, setSorting] = useState<Sorting>(DEFAULT_SORTING);

  const { pagination, setPagination, filterPanel, tagsPanel, filterValues } = useScrollerPagination({
    fields,
    labels: tagLabels,
    storageKey: `${STORAGE_KEY}-${id}`,
    defaultPagination: DEFAULT_PAGINATION,
  });
  const [selectedRows, setSelectedRows] = useState<IStatementTransactionRow[]>([]);

  // Вызывается один раз.
  const { counterparties, isCounterpartiesFetching, isCounterpartiesError } = useGetCounterparties();

  const { statementSummaryInfo: info, isStatementSummaryInfoError, isStatementSummaryInfoFetching } = useGetStatementSummaryInfo();

  const headerProps = useScrollerHeaderProps(info);

  // Для улучшения типизации. Типу Record<string, unknown> нельзя присвоить интерфейс
  // у которого не определена "index signatures".
  const properlyTypedFilterPanel = (filterPanel as unknown) as IFilterPanel<IFormState>;

  const {
    response: { data: transactions, total: transactionsAmountByFilter, totalCount: totalTransactionsAmount, status },
    isTransactionsError,
    isTransactionsFetching,
  } = useGetTransactionsList({ filters: filterValues, sorting, pagination });

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
      statementSummaryInfo: info,
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
      setPagination,
      transactions,
      transactionsAmountByFilter,
      totalTransactionsAmount,
      info,
      selectedRows,
    ]
  );

  const isStatementForbidden = status === HTTP_STATUS_CODE.FORBIDDEN;

  if (isStatementForbidden) {
    return <RouteError />;
  }

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
