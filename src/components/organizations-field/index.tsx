import type { FC } from 'react';
import React, { useMemo, useEffect } from 'react';
import type { ChangeFieldHandler } from 'interfaces';
import type { IGetAccountsResponseDto } from 'interfaces/client';
import { useForm } from 'react-final-form';
import { byLabel } from '@platform/services';
import type { IOption } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Свойства компонента OrganizationsField. */
export interface IOrganizationsFieldProps {
  /** Путь до поля в форме. */
  name: string;
  /** Счета и организации для отображения в селекте. */
  accounts: IGetAccountsResponseDto[];
  /** Обработчик изменения значения поля. */
  onChange: ChangeFieldHandler<string[]>;
}

/** Селект выбора организации. */
export const OrganizationsField: FC<IOrganizationsFieldProps> = ({ name, accounts, onChange }) => {
  const { change } = useForm();

  const options = useMemo(() => {
    /* Организации уже добавленные в массив опций. */
    const usedOrgs: Record<string, true> = {};

    return accounts
      .reduce<Array<IOption<string>>>((acc, account) => {
        const {
          bankClient: { shortName, fullName, id: bankClientId },
        } = account;

        if (usedOrgs[bankClientId]) {
          return acc;
        }

        usedOrgs[bankClientId] = true;
        acc.push({ value: bankClientId, label: shortName ?? fullName });

        return acc;
      }, [])
      .sort(byLabel);
  }, [accounts]);

  useEffect(() => {
    // Если значение для выбора всего одно, то при инициализации формы выбирается по умолчанию.
    if (options.length === 1) {
      change(name, [options[0].value]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return <Fields.MultiSelect extraSmall withSearch name={name} options={options} onChange={onChange} />;
};

OrganizationsField.displayName = 'OrganizationsField';
