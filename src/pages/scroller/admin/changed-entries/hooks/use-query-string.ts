/** Хук получения подстроки поиска по таблице. */
import { useContext } from 'react';
import { ChangedEntriesScrollerContext } from 'pages/scroller/admin/changed-entries/context';

export const useQueryString = (): string => {
  const { searchQuery } = useContext(ChangedEntriesScrollerContext);

  return searchQuery || '';
};
