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
  /** Счета и организации для отображения в селекте. */
  accounts: IGetAccountsResponseDto[];
  /** Выбранные организации, по которым надо отфильтровать счета. */
  selectedOrganizations: string[];
  /** Обработчик изменения значения поля. */
  onChange?: ChangeFieldHandler<string[]>;
}

/** Селект выбора счетов. */
export const AccountsField: FC<IAccountsFieldProps> = ({ name, accounts, selectedOrganizations, onChange = noop }) => {
  const { change, getFieldState } = useForm();

  // Вспомогательные структуры. Вычисляются один раз.
  // optionByOrganizationId - объект в котором ключи - это идентификаторы организации,
  // а значения - это массивы опций для селекта выбра счёта.
  // sortedOptions - отсортированный массив всех опций селекта.
  const [optionByOrganizationId, sortedOptions] = useMemo(() => {
    const [map, arr] = accounts.reduce<[Record<string, Array<IOption<string>>>, Array<IOption<string>>]>(
      (acc, account) => {
        const {
          bankClient: { id: bankClientId },
          accountNumber,
          id,
        } = account;

        const option = {
          label: formatAccountCode(accountNumber),
          value: id,
        };

        if (!acc[0][bankClientId]) {
          acc[0][bankClientId] = [];
        }

        acc[0][bankClientId].push(option);

        acc[1].push(option);

        return acc;
      },
      [{}, []]
    );

    arr.sort(byLabel);

    return [map, arr];
  }, [accounts]);

  const filtredOptions = useMemo(() => {
    // Если пользователь в селекте для выбора организаций не указал ни одной организации,
    // или у него есть всего одна организация,
    // то для выбора счёта в селкте доступны все счета (самый распространённый кейс).
    if (selectedOrganizations.length === 0 || Object.keys(optionByOrganizationId).length === 1) {
      return sortedOptions;
    }

    // Если пользователь указал организации по которым ему нужны счета
    // То в селекте для выбора счетов надо оставить счета только этих организаций.
    return selectedOrganizations
      .reduce<Array<IOption<string>>>((acc, orgId) => {
        if (optionByOrganizationId[orgId]) {
          acc.push(...optionByOrganizationId[orgId]);
        }

        return acc;
      }, [])
      .sort(byLabel);
  }, [optionByOrganizationId, selectedOrganizations, sortedOptions]);

  useEffect(() => {
    // Значение поля получается внутри хука, чтобы избежать циклического рендера
    const { value } = getFieldState(name) ?? {};

    // Вычисляется новое значение селекта счетов.
    // Для этого из старого значения исключаются счета тех организаций,
    // которые пользователь убрал из селекта выбора организации.
    const newValue = (value as string[]).filter(selectedAccount =>
      filtredOptions.some(({ value: accountFromOption }) => accountFromOption === selectedAccount)
    );

    // Если значение не изменилось то ссылка не меняется.
    if (newValue.length !== value.length) {
      change(name, newValue);
    }
  }, [selectedOrganizations, filtredOptions, change, name, getFieldState]);

  useEffect(() => {
    // Если значение для выбора всего одно, то при инициализации формы выбирается по умолчанию.
    if (sortedOptions.length === 1) {
      change(name, [sortedOptions[0].value]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedOptions]);

  return <Fields.MultiSelect extraSmall withSearch name={name} options={filtredOptions} onChange={onChange} />;
};

AccountsField.displayName = 'AccountsField';
