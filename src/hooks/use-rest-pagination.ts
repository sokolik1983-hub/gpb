import { useMemo } from 'react';
import equal from 'fast-deep-equal';
import type { IPagination } from 'interfaces';
import type { IMetaData } from '@platform/services';
import { usePrevious } from './use-previous';

/** Параметры хука useRestPagination. */
interface IUseRestPaginationArgs {
  /** Обработанные значения фильтров отправляемых на сервер. */
  filterValues: IMetaData['filters'];
  /** Состояние пагинации. */
  pagination: IPagination;
  /** Устанавливает пагинацию. */
  setPagination(value: IPagination): void;
}

/** Вычисляет значение пагинации которое необходимо передать на сервер. */
export const useRestPagination = ({ filterValues, pagination, setPagination }: IUseRestPaginationArgs) => {
  const previousFilters = usePrevious(filterValues) ?? filterValues;

  const paginationToReset = useMemo(() => ({ pageIndex: 0, pageSize: pagination.pageSize }), [pagination.pageSize]);

  const newPagination = useMemo(() => (equal(previousFilters, filterValues) ? pagination : paginationToReset), [
    filterValues,
    pagination,
    paginationToReset,
    previousFilters,
  ]);

  // Сброс пагинации если надо.
  if (newPagination !== pagination) {
    setPagination(newPagination);
  }

  return newPagination;
};
