import { PAGE_SIZES } from 'components/common/pagination';
import type { Account } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';
import type { IFilters } from '@platform/core';
import type { IMetaData } from '@platform/services/admin';

/**
 * Возвращает список счетов по переданному фильтру.
 *
 * @param filter - Фильтр.
 * @param enabled - Признак, что нужно сделать запрос.
 */
export const useAccounts = (filter: IFilters, enabled = true) => {
  const metaData: IMetaData = {
    filters: filter,
    offset: 0,
    pageSize: PAGE_SIZES.PER_25,
  };

  const { data = [], isError, isFetched, isFetching, isSuccess } = useQuery<Account[]>({
    cacheTime: 0,
    enabled,
    queryFn: () => statementService.getAccountsPage(metaData),
    queryKey: [PREFIX, '@eco/statement', 'accounts', filter],
    retry: false,
    staleTime: 0,
  });

  return { data, isError, isFetched, isFetching, isSuccess };
};
