import type { IUrlParams } from 'interfaces';
import type { IGetCounterpartiesResponseDto } from 'interfaces/client';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services';

const DEFAULT_COUNTERPARTY = [];

/** Возвращает контрагентов платежа.. */
export const useGetCounterparties = () => {
  const { id } = useParams<IUrlParams>();

  const { data = DEFAULT_COUNTERPARTY, isFetching, isError } = useQuery<IGetCounterpartiesResponseDto[]>({
    queryKey: ['@eco/statement', 'counterparty', id],
    queryFn: () => statementService.getCounterparties(id),
    retry: false,
  });

  return { counterparties: data, isCounterpartiesError: isError, isCounterpartiesFetching: isFetching };
};
