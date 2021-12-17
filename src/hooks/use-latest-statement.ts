import type { ILatestStatementDto } from 'interfaces/client';
import { useQuery } from 'react-query';
import { statementService } from 'services';

/** Возвращает последнюю выписку у текущего пользователя. */
export const useLatestStatement = () => {
  const { data: latestStatement } = useQuery<ILatestStatementDto>({
    queryKey: ['@eco/statement', 'latest-statement'],
    queryFn: statementService.findLatest,
    retry: false,
  });

  return { latestStatement };
};
