import React from 'react';
import css from 'common.scss';
import { Row } from 'components/common/form/row';
import { useScheduleAccounts } from 'hooks/client';
import { locale } from 'localization';
import { OrganizationsField } from 'pages/form/client/components/organizations-field';
import { FORM_FIELDS } from 'stream-constants/form/schedule-form-state';
import { Box } from '@platform/ui';

/** Компонент поля Организации. */
export const Organizations: React.FC = () => {
  const { data: accounts } = useScheduleAccounts();

  return (
    <Row label={locale.turnoverScroller.groupInfo.organizations}>
      <Box className={css.inputWidth}>
        <OrganizationsField
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          accounts={accounts}
          name={FORM_FIELDS.ORGANIZATIONS}
        />
      </Box>
    </Row>
  );
};

Organizations.displayName = 'Organizations';
