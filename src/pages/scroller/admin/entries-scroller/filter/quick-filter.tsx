import type { FC } from 'react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { QuickFilterPanelProps } from 'interfaces/admin';
import { locale } from 'localization';
import { useForm, useFormState } from 'react-final-form';
import { ECO_STATEMENT } from 'stream-constants';
import { useLocalStorage } from '@platform/services';
import type { IOption } from '@platform/ui';
import { Pattern, Fields, Typography, Gap, Horizon, Box, debounce } from '@platform/ui';
import { FORM_FIELDS } from './constants';
import type { IFilterContext } from './filter-context';
import { FilterContext } from './filter-context';
import type { IFormState } from './interfaces';
import { SearchField } from './search-field';
import css from './styles.scss';

/** Максимальный размер истории. */
const MAX_HISTORY_SIZE = 5;

/** Задержка ввода данных перед фиксацией состояния (в миллисекундах). */
const INPUT_DELAY = 300;

/**
 * Поля фильтра которые всегда видны на форме фильтрации.
 * Изменения значений этих полей вызывают обновление скроллера, без нажатия кнопки применить фильтры.
 */
export const QuickFilter: FC<QuickFilterPanelProps> = ({ fetchedNewTransactions }) => {
  const { submit } = useForm();
  const {
    values: { amountFrom, amountTo, queryString },
  } = useFormState<IFormState>();

  const [valueOfQueryString, setValueOfQueryString] = useState(queryString);
  const [historyOptions, setHistoryOptions] = useLocalStorage<IOption[]>(`${ECO_STATEMENT}/${FORM_FIELDS.TABLE_SEARCH}`, []);

  const { counterparties, clients } = useContext<IFilterContext>(FilterContext);

  const debouncedSubmit = useMemo(() => debounce(submit, INPUT_DELAY), [submit]);

  useEffect(() => {
    debouncedSubmit();
    // values не включён в массив зависимостей хука т.к запрос на сервер при изменении значения фильтра
    // необходимо делать только при изменении полей в быстрых фильтрах.
    // Они перечисленны в пассиве зависимостей.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountFrom, amountTo, queryString]);

  useEffect(() => {
    // Устанавливает окончательное значение фильтров и тэгов, после того как с сервера будут получены все доп. данные.
    debouncedSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterparties, clients]);

  /** Добавление значения в историю поиска по таблице. */
  const addQueryStringInHistory = useCallback(
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
    if (valueOfQueryString && isExcludeHistoryOptions(valueOfQueryString) && fetchedNewTransactions) {
      addQueryStringInHistory(valueOfQueryString);
    }
  }, [addQueryStringInHistory, isExcludeHistoryOptions, fetchedNewTransactions, valueOfQueryString]);

  /** Изменение значения поля поиска по таблице. */
  const handleSearch = useCallback(value => setValueOfQueryString(value), []);

  return (
    <Pattern gap={'MD'}>
      <Pattern.Span size={5}>
        <Horizon>
          {/* Поиск по таблице. */}
          <SearchField historyOptions={historyOptions} onSearch={handleSearch} />
        </Horizon>
      </Pattern.Span>
      <Pattern.Span size={6}>
        <Horizon>
          <Box className={css.fieldWrapper}>
            {/* Сумма от. */}
            <Fields.Money
              extraSmall
              moneySuffix={''}
              name={FORM_FIELDS.AMOUNT_FROM}
              placeholder={locale.transactionsScroller.placeholder.amountFrom}
            />
          </Box>
          <Gap.X2S />
          <Typography.Text>–</Typography.Text>
          <Gap.X2S />
          <Box className={css.fieldWrapper}>
            {/* Сумма по. */}
            <Fields.Money
              extraSmall
              moneySuffix={''}
              name={FORM_FIELDS.AMOUNT_TO}
              placeholder={locale.transactionsScroller.placeholder.amountTo}
            />
          </Box>
        </Horizon>
      </Pattern.Span>
    </Pattern>
  );
};

QuickFilter.displayName = 'QuickFilter';
