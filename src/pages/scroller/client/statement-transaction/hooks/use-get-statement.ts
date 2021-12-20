import type { IStatement } from 'interfaces/client/statement';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services';

/** Возвращает выписку. */
export const useGetStatement = () => {
  const { statementId } = useParams<{ statementId: string }>();

  const { data, isFetching, isError } = useQuery<IStatement>({
    queryKey: ['@eco/statement', 'statement', statementId],
    queryFn: () => statementService.getStatement(statementId),
    retry: false,
  });

  return { statement: data, isStatementError: isError, isStatementFetching: isFetching };
};
