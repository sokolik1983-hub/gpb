import React, { useState, useMemo } from 'react';
import { ScrollerHeader } from 'components';
import { useScrollerTabsProps, useTurnoverScrollerHeaderProps } from 'hooks';
import { useAccounts } from 'hooks/use-accounts';
import type { Sorting, IFilterPanel } from 'interfaces';
import { FatalErrorContent, MainLayout, ScrollerPageLayout, useFilter } from '@platform/services/client';
import { fields, tagLabels, Filter } from './filter';
import type { FormState } from './filter/interfaces';
import { useTurnovers } from './hooks';
import { TurnoversTable } from './table';
import type { ITurnoverScrollerContext } from './turnover-scroller-context';
import { TurnoverScrollerContext, DEFAULT_SORTING } from './turnover-scroller-context';

/**
 * Страница скроллера выписок, вкладка: "Обороты (ОСВ)".
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=34448309}
 */
export const StatementTurnoverScrollerPage = () => {
  const tabsProps = useScrollerTabsProps();

  // region элементы стейта контекста скроллера.
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sorting, setSorting] = useState<Sorting>(DEFAULT_SORTING);
  // endregion

  const { filterPanel, tagsPanel } = useFilter({ fields, labels: tagLabels });

  // Для улучшения типизации. Типу Record<string, unknown> нельзя присвоить интерфейс
  // у которого не определена "index signatures".
  const properlyTypedFilterPanel = (filterPanel as unknown) as IFilterPanel<FormState>;

  const headerProps = useTurnoverScrollerHeaderProps([
    /* TODO: При реализации действия передавать выбранные в фильтре счета. */
  ]);

  // Вызывается один раз.
  const { accounts, isAccountsError, isAccountsFetching } = useAccounts();

  const { turnovers, isTurnoversError, isTurnoversFetching } = useTurnovers(properlyTypedFilterPanel.values, sorting);

  const contextValue: ITurnoverScrollerContext = useMemo(
    () => ({
      hasError: hasError || isTurnoversError || isAccountsError,
      setHasError,
      isLoading: isLoading || isTurnoversFetching || isAccountsFetching,
      setIsLoading,
      filterPanel: properlyTypedFilterPanel,
      accounts,
      tagsPanel,
      sorting,
      setSorting,
      turnovers,
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
      tagsPanel,
      turnovers,
    ]
  );

  if (hasError || isAccountsError) {
    return (
      <MainLayout>
        <FatalErrorContent />
      </MainLayout>
    );
  }

  return (
    <TurnoverScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <ScrollerPageLayout
          categoryTabsProps={tabsProps}
          isLoading={false}
          mainLayout={React.Fragment}
          navigationLine={<ScrollerHeader {...headerProps} />}
          pageTitle=""
        >
          <Filter />
          <TurnoversTable />
        </ScrollerPageLayout>
      </MainLayout>
    </TurnoverScrollerContext.Provider>
  );
};

StatementTurnoverScrollerPage.displayName = 'StatementTurnoverScrollerPage';
