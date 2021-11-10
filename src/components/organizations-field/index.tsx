import type { FC } from 'react';
import React, { useMemo, useEffect } from 'react';
import type { ChangeFieldHandler } from 'interfaces';
import type { IGetAccountsResponseDto } from 'interfaces/client';
import { useForm, useField } from 'react-final-form';
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

  const {
    input: { value },
  } = useField<string[]>(name);

  const options = useMemo(() => {
    /* Организации уже добавленные в массив опций. */
    const usedOrgs: Record<string, true> = {};

    return accounts
      .reduce<Array<IOption<string>>>((acc, account) => {
        const {
          bankClient: { name: organizationName, id },
        } = account;

        if (usedOrgs[id]) {
          return acc;
        }

        usedOrgs[id] = true;
        acc.push({ value: id, label: organizationName });

        return acc;
      }, [])
      .sort(byLabel);
  }, [accounts]);

  useEffect(() => {
    // Если значение для выбора всего одно, то хук ставит его по умолчанию.
    if (options.length === 1) {
      change(name, [options[0].value]);
    }
  }, [change, name, options, value.length]);

  return <Fields.MultiSelect extraSmall withSearch disabled={options.length === 1} name={name} options={options} onChange={onChange} />;
};

OrganizationsField.displayName = 'OrganizationsField';
