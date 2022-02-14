import React from 'react';
import { locale } from 'localization';
import { CreateStatementForm } from 'pages/form/client/views/create-statement-form';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { MainLayout, useRedirect } from '@platform/services/client';
import type { IBreadcrumb } from '@platform/ui';
import { LayoutDocument, LayoutScroll } from '@platform/ui';

/** ЭФ запроса выписки. */
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
    <MainLayout>
      <LayoutDocument breadcrumbs={breadcrumbs} header={locale.form.newRequestStatement.title} onHomeClick={goHome}>
        <LayoutScroll autoHeight autoHeightMax="calc(100vh - 58px - 64px)">
          <CreateStatementForm />
        </LayoutScroll>
      </LayoutDocument>
    </MainLayout>
  );
};

RequestStatementForm.displayName = 'RequestStatementForm';
