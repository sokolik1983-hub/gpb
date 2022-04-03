import type { FC } from 'react';
import React, { useContext, useEffect } from 'react';
import { AccountsField } from 'components';
import { locale } from 'localization';
import { useFormState } from 'react-final-form';
import { isValidDateRange } from 'utils';
import { Pattern, Box, Typography, Gap, Fields, Horizon } from '@platform/ui';
import { HistoryScrollerContext } from '../history-scroller-context';
import { FORM_FIELDS } from './constants';
import type { IFormState } from './interfaces';
import css from './styles.scss';

/**
 * Поля фильтра которые всегда видны на форме фильтрации.
 * Изменения значений этих полей вызывают обновление скроллера, без нажатия кнопки применить фильтры.
 */
export const QuickFilter: FC = () => {
  const { valid, values } = useFormState<IFormState>();

  const { accountIds, dateFrom, dateTo } = values;

  const {
    filterPanel: { onOk, opened },
    tagsPanel: { onClick: expandAdditionalFilters },
    accounts,
  } = useContext(HistoryScrollerContext);

  useEffect(() => {
    // При изменении значений полей быстрых фильтров, происходит обновление состояния хука useFilter.
    if (valid && isValidDateRange({ dateFrom, dateTo })) {
      onOk(values);
    }

    // В хуке useFilter, после обновления стейта,
    // чтобы избежать закрытия формы на UI, вызывается открытие формы.
    if (opened) {
      expandAdditionalFilters();
    }

    // values не включён в массив зависимостей хука т.к запрос на сервер при изменении значения фильтра
    // необходимо делать только при изменении полей в быстрых фильтрах.
    // Они перечисленны в пассиве зависимостей.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onOk, accountIds, dateFrom, dateTo, valid]);

  useEffect(() => {
    // Устанавливает окончательное значение фильтров и тэгов, после того как с сервера будут получены счета.
    onOk(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  return (
    <Pattern>
      <Pattern.Span size={6}>
        <Horizon>
          <Typography.P fill={'FAINT'}>{locale.historyScroller.filter.labels.date}</Typography.P>
          <Gap.XS />
          <Box className={css.dateFieldWrapper}>
            {/* Дата с */}
            <Fields.Date extraSmall name={FORM_FIELDS.DATE_FROM} />
          </Box>
          <Gap.X2S />
          <Typography.Text>–</Typography.Text>
          <Gap.X2S />
          <Box className={css.dateFieldWrapper}>
            {/* Дата по */}
            <Fields.Date extraSmall name={FORM_FIELDS.DATE_TO} />
          </Box>
          <Gap />
        </Horizon>
      </Pattern.Span>
      <Pattern.Span size={6}>
        {/* Выбор счетов. */}
        <AccountsField
          accounts={accounts}
          name={FORM_FIELDS.ACCOUNT_IDS}
          placeholder={locale.historyScroller.filter.placeholders.accounts}
        />
      </Pattern.Span>
    </Pattern>
  );
};

QuickFilter.displayName = 'QuickFilter';
