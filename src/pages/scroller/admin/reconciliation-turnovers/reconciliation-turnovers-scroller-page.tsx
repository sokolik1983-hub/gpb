import React, { useState } from 'react';
import { SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useStreamContentHeight } from 'hooks/common';
import { locale } from 'localization';
import { FILTER_HEIGHT, Filter } from 'pages/scroller/admin/reconciliation-turnovers/filter';
import { Table } from 'pages/scroller/admin/reconciliation-turnovers/table';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import type { IFilters } from '@platform/core';
import { MainLayout } from '@platform/services/admin';

/**
 * [Выписки_ЗВ] ЭФ Банка "Журнал сверки остатков/оборотов".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=76415533
 */
export const ReconciliationTurnoversScrollerPage = () => {
  const [filter, setFilter] = useState<IFilters>({});

  const contentHeight = useStreamContentHeight();
  const tableHeight = contentHeight - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT - FILTER_HEIGHT;

  const headerProps = {
    header: locale.admin.reconciliationTurnoversScroller.pageTitle,
  };

  return (
    <MainLayout>
      <FocusLock>
        <FocusTree treeId={COMMON_SCROLLER_NODE}>
          <ScrollerPageLayout headerProps={headerProps}>
            <Filter setFilter={setFilter} />
            <Table filter={filter} height={tableHeight} />
          </ScrollerPageLayout>
        </FocusTree>
      </FocusLock>
    </MainLayout>
  );
};

ReconciliationTurnoversScrollerPage.displayName = 'ReconciliationTurnoversScrollerPage';
