import type { FC } from 'react';
import React, { useMemo, useEffect } from 'react';
import type { IGetAccountsResponseDto } from 'interfaces/dto';
import { useForm } from 'react-final-form';
import { compareStrings } from 'utils/common';
import { Fields } from '@platform/ui';
import type { IAccountOption } from './organization-option';
import { OrganizationOption } from './organization-option';

/** * Возвращает данные об организации. */
const getAccountOption = (account: IGetAccountsResponseDto): IAccountOption => {
  const { bankClient } = account;

  return {
    value: bankClient?.shortName || bankClient?.fullName,
    label: bankClient?.shortName || bankClient?.fullName,
  };
};

/** Свойства компонента OrganizationsField. */
export interface IAccountsFieldProps {
  /** Путь до поля в форме. */
  name: string;
  /** Счета. */
  accounts: IGetAccountsResponseDto[];
  /** Значение активного поля. */
  disabled?: boolean;
}

/** Селект выбора организаций. */
export const OrganizationsField: FC<IAccountsFieldProps> = ({ name, accounts, disabled }) => {
  const { change, getFieldState } = useForm();

  const sortedOptions = useMemo(() => accounts.map(account => getAccountOption(account)).sort((a, b) => compareStrings(a.label, b.label)), [
    accounts,
  ]);

  useEffect(() => {
    // Значение поля получается внутри хука, чтобы избежать циклического рендера
    const { value = [] } = getFieldState(name) ?? {};

    // При первоначальной загрузке, если ничего не выбрано, то выбираются все значения.
    if (value.length === 0 && accounts.length > 0) {
      change(
        name,
        accounts.map(item => item.bankClient?.shortName || item.bankClient?.fullName)
      );
    }
  }, [accounts, change, getFieldState, name]);

  return (
    <Fields.MultiSelect extraSmall withSearch disabled={disabled} name={name} optionTemplate={OrganizationOption} options={sortedOptions} />
  );
};

OrganizationsField.displayName = 'OrganizationsField';
