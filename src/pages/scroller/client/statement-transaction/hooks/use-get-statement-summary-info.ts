import type { IUrlParams } from 'interfaces';
import type { IStatementSummaryInfoResponseDto } from 'interfaces/dto';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services/client';
import { getUserDeviceInfo } from 'utils/common';

/** Возвращает сводную информацию по выписке. */
export const useGetStatementSummaryInfo = () => {
  const { id } = useParams<IUrlParams>();

  const { data, isError, isFetched, isFetching } = useQuery<IStatementSummaryInfoResponseDto>({
    queryKey: ['@eco/statement', 'statement', id],
    queryFn: async () => {
      const userDeviceInfo = await getUserDeviceInfo();

      return statementService.getStatementSummaryInfo({ statementId: id, userDeviceInfo });
    },
    retry: false,
  });

  return { data, isError, isFetched, isFetching };
};
