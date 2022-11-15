import { PAGE_SIZES } from 'components/common/pagination';
import type { Organization } from 'interfaces/admin';
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
  const onlyDigit = /^\d+$/.test(value);

  return onlyDigit
    ? {
        innKio: {
          value,
          condition: 'contains',
          fieldName: 'innKio',
        },
      }
    : {
        fullName: {
          value,
          condition: 'contains',
          fieldName: 'fullName',
        },
      };
};

/**
 * Возвращает список организаций по переданной подстроке.
 *
 * @param value - Значение подстроки поиска.
 */
export const useOrganizations = (value = '') => {
  const metaData: IMetaData = {
    filters: getFilters(value),
    offset: 0,
    pageSize: PAGE_SIZES.PER_25,
  };

  const { data = [], isError, isFetched, isFetching, isSuccess } = useQuery<Organization[]>({
    cacheTime: 0,
    queryFn: () => statementService.getOrganizationList(metaData),
    queryKey: [PREFIX, '@eco/statement', 'organizations', value],
    retry: false,
  });

  return { data, isError, isFetched, isFetching, isSuccess };
};
