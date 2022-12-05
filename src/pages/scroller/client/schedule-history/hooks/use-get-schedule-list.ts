import type { IPagination } from 'interfaces';
import { useQuery } from 'react-query';
import { statementService } from 'services/client';
import { convertTablePaginationToMetaData, convertTableSortByMap } from 'utils/common';
import type { IMetaData, ISortSettings } from '@platform/services';

/** Дефолтное значение. */
const DEFAULT_RESPONSE = {
  data: [],
  total: 0,
};

/** Мап сортировки для запроса на сервер. */
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

/** Интерфейс хука useGetStatementList. */
interface IUseGetStatementListArgs {
  /** Обработанные значения фильтров отправляемых на сервер. */
  filters: IMetaData['filters'];
  /** Состояние сортировки таблицы. */
  sorting: ISortSettings;
  /** Состояние пагинации. */
  pagination: IPagination;
}

/** Возвращает данные для отображения в скроллере истории запросов выписок по расписанию. */
export const useGetStatementList = ({ filters, sorting, pagination }: IUseGetStatementListArgs) => {
  const filterValues = { ...filters };

  const requestDto: IMetaData = {
    filters: filterValues,
    multiSort: convertTableSortByMap(sorting, SORTING_MAP),
    ...convertTablePaginationToMetaData(pagination),
  };

  const { data = DEFAULT_RESPONSE, isError, isFetched, isFetching } = useQuery({
    queryKey: ['@eco/statement', 'history', requestDto],
    queryFn: () => statementService.getScheduleList(requestDto),
    enabled: true,
    cacheTime: 0,
    keepPreviousData: true,
    retry: false,
  });

  return { data, isError, isFetched, isFetching };
};
