import React, { useState, useMemo } from 'react';
import { ScrollerHeader, ScrollerPageLayout } from 'components';
import { useIsFetchedData, useScrollerTabsProps, useTurnoverScrollerHeaderProps } from 'hooks';
import { useAccounts } from 'hooks/use-accounts';
import type { Sorting, IFilterPanel } from 'interfaces';
import { FatalErrorContent, MainLayout, useFilter } from '@platform/services/client';
import { fields, labels, Filter } from './filter';
import type { IFormState } from './filter/interfaces';
import { useGroupByForRender, useTurnovers } from './hooks';
import { TurnoversTable } from './table';
import type { ITurnoverScrollerContext } from './turnover-scroller-context';
import { TurnoverScrollerContext } from './turnover-scroller-context';

/**
 * Страница скроллера выписок, вкладка: "Обороты (ОСВ)".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34448309
 */
export const StatementTurnoverScrollerPage = () => {
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
  const { data: accounts, isError: isAccountsError, isFetched: isAccountsFetched, isFetching: isAccountsFetching } = useAccounts();

  const { data: turnovers, isError: isTurnoversError, isFetched: isTurnoversFetched, isFetching: isTurnoversFetching } = useTurnovers(
    properlyTypedFilterPanel.values,
    sorting
  );

  const dataFetched = useIsFetchedData(isAccountsFetched, isTurnoversFetched);

  const groupByForRender = useGroupByForRender(properlyTypedFilterPanel.values.groupBy, isTurnoversFetching);

  const contextValue: ITurnoverScrollerContext = useMemo(
    () => ({
      hasError: hasError || isTurnoversError || isAccountsError,
      setHasError,
      isLoading: isLoading || isTurnoversFetching || isAccountsFetching,
      setIsLoading,
      filterPanel: properlyTypedFilterPanel,
      accounts,
      sorting,
      setSorting,
      turnovers,
      groupByForRender,
    }),
    [
      properlyTypedFilterPanel,
      accounts,
      hasError,
      isAccountsError,
      isAccountsFetching,
      isLoading,
      isTurnoversError,
      isTurnoversFetching,
      sorting,
      turnovers,
      groupByForRender,
    ]
  );

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
        <ScrollerPageLayout categoryTabsProps={tabsProps} isLoading={!dataFetched} navigationLine={<ScrollerHeader {...headerProps} />}>
          <Filter />
          <TurnoversTable />
        </ScrollerPageLayout>
      </MainLayout>
    </TurnoverScrollerContext.Provider>
  );
};

StatementTurnoverScrollerPage.displayName = 'StatementTurnoverScrollerPage';
