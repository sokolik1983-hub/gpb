import React, { useCallback } from 'react';
import { InputWithHistory } from 'components';
import { locale } from 'localization';
import { useForm } from 'react-final-form';
import { ECO_STATEMENT } from 'stream-constants';
import { useLocalStorage } from '@platform/services';
import type { IOption } from '@platform/ui';
import { debounce } from '@platform/ui';
import { FORM_FIELDS } from './constants';

/** Максимальный размер истории. */
const MAX_HISTORY_SIZE = 5;

/** Компонент "Поиск по таблице". */
export const SearchField: React.FC = () => {
  const [historyOptions, setHistoryOptions] = useLocalStorage<IOption[]>(`${ECO_STATEMENT}/${FORM_FIELDS.TABLE_SEARCH}`, []);

  const { change } = useForm();

  // TODO: раскомментировать Query, когда будет убран useDebounce в хуке useGetTransactionsList
  // в ходе рефакторинга https://jira.gboteam.ru/browse/GBO-19422
  // const queryClient = useQueryClient();

  const changeHistory = useCallback(
    (value: string) => {
      const option: IOption = { value, label: value };

      const newHistory = [option, ...historyOptions];

      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory.pop();
      }

      setHistoryOptions(newHistory);
    },
    [historyOptions, setHistoryOptions]
  );

  const onChangeSearch = useCallback(
    value => {
      // TODO: убрать все ключи Query в константы.
      // void queryClient.invalidateQueries([ECO_STATEMENT, 'transactions']);

      if (value) {
        const isTheSameHistory = historyOptions.find(el => el.value === value);

        if (!isTheSameHistory) {
          changeHistory(value);
        }
      }
    },
    [changeHistory, historyOptions]
  );

  const debouncedOnChange = debounce(onChangeSearch, 300);

  const onSelectOption = useCallback(
    option => {
      change(FORM_FIELDS.TABLE_SEARCH, option.value);
    },
    [change]
  );

  return (
    <InputWithHistory
      name={FORM_FIELDS.TABLE_SEARCH}
      options={historyOptions}
      placeholder={locale.transactionsScroller.placeholder.tableSearch}
      onChange={debouncedOnChange}
      onSelectOption={onSelectOption}
    />
  );
};

SearchField.displayName = 'SearchField';
