import React from 'react';
import { FocusLock } from 'components/common/focus-lock';
import { locale } from 'localization';
import { ADMIN_STREAM_URL } from 'stream-constants/admin';
import { MainLayout } from '@platform/services/admin';
import { useRedirect } from '@platform/services/client';
import type { IBreadcrumb } from '@platform/ui';
import { LayoutDocument, LayoutScroll } from '@platform/ui';
import { CreateStatementForm } from './views/create-statement-form';

export const AdminFormPage = () => {
  const goHome = useRedirect(ADMIN_STREAM_URL.MAINPAGE);
  const goToScroller = useRedirect(ADMIN_STREAM_URL.STATEMENT_HISTORY);
  const breadcrumbs: IBreadcrumb[] = [
    {
      label: locale.admin.historyScroller.pageTitle,
      onClick: goToScroller,
    },
  ];

  return (
    <MainLayout>
      <FocusLock>
        <LayoutDocument breadcrumbs={breadcrumbs} header={locale.form.newRequestStatement.title} onHomeClick={goHome}>
          <LayoutScroll autoHeight autoHeightMax="100vh">
            <CreateStatementForm />
          </LayoutScroll>
        </LayoutDocument>
      </FocusLock>
    </MainLayout>
  );
};

AdminFormPage.displayName = 'AdminFormPage';
