import type { Account } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';

/**
 * Возвращает список счетов по переданному списку идентификаторов.
 *
 * @param ids - Список идентификаторов.
 */
export const useAccountsByIds = (ids: string[]) => {
  const { data = [], isError, isFetched, isFetching, isSuccess } = useQuery<Account[]>({
    cacheTime: 0,
    queryFn: () => statementService.getAccountListByIds({ ids }),
    queryKey: [PREFIX, '@eco/statement', 'accountsByIds', ids],
    retry: false,
  });

  return { data, isError, isFetched, isFetching, isSuccess };
};
