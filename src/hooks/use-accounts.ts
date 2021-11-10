import { useEffect } from 'react';
import type { IGetAccountsResponseDto } from 'interfaces/client';
import { useQuery } from 'react-query';
import { statementService } from 'services';
import { hideLoader, showLoader } from '@platform/services';

const DEFAULT_ACCOUNTS = [];

/** Возвращает список счетов и организаций для селектов в фильтре. */
export const useAccounts = (/* TODO: когда будет рест предавать параметр */) => {
  const { data: accounts = DEFAULT_ACCOUNTS, isFetching, isError: isAccountsError } = useQuery<IGetAccountsResponseDto[]>({
    queryKey: ['@eco/statement', 'accounts'],
    queryFn: () => statementService.getAccounts(),
  });

  useEffect(() => {
    if (isFetching) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isFetching]);

  return { accounts, isAccountsError };
};
