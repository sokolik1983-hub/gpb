import type { IUrlParams } from 'interfaces';
import type { IStatementSummaryInfoResponseDto } from 'interfaces/client';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services';
import { getUserDeviceInfo } from 'utils';

/** Возвращает сводную информацию по выписке. */
export const useGetStatementSummaryInfo = () => {
  const { id } = useParams<IUrlParams>();

  const { data, isFetching, isError } = useQuery<IStatementSummaryInfoResponseDto>({
    queryKey: ['@eco/statement', 'statement', id],
    queryFn: async () => {
      const userDeviceInfo = await getUserDeviceInfo();

      return statementService.getStatementSummaryInfo({ statementId: id, userDeviceInfo });
    },
    retry: false,
  });

  return { statementSummaryInfo: data, isStatementSummaryInfoError: isError, isStatementSummaryInfoFetching: isFetching };
};
