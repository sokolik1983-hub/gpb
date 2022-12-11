import React, { useMemo } from 'react';
import { PageHeader } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { useScrollerTabsProps } from 'hooks/client';
import { useScrollerPagination } from 'hooks/common';
import { locale } from 'localization';
import type { IScheduleScrollerContext } from 'pages/scroller/client/schedule-history/schedule-scroller-context';
import { fields, STORAGE_KEY, tagLabels } from 'pages/scroller/client/statement-history/filter';
import { DEFAULT_SORTING } from 'pages/scroller/client/statement-history/history-scroller-context';
import { DEFAULT_PAGINATION } from 'stream-constants';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { MainLayout, useRedirect } from '@platform/services/client';
import { CategoryTabs, Gap, Horizon } from '@platform/ui';
import { useGetScheduleStatement } from './hooks/use-get-schedule-list';
import { ScheduleScrollerContext } from './schedule-scroller-context';
import { Table } from './table/table';

export const ScheduleStatementRequestHistory = () => {
  const goBack = useRedirect(COMMON_STREAM_URL.STATEMENT_SCHEDULE_HISTORY);
  const categoryTabs = useScrollerTabsProps();

  const sorting = DEFAULT_SORTING;

  const { filterValues, pagination } = useScrollerPagination({
    fields,
    labels: tagLabels,
    storageKey: STORAGE_KEY,
    defaultPagination: DEFAULT_PAGINATION,
  });

  const {
    data: { data: statements, total: totalStatementsAmount },
    isFetched: isStatementsFetched,
  } = useGetScheduleStatement({ filters: filterValues, sorting, pagination });

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
        <Gap.XL />
        <Horizon>
          <Gap.XL />
          <Gap.XS />
          <PageHeader
            backButtonTitle={locale.client.breadcrumbs.toRequestsListPage}
            header={locale.client.scheduleStatementPage.title}
            onClick={goBack}
          />
        </Horizon>
        <Horizon>
          <Gap.XL />
          <Gap.XS />
          <CategoryTabs {...categoryTabs} />
        </Horizon>
        <FocusLock>
          <Table />
        </FocusLock>
        <Gap.XL />
      </MainLayout>
    </ScheduleScrollerContext.Provider>
  );
};
ScheduleStatementRequestHistory.displayName = 'ScheduleStatementRequestHistory';
