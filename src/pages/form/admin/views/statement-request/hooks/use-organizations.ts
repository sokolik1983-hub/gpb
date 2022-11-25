import { useEffect, useMemo, useState } from 'react';
import type { OrganizationOptionProps } from 'components/common';
import { useOrganizations as useOrganizationsByFilter } from 'hooks/admin';
import { usePrevious } from 'hooks/common';
import { useDebounce } from 'platform-copies/hooks';
import { DELAY } from 'stream-constants';
import { getOrganizationSearchFilter } from 'utils/admin';
import { getOrganizationOption } from 'utils/admin/options';

/** Выходные данные хука useOrganizations. */
interface UseOrganizationsResponse {
  /** Список опций выбора организации. */
  options: OrganizationOptionProps[];
  /** Метод установки зависимых идентификаторов организаций. */
  setDependentIds(ids: string[]): void;
  /** Метод устанавливает подстроку поиска организаций. */
  setSearchValue(value: string): void;
}

/** Хук изменения списка выбора организаций. */
export const useOrganizations = (): UseOrganizationsResponse => {
  const [searchValue, setSearchValue] = useState('');
  const [dependentIds, setDependentIds] = useState<string[]>([]);

  const searchValueDebounced = useDebounce(searchValue, DELAY);
  const prevSearchValueDebounced = usePrevious(searchValueDebounced);

  useEffect(() => {
    if (prevSearchValueDebounced !== searchValueDebounced) {
      setDependentIds([]);
    }
  }, [prevSearchValueDebounced, searchValueDebounced]);

  const { data: searchOrganizations } = useOrganizationsByFilter(
    getOrganizationSearchFilter(searchValueDebounced),
    dependentIds.length === 0
  );

  const { data: dependentOrganizations } = useOrganizationsByFilter(
    { id: { condition: 'in', value: dependentIds, fieldName: 'id' } },
    dependentIds.length > 0
  );

  const options = useMemo(() => (dependentIds.length > 0 ? dependentOrganizations : searchOrganizations).map(getOrganizationOption), [
    dependentIds.length,
    dependentOrganizations,
    searchOrganizations,
  ]);

  return {
    options,
    setDependentIds,
    setSearchValue,
  };
};
