import React from 'react';
import { AccountsField } from 'components';
import { useAccounts } from 'hooks/use-accounts';
import { locale } from 'localization';
import { Row } from 'pages/form/client/components/row';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { Box } from '@platform/ui';
import css from './styles.scss';

export const Accounts: React.FC = () => {
  const { accounts } = useAccounts();

  return (
    <Row label={locale.common.accounts.label}>
      <Box className={css.accounts}>
        <AccountsField accounts={accounts} name={FORM_FIELDS.ACCOUNTS} />
      </Box>
    </Row>
  );
};

Accounts.displayName = 'Accounts';
