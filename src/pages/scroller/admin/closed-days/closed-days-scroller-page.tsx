import type { FC } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import { ContentLoader, SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useStreamContentHeight } from 'hooks/common';
import { locale } from 'localization';
import type { ClosedDaysContextProps } from 'pages/scroller/admin/closed-days/context';
import { ClosedDaysContext } from 'pages/scroller/admin/closed-days/context';
import { Filter, FILTER_HEIGHT } from 'pages/scroller/admin/closed-days/filter';
import { Table } from 'pages/scroller/admin/closed-days/table';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import type { IFilters } from '@platform/core';
import { MainLayout } from '@platform/services/admin';
import { Box } from '@platform/ui';

/**
 * [Выписки_ЗВ] ЭФ Банка "Журнал закрытых дней".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440041
 */
export const ClosedDaysScrollerPage: FC = () => {
  const [datePeriodInitialed, setDatePeriodInitialed] = useState(false);
  const [tableInitialed, setTableInitialed] = useState(false);
  const [filter, setFilter] = useState<IFilters>({});

  const height = useStreamContentHeight();
  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT - FILTER_HEIGHT;

  const headerProps = {
    header: locale.admin.closedDaysScroller.pageTitle,
  };

  /** Метод срабатывает при получении периода дат по типу.
   * Устанавливает признак получения периода дат (получение первых данных). */
  const setDatePeriodFetched = useCallback(() => {
    if (!datePeriodInitialed) {
      setDatePeriodInitialed(true);
    }
  }, [datePeriodInitialed]);

  /** Метод срабатывает при получении данных таблицы.
   * Устанавливает признак инициализации таблицы (получение первых данных). */
  const setDataTableFetched = useCallback(() => {
    if (!tableInitialed) {
      setTableInitialed(true);
    }
  }, [tableInitialed]);

  const contextValue: ClosedDaysContextProps = useMemo(() => ({ setDatePeriodFetched }), [setDatePeriodFetched]);

  return (
    <ClosedDaysContext.Provider value={contextValue}>
      <MainLayout>
        <FocusLock>
          <FocusTree treeId={COMMON_SCROLLER_NODE}>
            <ScrollerPageLayout headerProps={headerProps}>
              <Filter setFilter={setFilter} />
              <ContentLoader height={tableHeight} loading={!tableInitialed}>
                <Box />
              </ContentLoader>
              {datePeriodInitialed && <Table filter={filter} setDataTableFetched={setDataTableFetched} />}
            </ScrollerPageLayout>
          </FocusTree>
        </FocusLock>
      </MainLayout>
    </ClosedDaysContext.Provider>
  );
};

ClosedDaysScrollerPage.displayName = 'ClosedDaysScrollerPage';
