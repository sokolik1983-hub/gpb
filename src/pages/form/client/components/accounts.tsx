import React from 'react';
import { AccountsField } from 'components';
import { useAccounts } from 'hooks/use-accounts';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { Box } from '@platform/ui';
import css from './styles.scss';

export const Accounts: React.FC = () => {
  const { accounts } = useAccounts();

  return (
    <Box className={css.accounts}>
      <AccountsField accounts={accounts} name={FORM_FIELDS.ACCOUNTS} />
    </Box>
  );
};

Accounts.displayName = 'Accounts';
