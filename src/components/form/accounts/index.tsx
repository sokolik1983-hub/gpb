import React from 'react';
import { AccountsField } from 'components';
import { useSeparateAccountFiles } from 'components/form/common/use-separate-account-files';
import { Row } from 'components/form/row';
import { useAccounts } from 'hooks/use-accounts';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { Box } from '@platform/ui';
import css from './styles.scss';

/** Компонент счета. */
export const Accounts: React.FC = () => {
  const { accounts } = useAccounts();

  // встраиваем реакцию на изменение параметров для флага "Отдельный файл по каждому счету"
  useSeparateAccountFiles();

  return (
    <Row label={locale.common.accounts.label}>
      <Box className={css.accounts}>
        <AccountsField accounts={accounts} name={FORM_FIELDS.ACCOUNTS} />
      </Box>
    </Row>
  );
};

Accounts.displayName = 'Accounts';
