import type { StatementBranch } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';

/** Возвращает все филиалы. */
export const useAllBranches = () => {
  const { data = [], isError, isFetched, isFetching, isSuccess } = useQuery<StatementBranch[]>({
    cacheTime: 0,
    queryFn: () => statementService.getAllBranches(),
    queryKey: [PREFIX, '@eco/statement', 'allBranches'],
    retry: false,
  });

  return { data, isError, isFetched, isFetching, isSuccess };
};
