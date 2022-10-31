import type { IUrlParams } from 'interfaces';
import type { BankClient } from 'interfaces/common';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';

const DEFAULT_COUNTERPARTY = [];

/** Возвращает клиентов выписки. */
export const useGetClients = () => {
  const { id } = useParams<IUrlParams>();

  const { data = DEFAULT_COUNTERPARTY, isError, isFetched, isFetching } = useQuery<BankClient[]>({
    queryKey: [PREFIX, '@eco/statement', 'clients', id],
    queryFn: () => statementService.getClients(id),
    retry: false,
  });

  return { data, isError, isFetched, isFetching };
};
