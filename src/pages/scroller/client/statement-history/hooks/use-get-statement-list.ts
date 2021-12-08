import { useMemo } from 'react';
import type { Sorting } from 'interfaces';
import type { IStatementHistoryRow } from 'interfaces/client';
import { useQuery } from 'react-query';
import { statementService } from 'services';
import { convertTableSortingToMetaData } from 'utils';
import type { ICollectionResponse } from '@platform/services';
import type { IMetaData } from '@platform/services/client';
import type { IFormState } from '../filter';

const DEFAULT_RESPONSE = {
  data: [],
  total: 0,
};

interface IUseGetStatementListArgs {
  /** Обработанные значения фильтров отправляемых на сервер. */
  filters: IMetaData['filters'];
  /** Значения формы фильтрации. */
  formValues: IFormState;
  /** Состояние сортировки таблицы. */
  sorting: Sorting;
}

/** Возвращает данные для отображения в скроллере истории запросов выписок. */
export const useGetStatementList = ({ filters, formValues, sorting }: IUseGetStatementListArgs) => {
  // @ts-expect-error: TODO добавить значения для пагинации, при реализации пагинации
  const requestDto: IMetaData = useMemo(() => ({ filters, sort: convertTableSortingToMetaData(sorting) }), [filters, sorting]);

  const { data = DEFAULT_RESPONSE, isFetching: isStatementsFetching, isError: isStatementsError } = useQuery<
    ICollectionResponse<IStatementHistoryRow>
  >({
    queryKey: ['@eco/statement', 'history', requestDto],
    queryFn: () => statementService.getStatementList(requestDto),
    enabled: Boolean(formValues?.selectedAccounts?.length),
    retry: false,
  });

  return { response: data, isStatementsFetching, isStatementsError };
};
