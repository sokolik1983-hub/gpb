import type { IGetAccountsResponseDto } from 'interfaces/client';
import { useQuery } from 'react-query';
import { statementService } from 'services';

const DEFAULT_ACCOUNTS = [];

/** Возвращает список счетов и организаций для селектов в фильтре. */
export const useAccounts = () => {
  const { data: accounts = DEFAULT_ACCOUNTS, isFetching, isError: isAccountsError } = useQuery<IGetAccountsResponseDto[]>({
    queryKey: ['@eco/statement', 'accounts'],
    queryFn: () => statementService.getAccounts(),
    retry: false,
  });

  return { accounts, isAccountsError, isAccountsFetching: isFetching };
};
