import type { FC } from 'react';
import React, { useCallback, useState } from 'react';
import type { ScrollerPageLayoutProps } from 'components/admin';
import { SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/admin';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useStreamContentHeight } from 'hooks/common';
import { locale } from 'localization';
import { Filter } from 'pages/scroller/admin/closed-days/filter';
import { Table } from 'pages/scroller/admin/closed-days/table';
import { QUICK_FILTER_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import type { IFilters } from '@platform/core';
import { MainLayout } from '@platform/services/admin';

/**
 * [Выписки_ЗВ] ЭФ Банка "Журнал закрытых дней".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440041
 */
export const ClosedDaysScrollerPage: FC = () => {
  const [datePeriodInitialed, setDatePeriodInitialed] = useState(false);
  const [filter, setFilter] = useState<IFilters>({});

  const height = useStreamContentHeight();
  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT.BASE - QUICK_FILTER_HEIGHT;

  const headerProps: ScrollerPageLayoutProps['headerProps'] = {
    header: locale.admin.closedDaysScroller.pageTitle,
  };

  /** Метод срабатывает при получении периода дат по типу.
   * Устанавливает признак получения периода дат (получение первых данных). */
  const setDatePeriodFetched = useCallback(() => {
    if (!datePeriodInitialed) {
      setDatePeriodInitialed(true);
    }
  }, [datePeriodInitialed]);

  return (
    <MainLayout>
      <FocusLock>
        <FocusTree treeId={COMMON_SCROLLER_NODE}>
          <ScrollerPageLayout headerProps={headerProps}>
            <Filter setDatePeriodFetched={setDatePeriodFetched} setFilter={setFilter} />
            <Table filter={filter} height={tableHeight} show={datePeriodInitialed} />
          </ScrollerPageLayout>
        </FocusTree>
      </FocusLock>
    </MainLayout>
  );
};

ClosedDaysScrollerPage.displayName = 'ClosedDaysScrollerPage';
