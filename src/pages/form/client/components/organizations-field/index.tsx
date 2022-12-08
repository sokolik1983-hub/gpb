import type { FC } from 'react';
import React from 'react';
import { useCheckedScheduleLabels } from 'hooks/client/use-checked-schedule-labels';
import type { IAccountV2 } from '@platform/services/client/dist-types/interfaces/entities';
import type { IOption } from '@platform/ui';
import { Fields } from '@platform/ui';

/** * Возвращает опцию для выпадающего списка селекта организации. */
const getAccountOption = ({ bankClient: { shortName, fullName } }: IAccountV2): IOption => ({
  value: shortName || fullName,
  label: shortName || fullName,
});

/** Свойства компонента OrganizationsField. */
export interface IAccountsFieldProps {
  /** Путь до поля в форме. */
  name: string;
  /** Счета. */
  accounts: IAccountV2[];
  /** Значение активного поля. */
  disabled?: boolean;
}

/** Селект выбора организаций. */
export const OrganizationsField: FC<IAccountsFieldProps> = ({ name, accounts, disabled }) => {
  const sortedOptions = useCheckedScheduleLabels(accounts, name, getAccountOption);

  return <Fields.MultiSelect extraSmall withSearch disabled={disabled} name={name} options={sortedOptions} />;
};

OrganizationsField.displayName = 'OrganizationsField';
