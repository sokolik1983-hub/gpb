import React, { useState, useMemo, useEffect } from 'react';
import { ScrollerHeader } from 'components';
import { useScrollerTabsProps, useTurnoverScrollerHeaderProps } from 'hooks';
import { useAccounts } from 'hooks/use-accounts';
import { FatalErrorContent, MainLayout, ScrollerPageLayout, useFilter } from '@platform/services/client';
import { Typography } from '@platform/ui';
import { fields, tagLabels, Filter } from './filter';
import type { ITurnoverScrollerContext } from './turnover-scroller-context';
import { TurnoverScrollerContext } from './turnover-scroller-context';

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
  // endregion

  const { filterPanel, tagsPanel } = useFilter({ fields, labels: tagLabels });

  const headerProps = useTurnoverScrollerHeaderProps([
    /* TODO: При реализации действия передавать выбранные в фильтре счета. */
  ]);

  // Вызывается один раз.
  const { accounts, isAccountsError, isAccountsFetching } = useAccounts();

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

  const contextValue: ITurnoverScrollerContext = useMemo(
    () => ({
      hasError,
      setHasError,
      isLoading,
      setIsLoading,
      filterPanel,
      accounts,
      tagsPanel,
    }),
    [accounts, filterPanel, hasError, isLoading, tagsPanel]
  );

  if (isAccountsFetching) {
    return null;
  }

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
          {/* TODO: Тестовый лоадер для отладки UI. Переделается когда будет подключатся таблица. */}
          {isLoading && <Typography.H3>LOADING...</Typography.H3>}
        </ScrollerPageLayout>
      </MainLayout>
    </TurnoverScrollerContext.Provider>
  );
};

StatementTurnoverScrollerPage.displayName = 'StatementTurnoverScrollerPage';
