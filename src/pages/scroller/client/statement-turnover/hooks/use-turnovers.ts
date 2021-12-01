import { useMemo } from 'react';
import type { Sorting } from 'interfaces';
import type { IGetTurnoversRequestDto, IGetTurnoversResponseDto } from 'interfaces/client';
import { useQuery } from 'react-query';
import { statementService } from 'services';
import { SORT_DIRECTION } from '@platform/core';
import type { IFormState } from '../filter/interfaces';

const DEFAULT_TURNOVERS: IGetTurnoversResponseDto = {
  total: [],
  accounts: [],
};

/**
 * Преобразует стейт сортировки таблицы, в форму подходящую для запроса на сервер.
 *
 * @param sorting - Стейт сортировки таблицы.
 */
const convertTableSortingToDto = (sorting: Sorting): IGetTurnoversRequestDto['sort'] => ({
  field: sorting[0].id,
  direction: (sorting[0].desc ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC).toUpperCase(),
});

/**
 * Возвращает данные для отображения в скроллере оборотов.
 *
 * @param filterValues - Значения фильтров.
 * @param sorting - Значение сортировки.
 */
export const useTurnovers = (filterValues: IFormState, sorting: Sorting) => {
  const { accounts, onlyActiveAccounts, dateTo, dateFrom, groupBy } = filterValues;

  const requestDto: IGetTurnoversRequestDto = useMemo(
    () => ({
      groupBy,
      filter: {
        onlyActiveAccounts,
        dateTo,
        dateFrom,
        accountsIds: accounts,
      },
      sort: convertTableSortingToDto(sorting),
    }),
    [accounts, onlyActiveAccounts, dateTo, dateFrom, groupBy, sorting]
  );

  const { data = DEFAULT_TURNOVERS, isFetching: isTurnoversFetching, isError: isTurnoversError } = useQuery<IGetTurnoversResponseDto>({
    queryKey: ['@eco/statement', 'turnovers', requestDto],
    queryFn: () => statementService.getTurnovers(requestDto),
    enabled: Boolean(requestDto.filter.accountsIds?.length),
    retry: false,
  });

  return { turnovers: data, isTurnoversFetching, isTurnoversError };
};
