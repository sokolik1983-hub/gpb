import { PAGE_SIZES } from 'components/common/pagination';
import type { AccountType } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';
import type { IFilters } from '@platform/core';
import { SORT_DIRECTION } from '@platform/core';
import type { IMetaData } from '@platform/services/admin';

/**
 * Возвращает список типов счетов по переданному фильтру.
 *
 * @param filter - Фильтр.
 */
export const useAccountTypes = (filter: IFilters) => {
  const metaData: IMetaData = {
    filters: filter,
    offset: 0,
    pageSize: PAGE_SIZES.PER_25,
    sort: { code: SORT_DIRECTION.ASC },
  };

  const { data = [], isError, isFetched, isFetching, isSuccess } = useQuery<AccountType[]>({
    cacheTime: 0,
    queryFn: () => statementService.getAccountTypePage(metaData),
    queryKey: [PREFIX, '@eco/statement', 'accountTypes', filter],
    retry: false,
  });

  return { data, isError, isFetched, isFetching, isSuccess };
};
