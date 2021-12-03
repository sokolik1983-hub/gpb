import React, { useMemo, useState, useEffect } from 'react';
import { ScrollerHeader, FilterLayout, ScrollerPageLayout } from 'components';
import { ScrollerSpinnerPlaceholder } from 'components/scroller-spinner-placeholder';
import { useScrollerTabsProps, useTurnoverScrollerHeaderProps } from 'hooks';
import { useAccounts } from 'hooks/use-accounts';
import type { IFilterPanel } from 'interfaces';
import { AdditionalFilter } from 'pages/scroller/client/statement-history/filter/additional-filter';
import { TagsPanel } from 'pages/scroller/client/statement-history/filter/tags-panel';
import type { IHistoryScrollerContext } from 'pages/scroller/client/statement-history/history-scroller-context';
import { HistoryScrollerContext } from 'pages/scroller/client/statement-history/history-scroller-context';
import { useFilter, FatalErrorContent, MainLayout } from '@platform/services/client';
import type { IFormState } from './filter';
import { QuickFilter, fields, tagLabels, STORAGE_KEY } from './filter';

/**
 * Страница скроллера выписок, вкладка: "Обороты (ОСВ)".
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=34448309}
 */
export const StatementHistoryScrollerPage = () => {
  const tabsProps = useScrollerTabsProps();

  // region элементы стейта контекста скроллера.
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // endregion

  const { filterPanel, tagsPanel } = useFilter({ fields, labels: tagLabels, storageKey: STORAGE_KEY });

  // Для улучшения типизации. Типу Record<string, unknown> нельзя присвоить интерфейс
  // у которого не определена "index signatures".
  const properlyTypedFilterPanel = (filterPanel as unknown) as IFilterPanel<IFormState>;

  const headerProps = useTurnoverScrollerHeaderProps([
    /* TODO: Передавать выбранные в фильтре счета. */
  ]);

  // Вызывается один раз.
  const { accounts, isAccountsError, isAccountsFetching } = useAccounts();

  const contextValue: IHistoryScrollerContext = useMemo(
    () => ({
      hasError: hasError || isAccountsError,
      setHasError,
      isLoading: isLoading || isAccountsFetching,
      setIsLoading,
      filterPanel: properlyTypedFilterPanel,
      tagsPanel,
      accounts,
    }),
    [accounts, hasError, isAccountsError, isAccountsFetching, isLoading, properlyTypedFilterPanel, tagsPanel]
  );

  // TODO: Хук для отладки UI. При реализации таблицы скроллера убрать.
  useEffect(() => {
    setIsLoading(true);
    void new Promise(resolve => {
      setTimeout(() => {
        setIsLoading(false);
        resolve('');
      }, 500);
    });
  }, [filterPanel.values]);

  if (hasError || isAccountsError) {
    return (
      <MainLayout>
        <FatalErrorContent />
      </MainLayout>
    );
  }

  return (
    <HistoryScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <ScrollerPageLayout categoryTabsProps={tabsProps} isLoading={false} navigationLine={<ScrollerHeader {...headerProps} />}>
          <FilterLayout
            additionalFilter={AdditionalFilter}
            filterState={filterPanel}
            quickFilter={QuickFilter}
            tagsPanel={TagsPanel}
            tagsState={tagsPanel}
          />
          {/* TODO: лоадер для разработки. Удалить при разработке таблицы скроллера. */}
          {isLoading && <ScrollerSpinnerPlaceholder />}
        </ScrollerPageLayout>
      </MainLayout>
    </HistoryScrollerContext.Provider>
  );
};

StatementHistoryScrollerPage.displayName = 'StatementHistoryScrollerPage';
