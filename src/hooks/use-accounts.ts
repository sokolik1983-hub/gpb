import type { IGetAccountsResponseDto } from 'interfaces/dto';
import { useQuery } from 'react-query';
import { statementService } from 'services';

const DEFAULT_ACCOUNTS = [];

/** Возвращает список счетов и организаций для селектов в фильтре. */
export const useAccounts = () => {
  const { data: accounts, isFetching, isError: isAccountsError } = useQuery<IGetAccountsResponseDto[]>({
    queryKey: ['@eco/statement', 'accounts'],
    queryFn: () => statementService.getAccounts(),
    retry: false,
    cacheTime: 0,
  });

  return { accounts: accounts ?? DEFAULT_ACCOUNTS, isAccountsError, isAccountsFetching: isFetching };
};
