import type { FC } from 'react';
import React, { useMemo, useEffect, useCallback } from 'react';
import type { IGetAccountsResponseDto } from 'interfaces/dto';
import { useForm } from 'react-final-form';
import { noop, compareStrings } from 'utils/common';
import { formatAccountCode } from '@platform/tools/localization';
import type { OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';
import type { IAccountOption } from './account-option';
import { AccountOption } from './account-option';

/**
 * Возвращает опцию.
 *
 * @param account - Счтёт.
 */
const getAccountOption = (account: IGetAccountsResponseDto): IAccountOption => {
  const {
    id,
    accountNumber,
    bankClient: { shortName, fullName },
  } = account;

  return {
    value: id,
    label: formatAccountCode(accountNumber), // Лейбл тегов выбранных значений
    accountNumber,
    orgName: shortName ?? fullName,
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
}

/** Селект выбора счетов. */
export const AccountsField: FC<IAccountsFieldProps> = ({ name, accounts, placeholder, onChange = noop }) => {
  const { change, getFieldState } = useForm();

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

  return (
    <Fields.MultiSelect
      extraSmall
      withSearch
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
