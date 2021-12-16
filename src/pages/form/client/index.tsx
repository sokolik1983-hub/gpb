import React from 'react';
import { locale } from 'localization';
import { FormProvider } from 'pages/form/client/form-provider';
import { NewForm } from 'pages/form/client/views/new-form';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { MainLayout, useRedirect } from '@platform/services/client';
import type { IBreadcrumb } from '@platform/ui';
import { LayoutDocument, LayoutScroll } from '@platform/ui';

export const RequestStatementForm: React.FC = () => {
  const goHome = useRedirect(COMMON_STREAM_URL.MAINPAGE);
  const goToScroller = useRedirect(COMMON_STREAM_URL.STATEMENT_TURNOVER);
  const breadcrumbs: IBreadcrumb[] = [
    {
      label: locale.client.scroller.title,
      onClick: goToScroller,
    },
  ];

  return (
    <FormProvider>
      <MainLayout>
        <LayoutDocument breadcrumbs={breadcrumbs} header={locale.form.newRequestStatement.title} onHomeClick={goHome}>
          <LayoutScroll autoHeight autoHeightMax="calc(100vh - 58px - 64px)">
            <NewForm />
          </LayoutScroll>
        </LayoutDocument>
      </MainLayout>
    </FormProvider>
  );
};

RequestStatementForm.displayName = 'RequestStatementForm';
