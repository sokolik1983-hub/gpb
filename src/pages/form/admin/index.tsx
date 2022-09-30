import React from 'react';
import { showStatementParamsDialog } from 'components/admin/export-params-dialog';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/admin';
import { ACTION } from 'interfaces/common';
import { locale } from 'localization';
import { ActionButtons, Box } from '@platform/ui';

export const AdminFormPage = () => (
  <Box>
    {locale.admin.form.title}
    <ActionButtons
      actions={[
        {
          name: 'test',
          label: 'testButton',
          onClick: async () => {
            await showStatementParamsDialog(EXPORT_PARAMS_USE_CASES.SIX, ACTION.PRINT, 'f0f01868-6fa3-4c6b-ae48-9829228048de');
          },
        },
      ]}
    />
  </Box>
);

AdminFormPage.displayName = 'AdminFormPage';
