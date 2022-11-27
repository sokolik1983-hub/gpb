import React, { useMemo, useState } from 'react';
import { SelectWithSearch } from 'components/common/select-with-search';
import { useOrganizations } from 'hooks/admin';
import type { Organization } from 'interfaces/admin';
import { useDebounce } from 'platform-copies/hooks';
import { useFormState } from 'react-final-form';
import { getOrganizationSearchFilter } from 'utils/admin';
import { stringifyCounterparty } from 'utils/common';
import { OrganizationOption } from './organization-option';

/** Задержка изменения данных в мс.  */
const DEBOUNCE_DELAY = 300;

/**
 * Возвращает опцию выбора организации.
 *
 * @param organization - Организация.
 * @param organization.fullName - Полное наименование.
 * @param organization.innKio - ИНН.
 * @param organization.shortName - Короткое наименование.
 */
export const getOrganizationOption = ({ fullName, innKio, shortName }: Organization) => ({
  inn: innKio,
  label: shortName || fullName,
  value: stringifyCounterparty({ inn: innKio, name: shortName || fullName }),
});

interface IProps {
  name: string;
  placeholder: string;
}

/**
 * Компонент для выбора организации(клиента или контрагента) из списка с поиском.
 */
export const OrganizationFilter: React.FC<IProps> = ({ name, placeholder }: IProps) => {
  const { values } = useFormState();

  const formOptions: Organization[] = values[name];

  const [searchString, setSearchString] = useState('');

  const searchValueDebounced = useDebounce(searchString, DEBOUNCE_DELAY);
  const { data: accounts, isFetched } = useOrganizations(getOrganizationSearchFilter(searchValueDebounced));

  const options = useMemo(() => accounts.map(getOrganizationOption), [accounts]);
  const selectedOptions = useMemo(() => formOptions.map(getOrganizationOption), [formOptions]);

  return (
    <SelectWithSearch
      multi
      isLoading={!isFetched}
      name={name}
      optionTemplate={OrganizationOption}
      placeholder={placeholder}
      searchOptions={options}
      selectedOptions={selectedOptions}
      setSearchValue={setSearchString}
    />
  );
};

OrganizationFilter.displayName = 'OrganizationFilter';
