import React from 'react';
import { AccountsField } from 'components';
import { useAccounts } from 'hooks/use-accounts';
import { locale } from 'localization';
import { Row } from 'pages/form/client/components/row';
import { CREATION_PARAMS } from 'pages/form/client/interfaces/creation-params';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { useForm, useFormState } from 'react-final-form';
import { Box } from '@platform/ui';
import css from './styles.scss';

/** Компонент счета. */
export const Accounts: React.FC = () => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();
  const { accounts } = useAccounts();

  const onAccountsChange = ({ value }: { value: string[] }) => {
    const hasMoreThenOneAccounts = value.length > 1;

    let params = values.creationParams;

    if (hasMoreThenOneAccounts) {
      params.push(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES);
    } else {
      params = params.filter(x => x !== CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES);
    }

    change(FORM_FIELDS.CREATION_PARAMS, params);
  };

  return (
    <Row label={locale.common.accounts.label}>
      <Box className={css.accounts}>
        <AccountsField accounts={accounts} name={FORM_FIELDS.ACCOUNTS} onChange={onAccountsChange} />
      </Box>
    </Row>
  );
};

Accounts.displayName = 'Accounts';
