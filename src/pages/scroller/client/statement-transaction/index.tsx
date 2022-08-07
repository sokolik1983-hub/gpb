import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ContentLoader, ScrollerPageLayout, FilterLayout, SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT } from 'components';
import { FocusLock } from 'components/focus-lock';
import { FocusNode, FocusTree } from 'components/focus-tree';
import { useIsFetchedData, usePrevious, useStreamContentHeight } from 'hooks';
import { useMetricPageListener } from 'hooks/metric/use-metric-page-listener';
import type { IFilterPanel, IUrlParams } from 'interfaces';
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
  useScrollerHeaderProps,
} from 'pages/scroller/client/statement-transaction/hooks';
import { Table } from 'pages/scroller/client/statement-transaction/table';
import type { ITransactionScrollerContext } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import { TransactionScrollerContext } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import { useDebounce } from 'platform-copies/hooks';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { useParams, useLocation } from 'react-router-dom';
import { getDateRangeValidationScheme } from 'schemas';
import { statementService } from 'services';
import type { ENTRY_SOURCE_VIEW } from 'stream-constants';
import { LINE_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE, TRANSACTIONS_SCROLLER_FILTER_NODE } from 'stream-constants/a11y-nodes';
import { convertTablePaginationToMetaData, convertTableSortByMap } from 'utils';
import { FatalErrorContent, MainLayout, useFilter } from '@platform/services/client';
import type { IMetaData } from '@platform/services/client';
import { Box, Gap, Line } from '@platform/ui';
import { validate } from '@platform/validation';
import { SORTING_MAP } from './constants';

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
  const fields = getFields(entrySourceView);
  const { filterPanel, filterValues, tagsPanel } = useFilter({
    fields,
    labels: tagLabels,
    storageKey: `${STORAGE_KEY}-${id}`,
  });

  const [selectedRows, setSelectedRows] = useState<IStatementTransactionRow[]>([]);
  const [transactionsFetching, setTransactionsFetching] = useState(false);

  const transactionsInitialed = useRef(false);
  const totalTransactions = useRef(0);

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

  const filterValuesDebounced = useDebounce(filterValues, 200);

  /** Функция получения данных по проводкам с сервера. */
  const fetchTransactions = useCallback(
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<IStatementTransactionRow>> => {
      setTransactionsFetching(true);

      try {
        const requestDto: IMetaData = {
          filters: filterValuesDebounced,
          multiSort: convertTableSortByMap(multiSort ? multiSort : {}, SORTING_MAP),
          ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
        };

        const { data: rows, totalCount: total } = await statementService.getTransactionList(requestDto, id);

        totalTransactions.current = total;

        return { rows, pageCount: Math.ceil(total / pageSize) };
      } catch {
        return { rows: [], pageCount: 0 };
      } finally {
        if (!transactionsInitialed.current) {
          transactionsInitialed.current = true;
        }

        setTransactionsFetching(false);
      }
    },
    [filterValuesDebounced, id]
  );

  const counterpartiesFetched = useIsFetchedData(isCounterpartiesFetched);
  const statementSummaryInfoFetched = useIsFetchedData(isStatementSummaryInfoFetched);
  const dataFetched = counterpartiesFetched && statementSummaryInfoFetched && transactionsInitialed.current;

  const prevTransactionsFetching = usePrevious(transactionsFetching);

  const contextValue: ITransactionScrollerContext = useMemo(
    () => ({
      counterparties,
      fetchedNewTransactions: Boolean(transactionsInitialed.current && prevTransactionsFetching && !transactionsFetching),
      filterPanel: properlyTypedFilterPanel,
      tagsPanel,
      transactionsUpdating: transactionsInitialed.current && transactionsFetching,
      totalTransactions: totalTransactions.current,
      selectedRows,
      setSelectedRows,
      statementSummaryInfo,
    }),
    [
      counterparties,
      prevTransactionsFetching,
      properlyTypedFilterPanel,
      tagsPanel,
      transactionsFetching,
      selectedRows,
      statementSummaryInfo,
    ]
  );

  const height = useStreamContentHeight();

  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT - FILTER_HEIGHT - STATEMENT_INFO_HEIGHT;

  if (isCounterpartiesError || isStatementSummaryInfoError) {
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
              <FocusNode hidden nodeId={TRANSACTIONS_SCROLLER_FILTER_NODE} parentId={COMMON_SCROLLER_NODE}>
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
              <ContentLoader height={tableHeight} loading={!transactionsInitialed.current}>
                <Box />
              </ContentLoader>
              <>
                <Gap.SM />
                <Table fetchData={fetchTransactions} />
              </>
            </ScrollerPageLayout>
          </FocusTree>
        </FocusLock>
      </MainLayout>
    </TransactionScrollerContext.Provider>
  );
};

StatementTransactionScrollerPage.displayName = 'StatementTransactionScrollerPage';
