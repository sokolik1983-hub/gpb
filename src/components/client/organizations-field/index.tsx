import type { FC } from 'react';
import React, { useMemo } from 'react';
import type { IGetAccountsResponseDto } from 'interfaces/dto';
import { compareStrings } from 'utils/common';
import type { IAccountV2 } from '@platform/services/client/dist-types/interfaces/entities';
import type { IOption } from '@platform/ui';
import { Fields } from '@platform/ui';

/** * Возвращает опцию для выпадающего списка селекта организации. */
const getAccountOption = ({ id, bankClient }: IAccountV2): IOption => ({
  value: id,
  label: bankClient?.shortName || bankClient?.fullName,
});

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
  const sortedOptions = useMemo(() => accounts.map(account => getAccountOption(account)).sort((a, b) => compareStrings(a.label, b.label)), [
    accounts,
  ]);

  return <Fields.MultiSelect extraSmall withSearch disabled={disabled} name={name} options={sortedOptions} />;
};

OrganizationsField.displayName = 'OrganizationsField';
