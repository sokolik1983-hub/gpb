import type { FC } from 'react';
import React, { useMemo, useCallback } from 'react';
import type { IGetAccountsResponseDto } from 'interfaces/dto';
import { noop, compareStrings } from 'utils/common';
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
const getAccountOption = (account: IGetAccountsResponseDto): IAccountOption => {
  const { id, accountNumber, bankClient } = account;

  return {
    value: id,
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
  const sortedOptions = useMemo(
    () => accounts.map(account => getAccountOption(account)).sort((a, b) => compareStrings(a.orgName, b.orgName)),
    [accounts]
  );

  const filterFn = useCallback(
    (searchValue: string) => {
      if (!searchValue) {
        return sortedOptions;
      }

      const filtered = sortedOptions.filter(option => {
        const { accountNumber, orgName } = option;

        const searchValueLowerCase = searchValue.toLocaleLowerCase().replace(/\./g, '');

        return (
          accountNumber?.toLocaleLowerCase().includes(searchValueLowerCase) || orgName?.toLocaleLowerCase().includes(searchValueLowerCase)
        );
      });

      return filtered;
    },
    [sortedOptions]
  );

  return (
    <Fields.MultiSelect
      extraSmall
      withSearch
      disabled={disabled}
      filterFn={filterFn}
      name={name}
      optionTemplate={AccountOption}
      options={sortedOptions}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

AccountsField.displayName = 'AccountsField';
