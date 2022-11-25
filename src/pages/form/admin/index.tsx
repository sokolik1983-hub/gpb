import React from 'react';
import { FocusLock } from 'components/common/focus-lock';
import type { IUrlParams } from 'interfaces';
import { StatementRequest } from 'pages/form/admin/views/statement-request';
import { StatementRequestCard } from 'pages/form/admin/views/statement-request-card';
import { useParams } from 'react-router-dom';
import { NEW_ENTITY_ID } from 'stream-constants';
import { MainLayout } from '@platform/services/admin';
import { LayoutScroll } from '@platform/ui';

export const AdminFormPage = () => {
  const { id } = useParams<IUrlParams>();

  return (
    <MainLayout>
      <FocusLock>
        <LayoutScroll autoHeight autoHeightMax="100vh">
          {id === NEW_ENTITY_ID ? <StatementRequest /> : <StatementRequestCard statementId={id} />}
        </LayoutScroll>
      </FocusLock>
    </MainLayout>
  );
};

AdminFormPage.displayName = 'AdminFormPage';
