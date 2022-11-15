import { PAGE_SIZES } from 'components/common/pagination';
import type { User } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';
import type { IMetaData } from '@platform/services/admin';

/**
 * Возвращает список пользователей по фильтрам.
 *
 * @param filter - Фильтр.
 * @param filter.ids - Список идентификаторов пользователей.
 */
export const useUsers = (filter: { ids: string[] }) => {
  const metaData: IMetaData = {
    filters: {
      id: {
        value: filter.ids,
        condition: 'in',
        fieldName: 'uaaUserId',
      },
    },
    offset: 0,
    pageSize: filter.ids.length > 0 ? filter.ids.length : PAGE_SIZES.PER_25,
  };

  const { data = [], isError, isFetched, isFetching, isSuccess } = useQuery<User[]>({
    cacheTime: 0,
    queryFn: () => statementService.getUserList(metaData),
    queryKey: [PREFIX, '@eco/statement', 'users', filter],
    retry: false,
  });

  return { data, isError, isFetched, isFetching, isSuccess };
};
