import type { Organization } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';

/**
 * Возвращает список организаций по переданному списку идентификаторов.
 *
 * @param list - Список идентификаторов.
 */
export const useOrganizationsByIds = (list: string[]) => {
  const { data = [], isError, isFetched, isFetching, isSuccess } = useQuery<Organization[]>({
    cacheTime: 0,
    queryFn: () => statementService.getOrganizationListByIds({ list }),
    queryKey: [PREFIX, '@eco/statement', 'accountsByIds', list],
    retry: false,
  });

  return { data, isError, isFetched, isFetching, isSuccess };
};
