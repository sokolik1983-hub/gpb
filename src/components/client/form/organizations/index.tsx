import React from 'react';
import { OrganizationsField } from 'components/client/organizations-field';
import { Row } from 'components/common/form/row';
import { useAccounts } from 'hooks/common';
import { locale } from 'localization';
import { FORM_FIELDS } from 'stream-constants/form/schedule-form-state';
import { Box } from '@platform/ui';
import css from './styles.scss';

/** Компонент поля Организации. */
export const Organizations: React.FC = () => {
  const { data: accounts } = useAccounts();

  return (
    <Row label={locale.turnoverScroller.groupInfo.organizations}>
      <Box className={css.orgType}>
        <OrganizationsField accounts={accounts} name={FORM_FIELDS.ORGANIZATIONS} />
      </Box>
    </Row>
  );
};

Organizations.displayName = 'Organizations';
