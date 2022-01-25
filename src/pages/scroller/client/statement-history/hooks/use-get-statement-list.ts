import type { Sorting, IPagination } from 'interfaces';
import type { IStatementHistoryRow } from 'interfaces/client';
import { useQuery } from 'react-query';
import { statementService } from 'services';
import { convertTableSortingToMetaData, convertTablePaginationToMetaData } from 'utils';
import type { ICollectionResponse } from '@platform/services';
import type { IMetaData } from '@platform/services/client';

const DEFAULT_RESPONSE = {
  data: [],
  total: 0,
};

interface IUseGetStatementListArgs {
  /** Обработанные значения фильтров отправляемых на сервер. */
  filters: IMetaData['filters'];
  /** Состояние сортировки таблицы. */
  sorting: Sorting;
  /** Состояние пагинации. */
  pagination: IPagination;
}

/** Возвращает данные для отображения в скроллере истории запросов выписок. */
export const useGetStatementList = ({ filters, sorting, pagination }: IUseGetStatementListArgs) => {
  const requestDto: IMetaData = {
    filters,
    sort: sorting.length > 0 ? convertTableSortingToMetaData(sorting) : undefined,
    ...convertTablePaginationToMetaData(pagination),
  };

  const { data = DEFAULT_RESPONSE, isFetching: isStatementsFetching, isError: isStatementsError } = useQuery<
    ICollectionResponse<IStatementHistoryRow>
  >({
    queryKey: ['@eco/statement', 'history', requestDto],
    queryFn: () => statementService.getStatementList(requestDto),
    enabled: true,
    cacheTime: 0,
    keepPreviousData: true,
    retry: false,
  });

  return { response: data, isStatementsFetching, isStatementsError };
};
