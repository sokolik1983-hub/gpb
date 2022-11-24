import { PAGE_SIZES } from 'components/common/pagination';
import type { Branch } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';
import type { IFilters } from '@platform/core';
import type { IMetaData } from '@platform/services/admin';

/**
 * Возвращает список филиалов по переданному фильтру.
 *
 * @param filter - Фильтр.
 * @param enabled - Признак, что нужно сделать запрос.
 */
export const useBranches = (filter: IFilters, enabled = true) => {
  const metaData: IMetaData = {
    filters: filter,
    offset: 0,
    pageSize: PAGE_SIZES.PER_25,
  };

  const { data = [], isError, isFetched, isFetching, isSuccess } = useQuery<Branch[]>({
    cacheTime: 0,
    enabled,
    queryFn: () => statementService.getBranchesPage(metaData),
    queryKey: [PREFIX, '@eco/statement', 'serviceBranches', filter],
    retry: false,
  });

  return { data, isError, isFetched, isFetching, isSuccess };
};
