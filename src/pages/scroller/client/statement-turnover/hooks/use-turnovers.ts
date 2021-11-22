import { useMemo } from 'react';
import type { Sorting } from 'interfaces';
import type { IGetTurnoversRequestDto, IGetTurnoversResponseDto } from 'interfaces/client';
import type { FormState } from 'pages/scroller/client/statement-turnover/filter/interfaces';
import { useQuery } from 'react-query';
import { statementService } from 'services';
import { SORT_DIRECTION } from '@platform/core';

const DEFAULT_TURNOVERS: IGetTurnoversResponseDto = {
  totals: [],
  accounts: [],
};

/**
 * Преобразует стейт сортировки таблицы, в форму подходящую для запроса на сервер.
 *
 * @param sorting - Стейт сортировки таблицы.
 */
const convertTableSortingToDto = (sorting: Sorting): IGetTurnoversRequestDto['sort'] => ({
  field: sorting[0].id,
  direction: sorting[0].desc ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC,
});

/**
 * Возвращает данные для отображения в скроллере оборотов.
 *
 * @param filterValues - Значения фильтров.
 * @param sorting - Значение сортировки.
 */
export const useTurnovers = (filterValues: FormState, sorting: Sorting) => {
  const { accounts, onlyActiveAccounts, dateTo, dateFrom, grouping } = filterValues;

  const requestDto: IGetTurnoversRequestDto = useMemo(
    () => ({
      grouping,
      filter: {
        onlyActiveAccounts,
        dateTo,
        dateFrom,
        accountsIds: accounts,
      },
      sort: convertTableSortingToDto(sorting),
    }),
    [accounts, onlyActiveAccounts, dateTo, dateFrom, grouping, sorting]
  );

  const { data = DEFAULT_TURNOVERS, isFetching: isTurnoversFetching, isError: isTurnoversError } = useQuery<IGetTurnoversResponseDto>({
    queryKey: ['@eco/statement', 'turnovers', requestDto],
    queryFn: () => statementService.getTurnovers(requestDto),
    enabled: Boolean(requestDto.filter.accountsIds?.length),
  });

  return { turnovers: data, isTurnoversFetching, isTurnoversError };
};
