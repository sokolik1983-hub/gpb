import type { FC } from 'react';
import React, { useContext, useEffect } from 'react';
import { locale } from 'localization';
import { useFormState } from 'react-final-form';
import { Pattern, Fields, Typography, Gap, Horizon, Box } from '@platform/ui';
import type { ITransactionScrollerContext } from '../transaction-scroller-context';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import { FORM_FIELDS } from './constants';
import type { IFormState } from './interfaces';
import { SearchField } from './search-field';
import css from './styles.scss';

/**
 * Поля фильтра которые всегда видны на форме фильтрации.
 * Изменения значений этих полей вызывают обновление скроллера, без нажатия кнопки применить фильтры.
 */
export const QuickFilter: FC = () => {
  const { values } = useFormState<IFormState>();

  const { amountFrom, amountTo, queryString } = values;

  const {
    filterPanel: { onOk, opened },
    tagsPanel: { onClick: expandAdditionalFilters },
    counterparties,
  } = useContext<ITransactionScrollerContext>(TransactionScrollerContext);

  useEffect(() => {
    // При изменении значений полей быстрых фильтров, происходит обновление состояния хука useFilter.
    onOk(values);

    // В хуке useFilter, после обновления стейта,
    // чтобы избежать закрытия формы на UI, вызывается открытие формы.
    if (opened) {
      expandAdditionalFilters();
    }

    // values не включён в массив зависимостей хука т.к запрос на сервер при изменении значения фильтра
    // необходимо делать только при изменении полей в быстрых фильтрах.
    // Они перечисленны в пассиве зависимостей.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onOk, amountFrom, amountTo, queryString]);

  useEffect(() => {
    // Устанавливает окончательное значение фильтров и тэгов, после того как с сервера будут получены все доп. данные.
    onOk(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterparties]);

  return (
    <Pattern gap={'MD'}>
      <Pattern.Span size={5}>
        <Horizon>
          {/* Поиск по таблице. */}
          <SearchField />
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
