import { PAGE_SIZES } from 'components/common/pagination';
import type { Account } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';
import type { IFilters } from '@platform/core';
import type { IMetaData } from '@platform/services/admin';

/**
 * Получить фильтры для запроса.
 *
 * @param value - Подстрока запроса.
 */
const getFilters = (value: string): IFilters => {
  const formattedValue = value.replace(/\./g, '');
  const onlyDigit = /^\d+$/.test(formattedValue);

  return onlyDigit
    ? {
        accountNumber: {
          value: formattedValue,
          condition: 'contains',
          fieldName: 'accountNumber',
        },
      }
    : {
        clientFullName: {
          value: formattedValue,
          condition: 'contains',
          fieldName: 'clientFullName',
        },
      };
};

/**
 * Возвращает список счетов по переданной подстроке.
 *
 * @param value - Значение подстроки поиска.
 */
export const useAccounts = (value = '') => {
  const metaData: IMetaData = {
    filters: getFilters(value),
    offset: 0,
    pageSize: PAGE_SIZES.PER_25,
  };

  const { data = [], isError, isFetched, isFetching, isSuccess } = useQuery<Account[]>({
    cacheTime: 0,
    queryFn: () => statementService.getAccountList(metaData),
    queryKey: [PREFIX, '@eco/statement', 'accounts', value],
    retry: false,
  });

  return { data, isError, isFetched, isFetching, isSuccess };
};
