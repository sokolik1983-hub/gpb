import type { FC } from 'react';
import React from 'react';
import { useCheckedScheduleLabels } from 'hooks/client/use-checked-schedule-labels';
import type { IGetAccountsResponseDto } from 'interfaces/dto';
import { noop } from 'utils/common';
import type { IAccountV2 } from '@platform/services/client/dist-types/interfaces/entities';
import { formatAccountCode } from '@platform/tools/localization';
import type { OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';
import type { IAccountOption } from './account-option';
import { AccountOption } from './account-option';

/**
 * Возвращает опцию.
 *
 * @param account - Счет.
 */
const getAccountOption = (account: IAccountV2): IAccountOption => {
  const { accountNumber, bankClient } = account;

  return {
    value: bankClient?.shortName || bankClient?.fullName,
    label: formatAccountCode(accountNumber), // Лейбл тегов выбранных значений
    accountNumber,
    orgName: bankClient?.shortName || bankClient?.fullName,
  };
};

/** Свойства компонента AccountsField. */
export interface IAccountsFieldProps {
  /** Путь до поля в форме. */
  name: string;
  /** Счета. */
  accounts: IGetAccountsResponseDto[];
  /** Обработчик изменения значения поля. */
  onChange?: OnChangeType<string[]>;
  /** Плейсхолдер. */
  placeholder?: string;
  disabled?: boolean;
}

/** Селект выбора счетов. */
export const AccountsField: FC<IAccountsFieldProps> = ({ name, accounts, placeholder, onChange = noop, disabled }) => {
  const sortedOptions = useCheckedScheduleLabels(accounts, name, getAccountOption);

  return (
    <Fields.MultiSelect
      extraSmall
      withSearch
      disabled={disabled}
      name={name}
      optionTemplate={AccountOption}
      options={sortedOptions}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

AccountsField.displayName = 'AccountsField';
