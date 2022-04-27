import type { IUrlParams } from 'interfaces';
import type { IGetCounterpartiesResponseDto } from 'interfaces/dto';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services';

const DEFAULT_COUNTERPARTY = [];

/** Возвращает контрагентов платежа.. */
export const useGetCounterparties = () => {
  const { id } = useParams<IUrlParams>();

  const { data = DEFAULT_COUNTERPARTY, isError, isFetched, isFetching } = useQuery<IGetCounterpartiesResponseDto[]>({
    queryKey: ['@eco/statement', 'counterparty', id],
    queryFn: () => statementService.getCounterparties(id),
    retry: false,
  });

  return { data, isError, isFetched, isFetching };
};
