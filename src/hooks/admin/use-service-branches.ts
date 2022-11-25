import type { Branch } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';

/** Возвращает список подразделений обслуживания. */
export const useServiceBranches = () => {
  const { data = [], isError, isFetched, isFetching, isSuccess } = useQuery<Branch[]>({
    cacheTime: 0,
    queryFn: () => statementService.getServiceBranchList(),
    queryKey: [PREFIX, '@eco/statement', 'serviceBranches'],
    retry: false,
  });

  return { data, isError, isFetched, isFetching, isSuccess };
};
