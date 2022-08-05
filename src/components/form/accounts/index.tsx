import React, { useCallback, useContext } from 'react';
import { AccountsField } from 'components';
import { useSeparateAccountFiles } from 'components/form/common/use-separate-account-files';
import { Row } from 'components/form/row';
import { useAccounts } from 'hooks';
import { CREATION_PARAMS } from 'interfaces/form';
import { locale } from 'localization';
import { useFormState, useForm } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELDS, FormContext } from 'stream-constants/form';
import type { OnChangeType } from '@platform/ui';
import { Box } from '@platform/ui';
import css from './styles.scss';

/** Компонент счета. */
export const Accounts: React.FC = () => {
  const { data: accounts } = useAccounts();
  const { hasForeignCurrency } = useContext(FormContext);
  const { change } = useForm();
  const { values } = useFormState<IFormState>();

  // встраиваем реакцию на изменение параметров для флага "Отдельный файл по каждому счету"
  useSeparateAccountFiles();

  const onChangeAccounts: OnChangeType<string[]> = useCallback(
    e => {
      const accountIds = e.value;
      const params = [...values.creationParams];

      const hasAccounts = accountIds.length > 0;

      if (hasAccounts && !hasForeignCurrency) {
        change(
          FORM_FIELDS.CREATION_PARAMS,
          params.filter(x => x !== CREATION_PARAMS.REVALUATION_ACCOUNT_ENTRY)
        );
      }
    },
    [change, hasForeignCurrency, values.creationParams]
  );

  return (
    <Row label={locale.common.accounts.label}>
      <Box className={css.accounts}>
        <AccountsField accounts={accounts} name={FORM_FIELDS.ACCOUNTS} onChange={onChangeAccounts} />
      </Box>
    </Row>
  );
};

Accounts.displayName = 'Accounts';
