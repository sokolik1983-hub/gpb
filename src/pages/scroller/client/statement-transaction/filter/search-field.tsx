import React, { useCallback, useContext, useEffect, useState } from 'react';
import { InputWithHistory } from 'components';
import { usePrevious } from 'hooks';
import { locale } from 'localization';
import { TransactionScrollerContext } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import { useForm, useFormState } from 'react-final-form';
import { ECO_STATEMENT, QUERY_STATUS } from 'stream-constants';
import { useLocalStorage } from '@platform/services';
import type { IOption } from '@platform/ui';
import { FORM_FIELDS } from './constants';

/** Максимальный размер истории. */
const MAX_HISTORY_SIZE = 5;

/** Компонент "Поиск по таблице". */
export const SearchField: React.FC = () => {
  const { values } = useFormState();
  const [searchValue, setSearchValue] = useState(() => values[FORM_FIELDS.TABLE_SEARCH]);

  const { change } = useForm();

  const [historyOptions, setHistoryOptions] = useLocalStorage<IOption[]>(`${ECO_STATEMENT}/${FORM_FIELDS.TABLE_SEARCH}`, []);

  const { status } = useContext(TransactionScrollerContext);
  const prevStatus = usePrevious(status);

  /** Добавление значения в историю поиска по таблице. */
  const addSearchValueInHistory = useCallback(
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

  /** Метод, возвращающий флаг проверки переданного значения поля истории поиска по списку истории (если нет true). */
  const isExcludeHistoryOptions = useCallback(value => !historyOptions.some(item => item.value === value), [historyOptions]);

  useEffect(() => {
    if (searchValue && isExcludeHistoryOptions(searchValue) && prevStatus === QUERY_STATUS.LOADING && status === QUERY_STATUS.SUCCESS) {
      addSearchValueInHistory(searchValue);
    }
  }, [addSearchValueInHistory, isExcludeHistoryOptions, prevStatus, searchValue, status]);

  /** Изменение значения поля поиска по таблице. */
  const handleChange = useCallback(value => setSearchValue(value), []);

  /** Выбор значения из истории поиска по таблице. */
  const handleSelectOption = useCallback(
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
      onChange={handleChange}
      onSelectOption={handleSelectOption}
    />
  );
};

SearchField.displayName = 'SearchField';
