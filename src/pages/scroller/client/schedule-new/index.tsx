import React from 'react';
import { PageHeader } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { locale } from 'localization';
import { ScheduleStatementForm } from 'pages/form/client/views/schedule-statement-form';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { MainLayout, useRedirect } from '@platform/services/client';
import { Gap, Horizon } from '@platform/ui';

/**
 * [ВПР] ЭФ Клиента: запрос на услугу Выписка по расписанию.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=84445171
 * */
export const ScheduleNewPage = () => {
  const goBack = useRedirect(COMMON_STREAM_URL.STATEMENT_SCHEDULE_HISTORY);

  return (
    <MainLayout>
      <FocusLock>
        <Gap.XL />
        <Horizon>
          <Gap.XL />
          <Gap.XS />
          <PageHeader
            backButtonTitle={locale.client.breadcrumbs.toRequestsListPage}
            header={locale.client.scheduleNewPage.title}
            onClick={goBack}
          />
        </Horizon>
        <Gap.XL />
      </FocusLock>
      <ScheduleStatementForm />
    </MainLayout>
  );
};

ScheduleNewPage.displayName = 'ScheduleNewPage';
