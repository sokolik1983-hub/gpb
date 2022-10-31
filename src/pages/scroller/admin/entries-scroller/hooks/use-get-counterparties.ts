import type { IUrlParams } from 'interfaces';
import type { Counterparty } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';

const DEFAULT_COUNTERPARTY = [];

/** Возвращает контрагентов выписки. */
export const useGetCounterparties = () => {
  const { id } = useParams<IUrlParams>();

  const { data = DEFAULT_COUNTERPARTY, isError, isFetched, isFetching } = useQuery<Counterparty[]>({
    queryKey: [PREFIX, '@eco/statement', 'counterparty', id],
    queryFn: () => statementService.getCounterparties(id),
    retry: false,
  });

  return { data, isError, isFetched, isFetching };
};
