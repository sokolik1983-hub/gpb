import type { IUrlParams } from 'interfaces';
import type { IStatementSummaryInfo } from 'interfaces/client';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services';

/** Возвращает сводную информацию по выписке. */
export const useGetStatementSummaryInfo = () => {
  const { id } = useParams<IUrlParams>();

  const { data, isFetching, isError } = useQuery<IStatementSummaryInfo>({
    queryKey: ['@eco/statement', 'statement', id],
    queryFn: () => statementService.getStatementSummaryInfo(id),
    retry: false,
  });

  return { statementSummaryInfo: data, isStatementSummaryInfoError: isError, isStatementSummaryInfoFetching: isFetching };
};
