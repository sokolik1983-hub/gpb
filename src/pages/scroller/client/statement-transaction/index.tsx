import React, { useMemo, useState } from 'react';
import { ScrollerPageLayout, ScrollerHeader, FilterLayout, RouteError } from 'components';
import { useScrollerPagination } from 'hooks';
import type { IFilterPanel, Sorting, IUrlParams } from 'interfaces';
import { HTTP_STATUS_CODE } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import {
  AdditionalFilter,
  FORM_FIELDS,
  QuickFilter,
  STORAGE_KEY,
  StatementInfo,
  TagsPanel,
  fields,
  tagLabels,
} from 'pages/scroller/client/statement-transaction/filter';
import type { IFormState } from 'pages/scroller/client/statement-transaction/filter';
import {
  useGetCounterparties,
  useGetStatementSummaryInfo,
  useGetTransactionsList,
  useScrollerHeaderProps,
} from 'pages/scroller/client/statement-transaction/hooks';
import { Footer, Table } from 'pages/scroller/client/statement-transaction/table';
import type { ITransactionScrollerContext } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import { DEFAULT_SORTING, TransactionScrollerContext } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import { useParams } from 'react-router-dom';
import { getDateRangeValidationScheme } from 'schemas';
import { DEFAULT_PAGINATION } from 'stream-constants';
import { FatalErrorContent, MainLayout } from '@platform/services/client';
import { validate } from '@platform/validation';

/**
 * Схема валидации формы фильтра ЭФ "Журнал проводок".
 */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.PAYMENT_DATE_FROM, dateTo: FORM_FIELDS.PAYMENT_DATE_TO });

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
            validate={validate(validationSchema)}
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
