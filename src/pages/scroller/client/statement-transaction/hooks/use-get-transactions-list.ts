import { useMemo } from 'react';
import { usePrevious } from 'hooks';
import type { Sorting, IPagination, IUrlParams, IExpandedCollectionResponse } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services';
import { convertTableSortingToMetaData, convertTablePaginationToMetaData } from 'utils';
import type { IMetaData } from '@platform/services/client';
import { useDebounce } from '@platform/ui';

const DEFAULT_RESPONSE: IExpandedCollectionResponse<IStatementTransactionRow> = {
  data: [],
  total: 0,
  totalCount: 0,
};

/** Параметр хука useGetStatementList. */
interface IUseGetStatementListArgs {
  /** Обработанные значения фильтров отправляемых на сервер. */
  filters: IMetaData['filters'];
  /** Состояние сортировки таблицы. */
  sorting: Sorting;
  /** Состояние пагинации. */
  pagination: IPagination;
  /** Устанавливает пагинацию. */
  setPagination(value: IPagination): void;
}

/** Возвращает данные для отображения в скроллере проводок. */
export const useGetTransactionsList = ({ filters, sorting, pagination, setPagination }: IUseGetStatementListArgs) => {
  const { id } = useParams<IUrlParams>();

  const previousFilters = usePrevious(filters) ?? filters;

  const paginationToReset = useMemo(() => ({ pageIndex: 0, pageSize: pagination.pageSize }), [pagination.pageSize]);

  // Если значения фильтров изменились, то надо сбросить пагинацию на начало.
  const newPagination = previousFilters === filters ? pagination : paginationToReset;

  // Сброс пагинации если надо.
  if (newPagination !== pagination) {
    setPagination(newPagination);
  }

  const requestDto: IMetaData = useMemo(
    () => ({
      filters,
      multiSort: sorting.length > 0 ? convertTableSortingToMetaData(sorting) : undefined,
      ...convertTablePaginationToMetaData(newPagination),
    }),
    [filters, newPagination, sorting]
  );

  const debouncedRequestDto: IMetaData = useDebounce(requestDto, 300);

  const { data = DEFAULT_RESPONSE, isFetching: isTransactionsFetching, isError: isTransactionsError } = useQuery<
    IExpandedCollectionResponse<IStatementTransactionRow>
  >({
    queryKey: ['@eco/statement', 'transactions', debouncedRequestDto],
    queryFn: () => statementService.getTransactionList(debouncedRequestDto, id),
    cacheTime: 0,
    enabled: true,
    keepPreviousData: true,
    retry: false,
  });

  return { response: data, isTransactionsFetching, isTransactionsError };
};
