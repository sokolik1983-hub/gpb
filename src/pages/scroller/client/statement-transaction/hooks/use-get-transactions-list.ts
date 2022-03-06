import { useMemo } from 'react';
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

const SORTING_MAP = {
  /** Дата и время запроса. */
  entryDate: 'entryDate',
  /** Информация о документе. */
  documentNumber: 'documentNumber',
  /** Информация о контрагенте. */
  payeeName: 'payeeName',
  /** Списания. */
  outcome: 'amountDebit',
  /** Поступления. */
  income: 'amountCredit',
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

  const requestDto: IMetaData = useMemo(
    () => ({
      filters,
      multiSort: sorting.length > 0 ? convertTableSortingToMetaData(sorting, SORTING_MAP) : undefined,
      ...convertTablePaginationToMetaData(pagination),
    }),
    [filters, pagination, sorting]
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
