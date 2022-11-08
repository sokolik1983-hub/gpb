import { useEffect } from 'react';
import { useDebounce } from 'platform-copies/hooks';
import { DELAY } from 'stream-constants';
import type { IFilters } from '@platform/core';

/** Входные параметры хука изменения значений фильтра с задержкой. */
interface UseDebounceFilterRequest {
  /** Задержка в мс. */
  delay?: number;
  /** Значения фильтра. */
  filterValues: IFilters;
  /** Метод установки фильтра. */
  setFilter(values: IFilters): void;
}

/** Хук изменения значений фильтра с задержкой. */
export const useDebounceFilter = ({ delay = DELAY, filterValues, setFilter }: UseDebounceFilterRequest) => {
  const filterValuesDebounced = useDebounce(filterValues, delay);

  useEffect(() => {
    setFilter(filterValuesDebounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValuesDebounced]);
};
