import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { executor, viewEntry, viewStatementHistoryScroller } from 'actions/admin';
import type { ScrollerPageLayoutProps } from 'components/admin';
import { SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/admin';
import { ContentLoader } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useStreamContentHeight } from 'hooks/common';
import type { IUrlParams } from 'interfaces';
import type { BankAccountingEntryTurnoverCard } from 'interfaces/admin/dto/bank-accounting-entry-turnover-card';
import { locale } from 'localization';
import { TableRowsInfo } from 'pages/scroller/admin/entries-scroller/components/table-rows-info';
import { useStatementSummary } from 'pages/scroller/admin/entries-scroller/hooks';
import type { IFetchDataParams } from 'platform-copies/services';
import { useParams } from 'react-router-dom';
import { statementService } from 'services/admin';
import { LINE_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import { convertTablePaginationToMetaData, convertTableSortByMap, getActiveActionButtons } from 'utils/common';
import type { IFilters } from '@platform/core';
import type { IMetaData } from '@platform/services';
import { DATE_FORMAT } from '@platform/services';
import { MainLayout, useAuth } from '@platform/services/admin';
import { formatDateTime } from '@platform/tools/date-time';
import { LayoutScroll, Box } from '@platform/ui';
import { FOOTER_ACTIONS, HEADER_ACTIONS } from './action-configs';
import { columns, columnsGroupedByAccount } from './columns';
import { Footer } from './components/footer-content';
import { PaymentPurposeRow } from './components/payment-purpose-row';
import { STATEMENT_SUMMARY_HEIGHT, StatementSummary } from './components/statement-summary';
import { DEFAULT_SORT, GROUP_BY, SORTING_MAP, STORAGE_KEY } from './constants';
import type { IEntriesScrollerContext } from './context';
import { defaultValue, EntriesScrollerContext } from './context';
import { Filter } from './filter';
import { SettingsForm } from './settings-form';
import { Table } from './table';
import type { BankAccountingEntryGroup } from './types';
import { rowsWithIds } from './utils';

const FILTER_HEIGHT = 58 - LINE_HEIGHT;

/** Геттер для подстрок. */
// FIXME: из проблем с тпизацией в getSubRows originalRow типа any
const getSubRows = (originalRow: any) => originalRow.entries ?? [];

/** Компонент страницы со скрллером проводок. */
export const EntriesScrollerPage: React.FC = () => {
  const { id } = useParams<IUrlParams>();

  const [total, setTotal] = useState(0);
  const [visibleOnlySelectedRows, setVisibleOnlySelectedRows] = useState<boolean>(defaultValue.visibleOnlySelectedRows);
  const [selectedRows, setSelectedRows] = useState<BankAccountingEntryTurnoverCard[]>(defaultValue.selectedRows);
  const [groupBy, setGroupBy] = useState<GROUP_BY>(defaultValue.groupBy);
  const [filters, setFilters] = useState<IFilters>({});
  const [entriesInitialed, setEntriesInitialed] = useState(false);

  useEffect(() => {
    if (selectedRows.length === 0) {
      setVisibleOnlySelectedRows(false);
    }
  }, [selectedRows, setVisibleOnlySelectedRows]);

  const { getAvailableActions } = useAuth();

  const fetchData = useCallback(
    async ({ page: pageIndex, pageSize, multiSort }: IFetchDataParams) => {
      const metaData: IMetaData = {
        filters,
        multiSort: convertTableSortByMap(multiSort ?? DEFAULT_SORT, SORTING_MAP),
        ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
      };

      try {
        const { page, size } = await statementService.getEntries(metaData, id, groupBy);

        setTotal(size);

        return {
          rows: rowsWithIds(page),
          pageCount: Math.ceil(size / pageSize),
        };
      } catch {
        return { rows: [], pageCount: 0 };
      } finally {
        if (!entriesInitialed) {
          setEntriesInitialed(true);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters, groupBy, id]
  );

  const { data: statementSummary, isFetching: isTotalTurnoversFetching } = useStatementSummary();

  const contextValue: IEntriesScrollerContext = useMemo(
    () => ({
      selectedRows,
      setSelectedRows,
      total,
      groupBy,
      setGroupBy,
      visibleOnlySelectedRows,
      setVisibleOnlySelectedRows,
      statementSummary,
      filters,
    }),
    [filters, groupBy, selectedRows, statementSummary, total, visibleOnlySelectedRows]
  );

  const footerActions = useCallback(
    scrollerExecutor => (rows: BankAccountingEntryTurnoverCard[]) =>
      getActiveActionButtons(getAvailableActions(FOOTER_ACTIONS), scrollerExecutor, [rows, id]),
    [getAvailableActions, id]
  );

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(HEADER_ACTIONS), executor, [[], id]), [getAvailableActions, id]);

  const headerProps: ScrollerPageLayoutProps['headerProps'] = {
    actions,
    backButtonTitle: locale.common.button.toStatementRequests,
    header: locale.transactionsScroller.title({
      dateFrom: formatDateTime(statementSummary.statement?.dateFrom, { keepLocalTime: true, format: DATE_FORMAT }),
      dateTo: formatDateTime(statementSummary.statement?.dateTo, { keepLocalTime: true, format: DATE_FORMAT }),
    }),
    onBack: () => void executor.execute(viewStatementHistoryScroller),
  };

  const height = useStreamContentHeight();

  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT.WITH_BACK_BUTTON - FILTER_HEIGHT - STATEMENT_SUMMARY_HEIGHT;

  const handRowClick = useCallback(row => {
    void executor.execute(viewEntry, [row]);
  }, []);

  const filteredColumns = useMemo(() => {
    switch (groupBy) {
      case GROUP_BY.BY_ACCOUNT:
        return columnsGroupedByAccount;
      case GROUP_BY.WITHOUT:
        return columns;
      default:
        return columns;
    }
  }, [groupBy]);

  return (
    <MainLayout>
      <FocusLock>
        <FocusTree treeId={COMMON_SCROLLER_NODE}>
          <EntriesScrollerContext.Provider value={contextValue}>
            <Box style={{ height }}>
              <LayoutScroll>
                <ScrollerPageLayout headerProps={headerProps} loading={isTotalTurnoversFetching}>
                  <ContentLoader height={STATEMENT_SUMMARY_HEIGHT} loading={isTotalTurnoversFetching}>
                    <StatementSummary />
                  </ContentLoader>
                  <Filter fetchedNewTransactions setFilters={setFilters} />
                  <ContentLoader height={tableHeight} loading={!entriesInitialed}>
                    <Box />
                  </ContentLoader>
                  <>
                    <TableRowsInfo />
                    <Table<BankAccountingEntryGroup, BankAccountingEntryTurnoverCard>
                      columns={filteredColumns}
                      customSettingsForm={SettingsForm}
                      defaultSort={DEFAULT_SORT}
                      executor={executor}
                      fetchData={fetchData}
                      footerActionsGetter={footerActions}
                      footerContent={Footer}
                      getSubRows={getSubRows}
                      rowCaptionComponent={PaymentPurposeRow}
                      selectedRows={selectedRows}
                      storageKey={STORAGE_KEY}
                      visibleOnlySelectedRows={visibleOnlySelectedRows}
                      withGrouping={groupBy !== GROUP_BY.WITHOUT}
                      onRowClick={handRowClick}
                      onSelectedRowsChange={setSelectedRows}
                    />
                  </>
                </ScrollerPageLayout>
              </LayoutScroll>
            </Box>
          </EntriesScrollerContext.Provider>
        </FocusTree>
      </FocusLock>
    </MainLayout>
  );
};

EntriesScrollerPage.displayName = 'EntriesScrollerPage';
