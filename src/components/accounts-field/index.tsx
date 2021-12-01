import type { FC } from 'react';
import React, { useMemo, useEffect } from 'react';
import type { ChangeFieldHandler } from 'interfaces';
import type { IGetAccountsResponseDto } from 'interfaces/client';
import { useForm } from 'react-final-form';
import { noop } from 'utils';
import { byLabel } from '@platform/services';
import { formatAccountCode } from '@platform/tools/localization';
import type { IOption } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Свойства компонента AccountsField. */
export interface IAccountsFieldProps {
  /** Путь до поля в форме. */
  name: string;
  /** Счета. */
  accounts: IGetAccountsResponseDto[];
  /** Обработчик изменения значения поля. */
  onChange?: ChangeFieldHandler<string[]>;
}

/** Селект выбора счетов. */
export const AccountsField: FC<IAccountsFieldProps> = ({ name, accounts, onChange = noop }) => {
  const { change, getFieldState } = useForm();

  const sortedOptions = useMemo(() => {
    const options = accounts.reduce<Array<IOption<string>>>((acc, account) => {
      const { accountNumber, id } = account;

      const option = {
        label: formatAccountCode(accountNumber),
        value: id,
      };

      acc.push(option);

      return acc;
    }, []);

    return options.sort(byLabel);
  }, [accounts]);

  useEffect(() => {
    // Значение поля получается внутри хука, чтобы избежать циклического рендера
    const { value = [] } = getFieldState(name) ?? {};

    // При первоначальной загрузке, если ничего не выбрано, то выбираются все значения.
    if (value.length === 0) {
      change(
        name,
        accounts.map(item => item.id)
      );
    }
  }, [accounts, change, getFieldState, name]);

  return <Fields.MultiSelect extraSmall withSearch name={name} options={sortedOptions} onChange={onChange} />;
};

AccountsField.displayName = 'AccountsField';
