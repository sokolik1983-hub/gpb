import React, { useCallback, useContext } from 'react';
import { AccountsField } from 'components';
import { useSeparateAccountFiles } from 'components/form/common/use-separate-account-files';
import { Row } from 'components/form/row';
import { useAccounts } from 'hooks';
import { FORMAT } from 'interfaces/client';
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
      const hasAccounts = accountIds.length > 0;

      let params = [...values.creationParams];

      const isC1 = values.format === FORMAT.C1;
      const isText = values.format === FORMAT.TXT;

      if (!hasForeignCurrency || !hasAccounts || isC1 || isText) {
        params = params.filter(x => x !== CREATION_PARAMS.NATIONAL_CURRENCY);
      }

      if (!hasForeignCurrency || !hasAccounts) {
        params = params.filter(x => x !== CREATION_PARAMS.REVALUATION_ACCOUNT_ENTRY);
      }

      change(FORM_FIELDS.CREATION_PARAMS, params);
    },
    [change, hasForeignCurrency, values.creationParams, values.format]
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
