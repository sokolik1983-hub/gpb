import type { Sorting, IPagination } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import { useQuery } from 'react-query';
import { statementService } from 'services';
import { convertTableSortingToMetaData, convertTablePaginationToMetaData } from 'utils';
import type { ICollectionResponse } from '@platform/services';
import type { IMetaData } from '@platform/services/client';

const DEFAULT_RESPONSE = {
  data: [],
  total: 0,
};

/** Параметр хука useGetStatementList. */
interface IUseGetStatementListArgs {
  /** Обработанные значения фильтров отправляемых на сервер. */
  filters: IMetaData['filters'];
  /** Состояние сортировки таблицы. */
  sorting: Sorting;
  /** Состояние пагинации. */
  pagination: IPagination;
}

/** Возвращает данные для отображения в скроллере проводок. */
export const useGetTransactionsList = ({ filters, sorting, pagination }: IUseGetStatementListArgs) => {
  const requestDto: IMetaData = {
    filters,
    sort: sorting.length > 0 ? convertTableSortingToMetaData(sorting) : undefined,
    ...convertTablePaginationToMetaData(pagination),
  };

  const { data = DEFAULT_RESPONSE, isFetching: isTransactionsFetching, isError: isTransactionsError } = useQuery<
    ICollectionResponse<IStatementTransactionRow>
  >({
    queryKey: ['@eco/statement', 'transactions', requestDto],
    queryFn: () => statementService.getTransactionList(requestDto),
    cacheTime: 0,
    keepPreviousData: true,
    retry: false,
  });

  return { response: data, isTransactionsFetching, isTransactionsError };
};
