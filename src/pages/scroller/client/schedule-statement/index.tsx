import React from 'react';
import { PageHeader } from 'components/common';
import { locale } from 'localization';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { MainLayout, useRedirect } from '@platform/services/client';
import { Gap, Horizon } from '@platform/ui';

export const ScheduleStatement = () => {
  const goBack = useRedirect(COMMON_STREAM_URL.STATEMENT_SCHEDULE_NEW);

  return (
    <MainLayout>
      <Gap.XL />
      <Horizon>
        <Gap.XL />
        <Gap.XS />
        <PageHeader
          backButtonTitle={locale.client.breadcrumbs.toRequestPage}
          header={locale.client.scheduleNewPage.title}
          onClick={goBack}
        />
      </Horizon>
      <Gap.XL />
    </MainLayout>
  );
};
ScheduleStatement.displayName = 'ScheduleStatement';
