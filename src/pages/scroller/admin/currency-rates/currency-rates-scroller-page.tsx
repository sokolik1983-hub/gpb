import React, { useState } from 'react';
import { SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useStreamContentHeight } from 'hooks/common';
import { locale } from 'localization';
import { Filter } from 'pages/scroller/admin/currency-rates/filter';
import { Table } from 'pages/scroller/admin/currency-rates/table';
import { QUICK_FILTER_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import type { IFilters } from '@platform/core';
import { MainLayout } from '@platform/services/admin';

/**
 * [СпрВалКур] ЭФ Банка "Справочник курсов валют".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69873275
 */
export const CurrencyRatesScrollerPage = () => {
  const [filter, setFilter] = useState<IFilters>({});

  const contentHeight = useStreamContentHeight();
  const tableHeight = contentHeight - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT - QUICK_FILTER_HEIGHT;

  const headerProps = {
    header: locale.admin.currencyRatesScroller.pageTitle,
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

CurrencyRatesScrollerPage.displayName = 'CurrencyRatesScrollerPage';
