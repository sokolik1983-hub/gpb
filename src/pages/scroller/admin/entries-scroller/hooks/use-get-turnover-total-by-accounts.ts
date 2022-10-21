import type { IUrlParams } from 'interfaces';
import type { BankTurnoverCard } from 'interfaces/admin/dto/bank-turnover-card';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services/admin';

/** Возвращает клиентов выписки. */
export const useGetTurnoverTotalByAccounts = () => {
  const { id } = useParams<IUrlParams>();

  const { data, isError, isFetched, isFetching } = useQuery<BankTurnoverCard[]>({
    queryKey: ['@eco/statement', 'turnoverTotalByAccount', id],
    queryFn: () => statementService.turnoverTotalByAccounts(id),
    retry: false,
  });

  return { data, isError, isFetched, isFetching };
};
