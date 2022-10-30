import type { IUrlParams } from 'interfaces';
import type { StatementSummary } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';

/** Возвращает сводную информацию по выписке. */
export const useStatementSummary = () => {
  const { id } = useParams<IUrlParams>();

  const {
    data = {
      accountNumbers: [],
      currencyGroups: [],
      incomingCount: 0,
      organizationNames: [],
      outgoingCount: 0,
      statement: { dateFrom: '', dateTo: '', id: '' },
    },
    isError,
    isFetched,
    isFetching,
  } = useQuery<StatementSummary>({
    queryKey: [PREFIX, '@eco/statement', 'statementSummary', id],
    queryFn: () => statementService.getStatementSummary(id),
    retry: false,
  });

  return { data, isError, isFetched, isFetching };
};
