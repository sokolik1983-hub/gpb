import type { FC } from 'react';
import React from 'react';
import { useCheckedScheduleLabels } from 'hooks/client/use-checked-schedule-labels';
import type { IAccountV2 } from '@platform/services/client/dist-types/interfaces/entities';
import type { IOption } from '@platform/ui';
import { Fields } from '@platform/ui';

/**
 * Возвращает опцию для выпадающего списка селекта электронной почты.
 */
const getEmailOption = ({ bankClient: { emails } }: IAccountV2): IOption => ({
  value: emails ? emails.toString() : '',
  label: emails ? emails.toString() : '',
});

/** Свойства компонента EmailsField. */
export interface IAccountsFieldProps {
  /** Путь до поля в форме. */
  name: string;
  /** Счета. */
  accounts: IAccountV2[];
  /** Значение активного поля. */
  disabled?: boolean;
}

/** Селект выбора адреса электронной почты. */
export const EmailsField: FC<IAccountsFieldProps> = ({ name, accounts, disabled }) => {
  const sortedOptions = useCheckedScheduleLabels(accounts, name, getEmailOption);

  return <Fields.MultiSelect extraSmall disabled={disabled} name={name} options={sortedOptions} />;
};

EmailsField.displayName = 'EmailsField';
