import React from 'react';
import { FocusLock } from 'components/common/focus-lock';
import { MainLayout } from '@platform/services/admin';
import { LayoutScroll } from '@platform/ui';
import { CreateStatementForm } from './views/create-statement-form';

export const AdminFormPage = () => (
  <MainLayout>
    <FocusLock>
      <LayoutScroll autoHeight autoHeightMax="100vh">
        <CreateStatementForm />
      </LayoutScroll>
    </FocusLock>
  </MainLayout>
);

AdminFormPage.displayName = 'AdminFormPage';
