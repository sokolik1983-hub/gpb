import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { executor, viewEntry } from 'actions/admin';
import { ContentLoader, SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useStreamContentHeight } from 'hooks/common';
import type { IUrlParams } from 'interfaces';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
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
import { columns } from './columns';
import { Footer } from './components/footer-content';
import { PaymentPurposeRow } from './components/payment-purpose-row';
import { TURNOVER_TOTAL_HEIGHT, TurnoverTotal } from './components/turnover-total';
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
  const total = useRef<number>(0);

  const [visibleOnlySelectedRows, setVisibleOnlySelectedRows] = useState<boolean>(defaultValue.visibleOnlySelectedRows);
  const [selectedRows, setSelectedRows] = useState<BankAccountingEntryCard[]>(defaultValue.selectedRows);
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

        total.current = size;

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

  const {
    data: { groups: totalTurnovers, statement },
    isFetching: isTotalTurnoversFetching,
  } = useStatementSummary();

  const contextValue: IEntriesScrollerContext = useMemo(
    () => ({
      selectedRows,
      setSelectedRows,
      total: total.current,
      groupBy,
      setGroupBy,
      visibleOnlySelectedRows,
      setVisibleOnlySelectedRows,
      totalTurnovers,
      filters,
    }),
    [filters, groupBy, selectedRows, totalTurnovers, visibleOnlySelectedRows]
  );

  const footerActions = useCallback(
    scrollerExecutor => (rows: BankAccountingEntryCard[]) =>
      getActiveActionButtons(getAvailableActions(FOOTER_ACTIONS), scrollerExecutor, [rows, id]),
    [getAvailableActions, id]
  );

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(HEADER_ACTIONS), executor, [[], id]), [getAvailableActions, id]);

  const headerProps = {
    actions,
    header: locale.transactionsScroller.title({
      dateFrom: formatDateTime(statement?.dateFrom, { keepLocalTime: true, format: DATE_FORMAT }),
      dateTo: formatDateTime(statement?.dateTo, { keepLocalTime: true, format: DATE_FORMAT }),
    }),
  };

  const height = useStreamContentHeight();

  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT - FILTER_HEIGHT - TURNOVER_TOTAL_HEIGHT;

  const handRowClick = useCallback(
    row => {
      void executor.execute(viewEntry, [row], id);
    },
    [id]
  );

  return (
    <MainLayout>
      <FocusLock>
        <FocusTree treeId={COMMON_SCROLLER_NODE}>
          <EntriesScrollerContext.Provider value={contextValue}>
            <Box style={{ height }}>
              <LayoutScroll>
                <ScrollerPageLayout headerProps={headerProps} loading={isTotalTurnoversFetching}>
                  <ContentLoader height={TURNOVER_TOTAL_HEIGHT} loading={isTotalTurnoversFetching}>
                    <TurnoverTotal />
                  </ContentLoader>
                  <Filter fetchedNewTransactions setFilters={setFilters} />
                  <ContentLoader height={tableHeight} loading={!entriesInitialed}>
                    <Box />
                  </ContentLoader>
                  <>
                    <TableRowsInfo />
                    <Table<BankAccountingEntryGroup, BankAccountingEntryCard>
                      columns={columns}
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
