import React from 'react';
import { PageHeader } from 'components/common';
import { locale } from 'localization';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { MainLayout, useRedirect } from '@platform/services/client';
import { Gap, Horizon } from '@platform/ui';

/**
 * [ВПР] ЭФ Клиента: просмотр запроса на услугу Выписка по расписанию.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=84445704
 * */
export const ScheduleConfirmPage = () => {
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

ScheduleConfirmPage.displayName = 'ScheduleConfirmPage';
