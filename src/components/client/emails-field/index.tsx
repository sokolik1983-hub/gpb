import type { FC } from 'react';
import React, { useMemo } from 'react';
import type { IGetAccountsResponseDto } from 'interfaces/dto';
import { compareStrings } from 'utils/common';
import type { IAccountV2 } from '@platform/services/client/dist-types/interfaces/entities';
import type { IOption } from '@platform/ui';
import { Fields } from '@platform/ui';

/**
 * Возвращает опцию для выпадающего списка селекта электронной почты.
 */
const getEmailOption = ({ id, bankClient: { emails } }: IAccountV2): IOption => ({
  value: id,
  label: emails ? emails.toString() : '',
});

/** Свойства компонента EmailsField. */
export interface IAccountsFieldProps {
  /** Путь до поля в форме. */
  name: string;
  /** Счета. */
  accounts: IGetAccountsResponseDto[];
  /** Значение активного поля. */
  disabled?: boolean;
}

/** Селект выбора адреса электронной почты. */
export const EmailsField: FC<IAccountsFieldProps> = ({ name, accounts, disabled }) => {
  const sortedOptions = useMemo(() => accounts.map(account => getEmailOption(account)).sort((a, b) => compareStrings(a.label, b.label)), [
    accounts,
  ]);

  return <Fields.MultiSelect extraSmall withSearch disabled={disabled} name={name} options={sortedOptions} />;
};

EmailsField.displayName = 'EmailsField';
