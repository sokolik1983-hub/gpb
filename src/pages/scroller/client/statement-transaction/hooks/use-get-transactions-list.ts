import type { Sorting, IPagination, IUrlParams } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services';
import { convertTableSortingToMetaData, convertTablePaginationToMetaData } from 'utils';
import type { ICollectionResponse } from '@platform/services';
import type { IMetaData } from '@platform/services/client';
import { useDebounce } from '@platform/ui';

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
  const { id } = useParams<IUrlParams>();

  const requestDto: IMetaData = useDebounce(
    {
      filters,
      multiSort: sorting.length > 0 ? convertTableSortingToMetaData(sorting) : undefined,
      ...convertTablePaginationToMetaData(pagination),
    },
    300
  );

  const { data = DEFAULT_RESPONSE, isFetching: isTransactionsFetching, isError: isTransactionsError } = useQuery<
    ICollectionResponse<IStatementTransactionRow>
  >({
    queryKey: ['@eco/statement', 'transactions', requestDto],
    queryFn: () => statementService.getTransactionList(requestDto, id),
    cacheTime: 0,
    keepPreviousData: true,
    retry: false,
  });

  return { response: data, isTransactionsFetching, isTransactionsError };
};
