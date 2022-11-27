import React, { useMemo, useState } from 'react';
import type { IAccountOption } from 'components/common/accounts-field/account-option';
import { AccountOption } from 'components/common/accounts-field/account-option';
import { SelectWithSearch } from 'components/common/select-with-search';
import { useAccounts } from 'hooks/admin';
import type { Account } from 'interfaces/admin';
import { useDebounce } from 'platform-copies/hooks';
import { useFormState } from 'react-final-form';
import { getAccountSearchFilter } from 'utils/admin';
import { formatAccountCode } from '@platform/tools/localization';

/** Задержка изменения данных в мс.  */
const DEBOUNCE_DELAY = 300;

/**
 * Возвращает опцию выбора счета.
 *
 * @param account - Счет.
 * @param account.accountNumber - Номер счета.
 * @param account.bankClient - Информация об организации.
 */
const getAccountOption = ({ accountNumber, bankClient }: Account): IAccountOption => ({
  accountNumber,
  label: formatAccountCode(accountNumber),
  orgName: bankClient?.shortName || bankClient?.fullName,
  value: accountNumber,
});

interface IProps {
  name: string;
  placeholder: string;
}

/**
 * Компонент для выбора счёта из списка с поиском.
 */
export const AccountNumberFilter: React.FC<IProps> = ({ name, placeholder }: IProps) => {
  const { values } = useFormState();

  const selectedOptions: Account[] = values[name];

  const [searchString, setSearchString] = useState('');

  const accountSearchValueDebounced = useDebounce(searchString, DEBOUNCE_DELAY);
  const { data: accounts, isFetched } = useAccounts(getAccountSearchFilter(accountSearchValueDebounced));

  const accountOptions = useMemo(() => accounts.map(getAccountOption), [accounts]);
  const selectedAccountOptions = useMemo(() => selectedOptions.map(getAccountOption), [selectedOptions]);

  return (
    <SelectWithSearch
      multi
      isLoading={!isFetched}
      name={name}
      optionTemplate={AccountOption}
      placeholder={placeholder}
      searchOptions={accountOptions}
      selectedOptions={selectedAccountOptions}
      setSearchValue={setSearchString}
    />
  );
};

AccountNumberFilter.displayName = 'AccountNumberFilter';
