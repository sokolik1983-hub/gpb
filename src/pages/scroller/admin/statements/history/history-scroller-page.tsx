import React from 'react';
import type { ScrollerPageLayoutProps } from 'components/admin';
import { SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/admin';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useStreamContentHeight } from 'hooks/common';
import { locale } from 'localization';
import { Table } from 'pages/scroller/admin/statements/components';
import { Filter } from 'pages/scroller/admin/statements/components/filter';
import { FILTER_STORAGE_KEY, TABLE_STORAGE_KEY } from 'pages/scroller/admin/statements/history/constants';
import { useHeaderActions, useScrollerData } from 'pages/scroller/admin/statements/hooks';
import { statementService } from 'services/admin';
import { QUICK_FILTER_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import { MainLayout } from '@platform/services/admin';

/**
 * [Выписки_ЗВ] ЭФ Банка "Журнал запросов выписки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32247657
 */
export const StatementHistoryScrollerPage = () => {
  const { datePeriodInitialed, filter, setFilter, setDatePeriodFetched, setStatements, statements } = useScrollerData();

  const actions = useHeaderActions({
    dateFrom: filter.dateFrom?.value,
    dateTo: filter.dateTo?.value,
    statements,
  });

  const headerProps: ScrollerPageLayoutProps['headerProps'] = {
    actions,
    header: locale.admin.historyScroller.pageTitle,
  };

  const height = useStreamContentHeight();

  return (
    <MainLayout>
      <FocusLock>
        <FocusTree treeId={COMMON_SCROLLER_NODE}>
          <ScrollerPageLayout headerProps={headerProps}>
            <Filter setDatePeriodFetched={setDatePeriodFetched} setFilter={setFilter} storageKey={FILTER_STORAGE_KEY} />
            <Table
              apiMethod={statementService.getStatementHistoryList}
              filter={filter}
              height={height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT.BASE - QUICK_FILTER_HEIGHT}
              setStatements={setStatements}
              show={datePeriodInitialed}
              storageKey={TABLE_STORAGE_KEY}
            />
          </ScrollerPageLayout>
        </FocusTree>
      </FocusLock>
    </MainLayout>
  );
};

StatementHistoryScrollerPage.displayName = 'StatementHistoryScrollerPage';
