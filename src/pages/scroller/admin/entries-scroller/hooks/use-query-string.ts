import { useContext } from 'react';
import { EntriesScrollerContext } from '../context';
import { FORM_FIELDS } from '../filter/constants';

/** Хук получения подстроки поиска по таблице. */
export const useQueryString = (): string => {
  const { filters } = useContext(EntriesScrollerContext);

  return filters[FORM_FIELDS.TABLE_SEARCH]?.value || '';
};
