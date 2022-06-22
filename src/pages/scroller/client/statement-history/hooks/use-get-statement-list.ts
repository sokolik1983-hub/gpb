import type { IPagination } from 'interfaces';
import type { IStatementHistoryRow } from 'interfaces/client';
import { FORM_FIELDS } from 'pages/scroller/client/statement-history/filter';
import { useQuery } from 'react-query';
import { statementService } from 'services';
import { convertTablePaginationToMetaData, convertTableSortByMap } from 'utils';
import type { ICollectionResponse, IMetaData, ISortSettings } from '@platform/services';
import { conditions } from '@platform/services/client';

const DEFAULT_RESPONSE = {
  data: [],
  total: 0,
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

interface IUseGetStatementListArgs {
  /** Обработанные значения фильтров отправляемых на сервер. */
  filters: IMetaData['filters'];
  /** Состояние сортировки таблицы. */
  sorting: ISortSettings;
  /** Состояние пагинации. */
  pagination: IPagination;
}

/** Возвращает данные для отображения в скроллере истории запросов выписок. */
export const useGetStatementList = ({ filters, sorting, pagination }: IUseGetStatementListArgs) => {
  const filterValues = { ...filters };

  // по требованию https://jira.gboteam.ru/browse/GBO-23730 принудительно передаем даже отрицательное значение фильтра
  if (!filterValues?.signed) {
    filterValues.signed = {
      condition: conditions.eq,
      fieldName: FORM_FIELDS.SIGNED,
      value: false,
    };
  }

  const requestDto: IMetaData = {
    filters: filterValues,
    multiSort: convertTableSortByMap(sorting, SORTING_MAP),
    ...convertTablePaginationToMetaData(pagination),
  };

  const { data = DEFAULT_RESPONSE, isError, isFetched, isFetching } = useQuery<ICollectionResponse<IStatementHistoryRow>>({
    queryKey: ['@eco/statement', 'history', requestDto],
    queryFn: () => statementService.getStatementList(requestDto),
    enabled: true,
    cacheTime: 0,
    keepPreviousData: true,
    retry: false,
  });

  return { data, isError, isFetched, isFetching };
};
