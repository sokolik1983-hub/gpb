import { useEffect, useMemo, useState } from 'react';
import { useBranches } from 'hooks/admin';
import { usePrevious } from 'hooks/common';
import type { BranchOptionProps } from 'pages/form/admin/views/statement-request/components';
import { getServiceBranchOption } from 'pages/form/admin/views/statement-request/components';
import { useDebounce } from 'platform-copies/hooks';
import { DELAY } from 'stream-constants';
import { getBranchSearchFilter } from 'utils/admin';

/** Выходные данные хука useServiceBranches. */
interface UseServiceBranchesResponse {
  /** Список опций выбора подразделений обслуживания. */
  options: BranchOptionProps[];
  /** Метод установки зависимых идентификаторов подразделений обслуживания. */
  setDependentIds(ids: string[]): void;
  /** Метод устанавливает подстроку поиска подразделения обслуживания. */
  setSearchValue(value: string): void;
}

/** Хук изменения списка выбора организаций. */
export const useServiceBranches = (): UseServiceBranchesResponse => {
  const [searchValue, setSearchValue] = useState('');
  const [dependentIds, setDependentIds] = useState<string[]>([]);

  const searchValueDebounced = useDebounce(searchValue, DELAY);
  const prevSearchValueDebounced = usePrevious(searchValueDebounced);

  useEffect(() => {
    if (prevSearchValueDebounced !== searchValueDebounced) {
      setDependentIds([]);
    }
  }, [prevSearchValueDebounced, searchValueDebounced]);

  const { data: searchServiceBranches } = useBranches(getBranchSearchFilter(searchValueDebounced), dependentIds.length === 0);

  const { data: dependentServiceBranches } = useBranches(
    { id: { condition: 'in', value: dependentIds, fieldName: 'id' } },
    dependentIds.length > 0
  );

  const options = useMemo(() => (dependentIds.length > 0 ? dependentServiceBranches : searchServiceBranches).map(getServiceBranchOption), [
    dependentIds.length,
    dependentServiceBranches,
    searchServiceBranches,
  ]);

  return {
    options,
    setDependentIds,
    setSearchValue,
  };
};
