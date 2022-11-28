import type { FC } from 'react';
import React, { useContext, useEffect, useMemo } from 'react';
import { getStorageKey, useSearchHistory } from 'hooks/common';
import type { QuickFilterPanelProps } from 'interfaces/admin';
import { locale } from 'localization';
import { ChangedEntriesScrollerContext } from 'pages/scroller/admin/changed-entries/context';
import { useForm, useFormState } from 'react-final-form';
import { PREFIX } from 'stream-constants/admin';
import { Pattern, Fields, Typography, Gap, Horizon, Box, debounce } from '@platform/ui';
import { FORM_FIELDS } from './constants';
import type { IFilterContext } from './filter-context';
import { FilterContext } from './filter-context';
import type { IFormState } from './interfaces';
import { SearchField } from './search-field';
import css from './styles.scss';

/** Задержка ввода данных перед фиксацией состояния (в миллисекундах). */
const INPUT_DELAY = 300;

/**
 * Поля фильтра которые всегда видны на форме фильтрации.
 * Изменения значений этих полей вызывают обновление скроллера, без нажатия кнопки применить фильтры.
 */
export const QuickFilter: FC<QuickFilterPanelProps> = () => {
  const { submit } = useForm();
  const {
    values: { amountFrom, amountTo, textSearch },
  } = useFormState<IFormState>();

  const { newEntriesFetched } = useContext(ChangedEntriesScrollerContext);
  const { counterparties, clients } = useContext<IFilterContext>(FilterContext);

  const debouncedSubmit = useMemo(() => debounce(submit, INPUT_DELAY), [submit]);

  useEffect(() => {
    debouncedSubmit();
    // values не включён в массив зависимостей хука т.к запрос на сервер при изменении значения фильтра
    // необходимо делать только при изменении полей в быстрых фильтрах.
    // Они перечисленны в пассиве зависимостей.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountFrom, amountTo, textSearch]);

  useEffect(() => {
    // Устанавливает окончательное значение фильтров и тэгов, после того как с сервера будут получены все доп. данные.
    debouncedSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterparties, clients]);

  const { historyOptions, onSearch } = useSearchHistory({
    canAdd: newEntriesFetched,
    textSearch,
    storageKey: getStorageKey(`${PREFIX}/changed-entries`),
  });

  return (
    <Pattern gap={'MD'}>
      <Pattern.Span size={5}>
        <Horizon>
          {/* Поиск по таблице. */}
          <SearchField historyOptions={historyOptions} onSearch={onSearch} />
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
