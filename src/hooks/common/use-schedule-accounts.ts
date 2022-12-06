import type { IGetAccountsResponseDto } from 'interfaces/dto';
import { useQuery } from 'react-query';

const DEFAULT_ACCOUNTS = [];

/** Возвращает список счетов,организаций и почтовых ящиков для селектов . */
export const useScheduleAccounts = () => {
  const { data = DEFAULT_ACCOUNTS, isError, isFetched, isFetching, isSuccess } = useQuery<IGetAccountsResponseDto[]>({
    queryKey: ['@eco/statement', 'accounts'],
    retry: false,
    cacheTime: 0,
  });

  data.forEach(item => (item.bankClient.emails = ['33333@mail.ru']));

  return { data, isError, isFetched, isFetching, isSuccess };
};
