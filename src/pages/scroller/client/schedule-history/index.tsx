import React from 'react';
import { PageHeader } from 'components/common';
import { SCHEDULE_ACTIONS } from 'interfaces/client';
import { locale } from 'localization';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { useRedirect } from '@platform/services';
import { MainLayout } from '@platform/services/client';
import { PrimaryButton, Horizon, Gap } from '@platform/ui';

/**
 * [ВПР] ЭФ Клиента: реестр запросов на услугу Выписка по расписанию.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=84446197
 * */
export const ScheduleHistoryScrollerPage = () => {
  const goBack = useRedirect(COMMON_STREAM_URL.MAINPAGE);
  const createNewSchedule = useRedirect(COMMON_STREAM_URL.STATEMENT_SCHEDULE_NEW);

  return (
    <MainLayout>
      <Gap.XL />
      <Horizon>
        <Gap.XL />
        <Gap.XS />
        <PageHeader
          backButtonTitle={locale.client.breadcrumbs.toMainPage}
          header={locale.client.scheduleHistoryScrollerPage.title}
          onClick={goBack}
        />
        <Horizon.Spacer />
        <PrimaryButton dataAction={SCHEDULE_ACTIONS.CREATE} onClick={createNewSchedule}>
          {locale.client.buttons.createSchedule}
        </PrimaryButton>
        <Gap.XL />
        <Gap.XS />
      </Horizon>
      <Gap.XL />
    </MainLayout>
  );
};

ScheduleHistoryScrollerPage.displayName = 'ScheduleHistoryScrollerPage';
