import React, { useCallback } from 'react';
import css from 'common.scss';
import { useSeparateAccountFiles } from 'components/common/form/common/use-separate-account-files';
import { Row } from 'components/common/form/row';
import { useScheduleAccounts } from 'hooks/client';
import { FORMAT } from 'interfaces/common';
import { CREATION_PARAMS } from 'interfaces/form';
import { locale } from 'localization';
import { AccountsField } from 'pages/form/client/components/accounts-field';
import { useFormState, useForm } from 'react-final-form';
import { RUB_CURRENCY } from 'stream-constants';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELDS } from 'stream-constants/form';
import type { OnChangeType } from '@platform/ui';
import { Box } from '@platform/ui';

/** Компонент счета. */
export const Accounts: React.FC = () => {
  const { data: accounts } = useScheduleAccounts();
  const { change } = useForm();
  const { values } = useFormState<IFormState>();

  // встраиваем реакцию на изменение параметров для флага "Отдельный файл по каждому счету"
  useSeparateAccountFiles();

  const onChangeAccounts: OnChangeType<string[]> = useCallback(
    e => {
      const accountIds = e.value;
      const hasAccounts = accountIds.length > 0;
      const hasForeignCurrency = accounts.filter(x => accountIds.includes(x.id)).some(x => x.currency.code !== RUB_CURRENCY);

      let params = [...values.creationParams];

      const isC1 = values.format === FORMAT.C1;
      const isText = values.format === FORMAT.TXT;

      if (!hasForeignCurrency || !hasAccounts || isC1 || isText) {
        params = params.filter(x => x !== CREATION_PARAMS.NATIONAL_CURRENCY);
      }

      if (!hasForeignCurrency || !hasAccounts) {
        params = params.filter(x => x !== CREATION_PARAMS.REVALUATION_ACCOUNTING_ENTRY);
      }

      change(FORM_FIELDS.CREATION_PARAMS, params);
    },
    [accounts, change, values.creationParams, values.format]
  );

  return (
    <Row label={locale.common.accounts.label}>
      <Box className={css.inputWidth}>
        <AccountsField
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          accounts={accounts}
          disabled={accounts.length === 1}
          name={FORM_FIELDS.ACCOUNTS}
          onChange={onChangeAccounts}
        />
      </Box>
    </Row>
  );
};

Accounts.displayName = 'Accounts';
