import { useCallback, useEffect, useState } from 'react';
import { ECO_STATEMENT, MAX_SEARCH_HISTORY_SIZE } from 'stream-constants';
import { useLocalStorage } from '@platform/services';
import type { IOption } from '@platform/ui';

/** Входные данные хука useQueryStringInHistory. */
interface UseQueryStringInHistoryRequestProps {
  /** Максимальный размер истории поиска. */
  maxSearchHistorySize?: number;
  /** Признак возможности добавления в историю. */
  canAdd?: boolean;
  /** Строка поиска. */
  textSearch?: string;
  /** Ключ локального хранилища. */
  storageKey: string;
}

/** Выходные данные хука UseQueryStringInHistory. */
interface UseQueryStringInHistoryResponseProps {
  /** Опции истории поиска. */
  historyOptions: IOption[];
  /** Колбэк поиска. */
  onSearch(value: string): void;
}

/**
 * Получить ключ для локального хранилища.
 *
 * @param page - Страница запроса.
 */
export const getStorageKey = (page: string) => `${ECO_STATEMENT}/${page}/search-history`;

/** Хук истории поиска. */
export const useSearchHistory = ({
  maxSearchHistorySize = MAX_SEARCH_HISTORY_SIZE,
  canAdd,
  textSearch = '',
  storageKey,
}: UseQueryStringInHistoryRequestProps): UseQueryStringInHistoryResponseProps => {
  const [queryString, setQueryString] = useState(textSearch);

  const [historyOptions, setHistoryOptions] = useLocalStorage<IOption[]>(storageKey, []);

  /** Метод проверки подстроки поиска в списке истории. */
  const isExcludeHistoryOptions = useCallback(value => !historyOptions.some(item => item.value === value), [historyOptions]);

  /** Добавление подстроки поиска в историю. */
  const addQueryStringInHistory = useCallback(
    (value: string) => {
      const option: IOption = { value, label: value };

      const newHistory = [option, ...historyOptions];

      if (newHistory.length > maxSearchHistorySize) {
        newHistory.pop();
      }

      setHistoryOptions(newHistory);
    },
    [historyOptions, maxSearchHistorySize, setHistoryOptions]
  );

  useEffect(() => {
    if (queryString && isExcludeHistoryOptions(queryString) && canAdd) {
      addQueryStringInHistory(queryString);
    }
  }, [addQueryStringInHistory, isExcludeHistoryOptions, canAdd, queryString]);

  /** Изменение значения поля поиска. */
  const onSearch = useCallback(value => setQueryString(value), []);

  return { historyOptions, onSearch };
};
