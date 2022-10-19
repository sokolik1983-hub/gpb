import type { User } from 'interfaces/admin';
import type { UserRequestDto } from 'interfaces/dto/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';

/**
 * Возвращает список пользователей по переданной подстроке с ФИО.
 *
 * @param value - Значение подстроки поиска.
 */
export const useUsersByFio = (value = '') => {
  const requestData: UserRequestDto = {
    fio: {
      contains: value,
    },
  };

  const { data = [], isError, isFetched, isFetching, isSuccess } = useQuery<User[]>({
    cacheTime: 0,
    queryFn: () => statementService.getUserListByFio(requestData),
    queryKey: [PREFIX, '@eco/statement', 'usersByFio', value],
    select: users => users.slice(0, 100),
    retry: false,
  });

  return { data, isError, isFetched, isFetching, isSuccess };
};
