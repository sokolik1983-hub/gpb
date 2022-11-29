import { PAGE_SIZES } from 'components/common/pagination';
import type { Account } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';
import type { IFilters } from '@platform/core';
import type { IMetaData } from '@platform/services/admin';

/** Входные данные хука useAccounts. */
interface UseAccountsRequestProps {
  /** Фильтр. */
  filter?: IFilters;
  /** Признак вызова апи. */
  enabled?: boolean;
  /** Размер страницы. */
  pageSize?: number;
}

/** Возвращает список счетов по переданному фильтру. */
export const useAccounts = ({ filter = {}, enabled = true, pageSize = PAGE_SIZES.PER_25 }: UseAccountsRequestProps) => {
  const metaData: IMetaData = {
    filters: filter,
    offset: 0,
    pageSize,
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
