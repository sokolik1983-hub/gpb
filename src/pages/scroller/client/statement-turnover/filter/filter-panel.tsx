import React, { useContext, useEffect } from 'react';
import { DatePeriodField, AccountsField } from 'components';
import type { IGetDatePeriodResponseDto } from 'interfaces/client';
import { DATE_PERIODS } from 'interfaces/client';
import { useForm, useFormState } from 'react-final-form';
import { dateTime } from '@platform/tools/date-time';
import { Fields, Pattern, Adjust, Horizon, Box, Typography } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { FORM_FIELDS } from './constants';
import type { IFormState } from './interfaces';
import css from './styles.scss';

/** Фильтры скроллера. */
export const FilterPanel = () => {
  const {
    values: { dateFrom = '', dateTo = '' },
  } = useFormState<IFormState>();
  const { batch, change, submit } = useForm();

  const { setHasError, setIsLoading, accounts } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const handleStartPeriodFetching = () => setIsLoading(true);

  const handleSuccessPeriodFetching = (period?: IGetDatePeriodResponseDto) => {
    if (!period) {
      return;
    }

    batch(() => {
      change('dateFrom', period.dateFrom);
      change('dateTo', period.dateTo);
    });
    setIsLoading(false);
    void submit();
  };

  const handleErrorPeriodFetching = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleDateChange = () => {
    change(FORM_FIELDS.DATE_PERIOD, DATE_PERIODS.SELECT_PERIOD);
  };

  useEffect(() => {
    // Если введённое значение "Дата по" меньше "Дата с" то устанавливает "Дата по" в значение "Дата с"
    if (dateFrom && dateTo && dateTime(dateTo).isBefore(dateFrom, 'day')) {
      change(FORM_FIELDS.DATE_TO, dateFrom);
    }
    // dateFrom не включён в зависимости т.к. нужно, чтобы срабатывал только при изменении dateTo.
    // Через onChange сделать не получилось потому, что при вызове change() внутри обработчика onChange,
    // стейт формы и компонента рассинхронизируются.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, dateTo]);

  useEffect(() => {
    // Если "Дата с" больше "Дата по" то устанавливает "Дата c" в значение "Дата по"
    if (dateFrom && dateTo && dateTime(dateFrom).isAfter(dateTo, 'day')) {
      change(FORM_FIELDS.DATE_FROM, dateTo);
    }
    // dateTo не включён в зависимости т.к. нужно, чтобы срабатывал только при изменении dateTo.
    // Через onChange сделать не получилось потому, что при вызове change() внутри обработчика onChange,
    // стейт формы и компонента рассинхронизируются.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, dateFrom]);

  return (
    <Pattern>
      <Pattern.Span size={6}>
        <Adjust pad={[null, 'XS', null, null]}>
          <Pattern>
            <Pattern.Span size={5}>
              <Adjust pad={[null, 'X2S', null, null]}>
                {/* Выбор периода. */}
                <DatePeriodField
                  name={FORM_FIELDS.DATE_PERIOD}
                  onErrorFetching={handleErrorPeriodFetching}
                  onStartFetching={handleStartPeriodFetching}
                  onSuccessFetching={handleSuccessPeriodFetching}
                />
              </Adjust>
            </Pattern.Span>
            <Pattern.Span size={7}>
              <Adjust pad={[null, null, null, 'X2S']}>
                <Horizon>
                  <Box className={Adjust.getPadClass([null, 'X2S', null, null])}>
                    {/* Дата от. */}
                    <Fields.Date extraSmall name={FORM_FIELDS.DATE_FROM} onChange={handleDateChange} />
                  </Box>
                  <Typography.Text className={css.dateDelimiter}>–</Typography.Text>
                  <Box className={Adjust.getPadClass([null, null, null, 'X2S'])}>
                    {/* Дата по. */}
                    <Fields.Date extraSmall name={FORM_FIELDS.DATE_TO} onChange={handleDateChange} />
                  </Box>
                </Horizon>
              </Adjust>
            </Pattern.Span>
          </Pattern>
        </Adjust>
      </Pattern.Span>
      <Pattern.Span size={6}>
        <Adjust pad={[null, 'XS', null, 'XS']}>
          {/* Выбор счетов. */}
          <AccountsField accounts={accounts} name={FORM_FIELDS.ACCOUNTS} />
        </Adjust>
      </Pattern.Span>
    </Pattern>
  );
};

FilterPanel.displayName = 'FilterPanel';
