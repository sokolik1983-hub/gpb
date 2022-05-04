import type { IGetAccountsResponseDto } from 'interfaces/dto';
import { useQuery } from 'react-query';
import { statementService } from 'services';

const DEFAULT_ACCOUNTS = [];

/** Возвращает список счетов и организаций для селектов в фильтре. */
export const useAccounts = () => {
  const { data = DEFAULT_ACCOUNTS, isError, isFetched, isFetching } = useQuery<IGetAccountsResponseDto[]>({
    queryKey: ['@eco/statement', 'accounts'],
    queryFn: () => statementService.getAccounts(),
    retry: false,
    cacheTime: 0,
  });

  return { data, isError, isFetched, isFetching };
};
