import { useRef } from 'react';

/** Хук, возвращающий признак загрузки страницы. */
export const useIsFetchedData = (...args: boolean[]): boolean => {
  const fetched = useRef(false);

  const allFetched = [...args].every(item => item);

  if (!fetched.current && allFetched) {
    fetched.current = true;
  }

  return fetched.current;
};
