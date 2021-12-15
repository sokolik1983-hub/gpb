import type { IGetCounterpartiesResponseDto } from 'interfaces/client';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services';

const DEFAULT_COUNTERPARTY = [];

/** Возвращает контрагентов платежа.. */
export const useGetCounterparties = () => {
  const { statementId } = useParams<{ statementId: string }>();

  const { data = DEFAULT_COUNTERPARTY, isFetching, isError } = useQuery<IGetCounterpartiesResponseDto[]>({
    queryKey: ['@eco/statement', 'counterparty', statementId],
    queryFn: () => statementService.getCounterparties(statementId),
    retry: false,
  });

  return { counterparties: data, isCounterpartiesError: isError, isCounterpartiesFetching: isFetching };
};
