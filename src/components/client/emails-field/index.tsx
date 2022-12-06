import type { FC } from 'react';
import React, { useMemo, useEffect } from 'react';
import type { IGetAccountsResponseDto } from 'interfaces/dto';
import { useForm } from 'react-final-form';
import { compareStrings } from 'utils/common';
import { Fields } from '@platform/ui';
import type { IAccountOption } from './email-option';
import { EmailOption } from './email-option';

/**
 * Возвращает опцию для выпадающего списка селекта электронной почты.
 */
const getEmailOption = (account: IGetAccountsResponseDto): IAccountOption => {
  const { id, bankClient } = account;
  const { emails } = bankClient;

  return {
    value: id,
    label: emails ? emails.toString() : '',
  };
};

/** Свойства компонента EmailsField. */
export interface IAccountsFieldProps {
  /** Путь до поля в форме. */
  name: string;
  /** Счета. */
  accounts: IGetAccountsResponseDto[];
  /** Значение активного поля. */
  disabled?: boolean;
}

/** Селект выбора адреса электронной почты. */
export const EmailsField: FC<IAccountsFieldProps> = ({ name, accounts, disabled }) => {
  const { change, getFieldState } = useForm();

  const sortedOptions = useMemo(() => accounts.map(account => getEmailOption(account)).sort((a, b) => compareStrings(a.label, b.label)), [
    accounts,
  ]);

  useEffect(() => {
    // Значение поля получается внутри хука, чтобы избежать циклического рендера
    const { value = [] } = getFieldState(name) ?? {};

    // При первоначальной загрузке, если ничего не выбрано, то выбираются все значения.
    if (value.length === 0 && accounts.length > 0) {
      change(
        name,
        accounts.map(item => item.id)
      );
    }
  }, [accounts, change, getFieldState, name]);

  return <Fields.MultiSelect extraSmall withSearch disabled={disabled} name={name} optionTemplate={EmailOption} options={sortedOptions} />;
};

EmailsField.displayName = 'EmailsField';
