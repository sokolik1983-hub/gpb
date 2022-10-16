import type { IUrlParams } from 'interfaces';
import type { IClientBankResponseDto } from 'interfaces/dto/admin';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services/admin';

const DEFAULT_COUNTERPARTY = [];

/** Возвращает контрагентов выписки. */
export const useGetCounterparties = () => {
  const { id } = useParams<IUrlParams>();

  const { data = DEFAULT_COUNTERPARTY, isError, isFetched, isFetching } = useQuery<IClientBankResponseDto[]>({
    queryKey: ['@eco/statement', 'counterparty', id],
    queryFn: () => statementService.getCounterparties(id),
    retry: false,
  });

  return { data, isError, isFetched, isFetching };
};
