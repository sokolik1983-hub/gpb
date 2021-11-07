import React from 'react';
import { ScrollerHeader } from 'components';
import { useTurnoverScrollerTabNavigationProps, useScrollerBreadcrumbsProps } from 'hooks';
import { MainLayout, ScrollerPageLayout } from '@platform/services/client';

/**
 * Страница скроллера выписок, вкладка: "Обороты (ОСВ)".
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=34448309}
 */
export const StatementHistoryScrollerPage = () => {
  const scrollerBreadcrumbsProps = useScrollerBreadcrumbsProps();

  const tabNavigationProps = useTurnoverScrollerTabNavigationProps();

  return (
    <ScrollerPageLayout
      categoryTabsProps={tabNavigationProps}
      isLoading={false}
      mainLayout={MainLayout}
      navigationLine={<ScrollerHeader {...scrollerBreadcrumbsProps} />}
      pageTitle=""
    />
  );
};

StatementHistoryScrollerPage.displayName = 'StatementHistoryScrollerPage';
