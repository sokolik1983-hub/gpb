import { useContext } from 'react';
import { TransactionsScrollerContext } from '../context';

/** Хук получения подстроки поиска по таблице. */
export const useQueryString = (): string => {
  const { searchQuery } = useContext(TransactionsScrollerContext);

  return searchQuery || '';
};
