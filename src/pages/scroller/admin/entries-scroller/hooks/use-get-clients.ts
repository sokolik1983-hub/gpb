import type { IUrlParams } from 'interfaces';
import type { IClientBankResponseDto } from 'interfaces/dto/admin';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services/admin';

const DEFAULT_COUNTERPARTY = [];

/** Возвращает клиентов выписки. */
export const useGetClients = () => {
  const { id } = useParams<IUrlParams>();

  const { data = DEFAULT_COUNTERPARTY, isError, isFetched, isFetching } = useQuery<IClientBankResponseDto[]>({
    queryKey: ['@eco/statement', 'clients', id],
    queryFn: () => statementService.getClients(id),
    retry: false,
  });

  return { data, isError, isFetched, isFetching };
};
