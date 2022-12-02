import React, { useMemo } from 'react';
import { ContentLoader, FilterLayout, ScrollerLoadingOverlay, ScrollerPageLayout } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusNode, FocusTree } from 'components/common/focus-tree';
import { useScheduleScrollerHeaderProps } from 'hooks/client';
import { useScrollerPagination, useScrollerTabsProps } from 'hooks/common';
import { ADDITIONAL_FORM_FIELDS, fields, QuickFilter, STORAGE_KEY, tagLabels } from 'pages/scroller/client/statement-history/filter';
import { AdditionalFilter } from 'pages/scroller/client/statement-history/filter/additional-filter';
import { TagsPanel } from 'pages/scroller/client/statement-history/filter/tags-panel';
import { DEFAULT_SORTING } from 'pages/scroller/client/statement-history/history-scroller-context';
import { DEFAULT_PAGINATION, QUICK_FILTER_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE, HISTORY_SCROLLER_FILTER_NODE } from 'stream-constants/a11y-nodes';
import { MainLayout } from '@platform/services/client';
import { Line } from '@platform/ui';
import { useGetStatementList } from './hooks/use-get-schedule-list';
import { ScheduleScrollerContext } from './schedule-scroller-context';
import type { IScheduleScrollerContext } from './schedule-scroller-context';
import { Table } from './table/table';

/**
 * [ВПР] ЭФ Клиента: заявки на выписку по расписанию.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=84446197
 * */
export const ScheduleHistoryScrollerPage = () => {
  const sorting = DEFAULT_SORTING;
  const tabsProps = useScrollerTabsProps();
  const headerProps = useScheduleScrollerHeaderProps();

  const { filterPanel, tagsPanel, filterValues, pagination } = useScrollerPagination({
    fields,
    labels: tagLabels,
    storageKey: STORAGE_KEY,
    defaultPagination: DEFAULT_PAGINATION,
  });

  const {
    data: { data: statements, total: totalStatementsAmount },
    isFetched: isStatementsFetched,
    isFetching: isStatementsFetching,
  } = useGetStatementList({ filters: filterValues, sorting, pagination });

  const contextValue: IScheduleScrollerContext = useMemo(
    () => ({
      statements,
      pagination,
      isStatementsFetched,
      totalStatementsAmount,
    }),
    [pagination, statements, totalStatementsAmount, isStatementsFetched]
  );

  return (
    <ScheduleScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <FocusLock>
          <FocusTree treeId={COMMON_SCROLLER_NODE}>
            <ScrollerPageLayout categoryTabs={tabsProps} headerProps={{ ...headerProps }} loading={isStatementsFetching}>
              <FocusNode hidden nodeId={HISTORY_SCROLLER_FILTER_NODE} parentId={COMMON_SCROLLER_NODE}>
                <ContentLoader height={QUICK_FILTER_HEIGHT} loading={isStatementsFetching}>
                  <FilterLayout
                    AdditionalFilter={AdditionalFilter}
                    QuickFilter={QuickFilter}
                    TagsPanel={TagsPanel}
                    additionalFilterFields={ADDITIONAL_FORM_FIELDS}
                    filterFields={fields}
                    filterState={filterPanel}
                    tagsState={tagsPanel}
                  />
                </ContentLoader>
              </FocusNode>
              {!isStatementsFetching && <Line fill="FAINT" />}
              <Table />
              {isStatementsFetching && <ScrollerLoadingOverlay />}
            </ScrollerPageLayout>
          </FocusTree>
        </FocusLock>
      </MainLayout>
    </ScheduleScrollerContext.Provider>
  );
};

ScheduleHistoryScrollerPage.displayName = 'ScheduleHistoryScrollerPage';
