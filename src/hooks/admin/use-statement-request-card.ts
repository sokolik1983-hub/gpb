import type { ExtendedStatementRequestCard } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';

/**
 * Получить карточку запроса выписки по идентификатору.
 *
 * @param id - Идентификатор выписки.
 */
export const useStatementRequestCard = (id: string) => {
  const { data, isLoading, isError } = useQuery<ExtendedStatementRequestCard>({
    cacheTime: 0,
    queryFn: () => statementService.getStatementRequest(id),
    queryKey: [PREFIX, '@eco/statement', 'statement-request-card', id],
    retry: false,
  });

  return { data, isError, isLoading };
};
