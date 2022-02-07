import React from 'react';
import { AccountsField } from 'components';
import { Row } from 'components/form/row';
import { useAccounts } from 'hooks/use-accounts';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import type { IFormState } from 'interfaces/form/form-state';
import { locale } from 'localization';
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

    const params = [...values.creationParams];

    // хранение состояния формы / работа с ним будет упрощена в https://jira.gboteam.ru/browse/GBO-21669

    if (hasMoreThenOneAccounts) {
      if (!params.includes(CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES)) {
        change(FORM_FIELDS.CREATION_PARAMS, [params, CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES]);
      }
    } else {
      change(
        FORM_FIELDS.CREATION_PARAMS,
        params.filter(x => x !== CREATION_PARAMS.SEPARATE_ACCOUNTS_FILES)
      );
    }
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
