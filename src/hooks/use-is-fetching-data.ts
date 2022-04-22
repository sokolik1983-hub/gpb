import { useRef } from 'react';

/** Хук, возвращающий признак загрузки страницы. */
export const useIsFetchingData = (...args: boolean[]): boolean => {
  const fetching = useRef(true);

  const fetched = [...args].every(item => !item);

  if (fetching.current && fetched) {
    fetching.current = false;
  }

  return fetching.current;
};
