import React, { useMemo, useState } from 'react';
import { ContentLoader, ScrollerPageLayout, FilterLayout, RouteError, SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT } from 'components';
import { FocusNode, FocusTree } from 'components/focus-tree';
import { useIsFetchedData, useScrollerPagination, useStreamContentHeight } from 'hooks';
import { useMetricPageListener } from 'hooks/metric/use-metric-page-listener';
import type { IFilterPanel, IUrlParams } from 'interfaces';
import { HTTP_STATUS_CODE } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import {
  AdditionalFilter,
  FORM_FIELDS,
  QuickFilter,
  STORAGE_KEY,
  StatementInfo,
  TagsPanel,
  getFields,
  tagLabels,
  ADDITIONAL_FORM_FIELDS,
} from 'pages/scroller/client/statement-transaction/filter';
import type { IFormState } from 'pages/scroller/client/statement-transaction/filter';
import {
  useGetCounterparties,
  useGetStatementSummaryInfo,
  useGetTransactionsList,
  useScrollerHeaderProps,
} from 'pages/scroller/client/statement-transaction/hooks';
import { Table } from 'pages/scroller/client/statement-transaction/table';
import type { ITransactionScrollerContext } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import { DEFAULT_SORTING, TransactionScrollerContext } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import FocusLock from 'react-focus-lock';
import { useParams, useLocation } from 'react-router-dom';
import { getDateRangeValidationScheme } from 'schemas';
import type { ENTRY_SOURCE_VIEW } from 'stream-constants';
import { DEFAULT_PAGINATION, LINE_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE, TRANSACTIONS_SCROLLER_FILTER_NODE } from 'stream-constants/a11y-nodes';
import type { ISortSettings } from '@platform/services';
import { FatalErrorContent, MainLayout } from '@platform/services/client';
import { Gap, Line } from '@platform/ui';
import { validate } from '@platform/validation';

/**
 * Схема валидации формы фильтра ЭФ "Журнал проводок".
 */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.PAYMENT_DATE_FROM, dateTo: FORM_FIELDS.PAYMENT_DATE_TO });

/** Высота фильтра. Минус разделитель снизу и вверху фильтра. */
const FILTER_HEIGHT = 58 - LINE_HEIGHT * 2;
/** Высота инфоблока по проводкам. */
const STATEMENT_INFO_HEIGHT = 112;

/**
 * Страница скроллера: [Выписки_ЗВ] ЭФ Клиента "Журнал проводок".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=286756666
 */
export const StatementTransactionScrollerPage = () => {
  useMetricPageListener();

  const { id } = useParams<IUrlParams>();
  const { state: { entrySourceView } = {} } = useLocation<{ entrySourceView?: typeof ENTRY_SOURCE_VIEW }>();

  const [sorting, setSorting] = useState<ISortSettings>(DEFAULT_SORTING);
  const [selectedRows, setSelectedRows] = useState<IStatementTransactionRow[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  const fields = getFields(entrySourceView);
  const { pagination, setPagination, filterPanel, tagsPanel, filterValues } = useScrollerPagination({
    fields,
    labels: tagLabels,
    storageKey: `${STORAGE_KEY}-${id}`,
    defaultPagination: DEFAULT_PAGINATION,
  });

  // Вызывается один раз.
  const { data: counterparties, isError: isCounterpartiesError, isFetched: isCounterpartiesFetched } = useGetCounterparties();

  const {
    data: statementSummaryInfo,
    isError: isStatementSummaryInfoError,
    isFetched: isStatementSummaryInfoFetched,
  } = useGetStatementSummaryInfo();
  const headerProps = useScrollerHeaderProps(statementSummaryInfo);

  // Для улучшения типизации. Типу Record<string, unknown> нельзя присвоить интерфейс
  // у которого не определена "index signatures".
  const properlyTypedFilterPanel = (filterPanel as unknown) as IFilterPanel<IFormState>;

  const {
    data: { data: transactions, total: transactionsAmountByFilter, totalCount: totalTransactionsAmount, status: httpRequestStatus },
    isError: isTransactionsError,
    isFetched: isTransactionsFetched,
    isFetching: isTransactionsFetching,
    fetchedNewTransactions,
  } = useGetTransactionsList({ filters: filterValues, sorting, pagination });

  const counterpartiesFetched = useIsFetchedData(isCounterpartiesFetched);
  const transactionsFetched = useIsFetchedData(isTransactionsFetched);
  const statementSummaryInfoFetched = useIsFetchedData(isStatementSummaryInfoFetched);
  const dataFetched = counterpartiesFetched && transactionsFetched && statementSummaryInfoFetched;

  const contextValue: ITransactionScrollerContext = useMemo(
    () => ({
      hasError: hasError || isCounterpartiesError || isTransactionsError || isStatementSummaryInfoError,
      setHasError,
      transactionsUpdating: transactionsFetched && isTransactionsFetching,
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
      fetchedNewTransactions,
      isTransactionsFetched,
      isTransactionsError,
    }),
    [
      hasError,
      isCounterpartiesError,
      isTransactionsError,
      isStatementSummaryInfoError,
      transactionsFetched,
      isTransactionsFetching,
      properlyTypedFilterPanel,
      tagsPanel,
      counterparties,
      sorting,
      pagination,
      setPagination,
      transactions,
      transactionsAmountByFilter,
      totalTransactionsAmount,
      statementSummaryInfo,
      selectedRows,
      fetchedNewTransactions,
      isTransactionsFetched,
    ]
  );

  const height = useStreamContentHeight();

  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT - FILTER_HEIGHT - STATEMENT_INFO_HEIGHT;

  const isStatementForbidden = httpRequestStatus === HTTP_STATUS_CODE.FORBIDDEN;

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
        <FocusLock>
          <FocusTree treeId={COMMON_SCROLLER_NODE}>
            <ScrollerPageLayout headerProps={{ ...headerProps }} loading={!dataFetched}>
              <ContentLoader height={STATEMENT_INFO_HEIGHT} loading={!statementSummaryInfoFetched}>
                <StatementInfo />
              </ContentLoader>
              {!counterpartiesFetched && <Line fill="FAINT" />}
              <FocusNode nodeId={TRANSACTIONS_SCROLLER_FILTER_NODE} parentId={COMMON_SCROLLER_NODE}>
                <ContentLoader height={FILTER_HEIGHT} loading={!counterpartiesFetched}>
                  <Line fill="FAINT" />
                  <FilterLayout
                    AdditionalFilter={AdditionalFilter}
                    QuickFilter={QuickFilter}
                    TagsPanel={TagsPanel}
                    additionalFilterFields={ADDITIONAL_FORM_FIELDS}
                    filterFields={fields}
                    filterState={filterPanel}
                    tagsState={tagsPanel}
                    validate={validate(validationSchema)}
                  />
                </ContentLoader>
              </FocusNode>
              {!counterpartiesFetched && <Line fill="FAINT" />}
              <ContentLoader height={tableHeight} loading={!transactionsFetched}>
                <Gap.SM />
                <Table />
              </ContentLoader>
            </ScrollerPageLayout>
          </FocusTree>
        </FocusLock>
      </MainLayout>
    </TransactionScrollerContext.Provider>
  );
};

StatementTransactionScrollerPage.displayName = 'StatementTransactionScrollerPage';
