import React, { useState, useMemo } from 'react';
import { ContentLoader, SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components';
import { FocusLock } from 'components/focus-lock';
import { FocusNode, FocusTree } from 'components/focus-tree';
import { useIsFetchedData, useScrollerTabsProps, useTurnoverScrollerHeaderProps, useStreamContentHeight } from 'hooks';
import { useMetricPageListener } from 'hooks/metric/use-metric-page-listener';
import { useAccounts } from 'hooks/use-accounts';
import type { Sorting, IFilterPanel } from 'interfaces';
import { LINE_HEIGHT, TAB_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE, TURNOVERS_SCROLLER_FILTER_NODE } from 'stream-constants/a11y-nodes';
import { FatalErrorContent, MainLayout, useFilter } from '@platform/services/client';
import { Line } from '@platform/ui';
import { fields, labels, Filter } from './filter';
import type { IFormState } from './filter/interfaces';
import { useGroupByForRender, useTurnovers } from './hooks';
import { TurnoversTable } from './table';
import type { ITurnoverScrollerContext } from './turnover-scroller-context';
import { TurnoverScrollerContext } from './turnover-scroller-context';

/** Высота фильтра. Минус разделитель внизу фильтра. */
const FILTER_HEIGHT = 58 - LINE_HEIGHT;

/**
 * Страница скроллера выписок, вкладка: "Обороты (ОСВ)".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34448309
 */
export const StatementTurnoverScrollerPage = () => {
  useMetricPageListener();

  const tabsProps = useScrollerTabsProps();

  // region элементы стейта контекста скроллера.
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sorting, setSorting] = useState<Sorting>([]);
  // endregion

  const { filterPanel } = useFilter({ fields, labels });

  // Для улучшения типизации. Типу Record<string, unknown> нельзя присвоить интерфейс
  // у которого не определена "index signatures".
  const properlyTypedFilterPanel = (filterPanel as unknown) as IFilterPanel<IFormState>;

  const headerProps = useTurnoverScrollerHeaderProps();

  // Вызывается один раз.
  const { data: accounts, isError: isAccountsError, isFetched: isAccountsFetched } = useAccounts();

  const { data: turnovers, isError: isTurnoversError, isFetched: isTurnoversFetched, isFetching: isTurnoversFetching } = useTurnovers(
    properlyTypedFilterPanel.values,
    sorting
  );

  const accountsFetched = useIsFetchedData(isAccountsFetched);
  const turnoversFetched = useIsFetchedData(isTurnoversFetched);
  const dataFetched = accountsFetched && turnoversFetched;

  const groupByForRender = useGroupByForRender(properlyTypedFilterPanel.values.groupBy, isTurnoversFetching);

  const contextValue: ITurnoverScrollerContext = useMemo(
    () => ({
      hasError: hasError || isTurnoversError || isAccountsError,
      setHasError,
      turnoversUpdating: isLoading || (turnoversFetched && isTurnoversFetching),
      setIsLoading,
      filterPanel: properlyTypedFilterPanel,
      accounts,
      sorting,
      setSorting,
      turnovers,
      groupByForRender,
    }),
    [
      hasError,
      isTurnoversError,
      isAccountsError,
      isLoading,
      turnoversFetched,
      isTurnoversFetching,
      properlyTypedFilterPanel,
      accounts,
      sorting,
      turnovers,
      groupByForRender,
    ]
  );

  const height = useStreamContentHeight();

  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT - TAB_HEIGHT - FILTER_HEIGHT;

  if (hasError || isAccountsError || isTurnoversError) {
    return (
      <MainLayout>
        <FatalErrorContent />
      </MainLayout>
    );
  }

  return (
    <TurnoverScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <FocusLock>
          <FocusTree treeId={COMMON_SCROLLER_NODE}>
            <ScrollerPageLayout categoryTabs={tabsProps} headerProps={headerProps} loading={!dataFetched}>
              <FocusNode hidden nodeId={TURNOVERS_SCROLLER_FILTER_NODE} parentId={COMMON_SCROLLER_NODE}>
                <ContentLoader height={FILTER_HEIGHT} loading={!accountsFetched}>
                  <Filter />
                </ContentLoader>
              </FocusNode>
              {!accountsFetched && <Line fill="FAINT" />}
              <ContentLoader height={tableHeight} loading={!turnoversFetched}>
                <TurnoversTable />
              </ContentLoader>
            </ScrollerPageLayout>
          </FocusTree>
        </FocusLock>
      </MainLayout>
    </TurnoverScrollerContext.Provider>
  );
};

StatementTurnoverScrollerPage.displayName = 'StatementTurnoverScrollerPage';
