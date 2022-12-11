import React from 'react';
import { PageHeader } from 'components/common';
import { useScrollerTabsProps } from 'hooks/client';
import { locale } from 'localization';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { MainLayout, useRedirect } from '@platform/services/client';
import { CategoryTabs, Gap, Horizon } from '@platform/ui';

export const ScheduleStatement = () => {
  const goBack = useRedirect(COMMON_STREAM_URL.STATEMENT_SCHEDULE_HISTORY);
  const categoryTabs = useScrollerTabsProps();

  return (
    <MainLayout>
      <Gap.XL />
      <Horizon>
        <Gap.XL />
        <Gap.XS />
        <PageHeader
          backButtonTitle={locale.client.breadcrumbs.toRequestsListPage}
          header={locale.client.scheduleStatementPage.title}
          onClick={goBack}
        />
      </Horizon>
      <Horizon>
        <Gap.XL />
        <Gap.XS />
        <CategoryTabs {...categoryTabs} />
      </Horizon>
      <Gap.XL />
    </MainLayout>
  );
};
ScheduleStatement.displayName = 'ScheduleStatement';
