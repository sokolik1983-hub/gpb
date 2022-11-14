import React from 'react';
import { SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useStreamContentHeight } from 'hooks/common';
import { locale } from 'localization';
import { Table } from 'pages/scroller/admin/statements/components';
import { Filter } from 'pages/scroller/admin/statements/components/filter';
import { useHeaderActions, useScrollerData } from 'pages/scroller/admin/statements/hooks';
import { FILTER_STORAGE_KEY, TABLE_STORAGE_KEY } from 'pages/scroller/admin/statements/related-queries/constants';
import { statementService } from 'services/admin';
import { QUICK_FILTER_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import { MainLayout } from '@platform/services/admin';

/**
 * [Выписки_ЗВ] ЭФ Банка "Связанные запросы".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=80646563
 */
export const RelatedQueriesScrollerPage = () => {
  const { datePeriodInitialed, filter, setFilter, setDatePeriodFetched, setStatements, statements } = useScrollerData();

  const actions = useHeaderActions({
    dateFrom: filter.dateFrom?.value,
    dateTo: filter.dateTo?.value,
    statements,
  });

  const headerProps = {
    actions,
    header: locale.admin.relatedQueriesScroller.pageTitle,
  };

  const height = useStreamContentHeight();

  return (
    <MainLayout>
      <FocusLock>
        <FocusTree treeId={COMMON_SCROLLER_NODE}>
          <ScrollerPageLayout headerProps={headerProps}>
            <Filter setDatePeriodFetched={setDatePeriodFetched} setFilter={setFilter} storageKey={FILTER_STORAGE_KEY} />
            <Table
              apiMethod={statementService.getRelatedQueryList}
              filter={filter}
              height={height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT - QUICK_FILTER_HEIGHT}
              placeholderMessage={locale.admin.relatedQueriesScroller.table.placeholder.message}
              placeholderTitle={locale.admin.relatedQueriesScroller.table.placeholder.title}
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

RelatedQueriesScrollerPage.displayName = 'RelatedQueriesScrollerPage';
