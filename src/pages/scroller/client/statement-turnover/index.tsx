import React from 'react';
import { ScrollerHeader } from 'components';
import { useTurnoverScrollerTabNavigationProps, useScrollerBreadcrumbsProps } from 'hooks';
import { MainLayout, ScrollerPageLayout } from '@platform/services/client';
import { useHeaderActions } from './hooks';

/**
 * Страница скроллера выписок, вкладка: "Обороты (ОСВ)".
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=34448309}
 */
export const StatementTurnoverScrollerPage = () => {
  const scrollerBreadcrumbsProps = useScrollerBreadcrumbsProps();

  const headerActions = useHeaderActions([
    /* TODO: Передавать выбранные в фильтре счета. */
  ]);

  const tabNavigationProps = useTurnoverScrollerTabNavigationProps();

  return (
    <ScrollerPageLayout
      categoryTabsProps={tabNavigationProps}
      isLoading={false}
      mainLayout={MainLayout}
      navigationLine={<ScrollerHeader actions={headerActions} {...scrollerBreadcrumbsProps} />}
      pageTitle=""
    />
  );
};

StatementTurnoverScrollerPage.displayName = 'StatementTurnoverScrollerPage';
