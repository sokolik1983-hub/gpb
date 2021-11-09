import React from 'react';
import { ScrollerHeader } from 'components';
import { useScrollerTabsProps, useTurnoverScrollerHeaderProps } from 'hooks';
import { MainLayout, ScrollerPageLayout } from '@platform/services/client';

/**
 * Страница скроллера выписок, вкладка: "Обороты (ОСВ)".
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=34448309}
 */
export const StatementHistoryScrollerPage = () => {
  const headerProps = useTurnoverScrollerHeaderProps([
    /* TODO: Передавать выбранные в фильтре счета. */
  ]);

  const tabsProps = useScrollerTabsProps();

  return (
    <ScrollerPageLayout
      categoryTabsProps={tabsProps}
      isLoading={false}
      mainLayout={MainLayout}
      navigationLine={<ScrollerHeader {...headerProps} />}
      pageTitle=""
    />
  );
};

StatementHistoryScrollerPage.displayName = 'StatementHistoryScrollerPage';
