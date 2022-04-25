import React, { useContext } from 'react';
import cn from 'classnames';
import { DatePeriodField, AccountsField } from 'components';
import { DATE_PERIODS } from 'interfaces';
import type { IGetDatePeriodResponseDto } from 'interfaces/dto';
import { locale } from 'localization';
import { useForm } from 'react-final-form';
import { Fields, Pattern, Adjust, Horizon, Box, Typography } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { FORM_FIELDS } from './constants';
import css from './styles.scss';

/** Фильтры скроллера. */
export const FilterPanel = () => {
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

  const handleChangeDate = () => {
    change(FORM_FIELDS.DATE_PERIOD, DATE_PERIODS.SELECT_PERIOD);
  };

  return (
    <Pattern>
      <Pattern.Span size={6}>
        <Adjust pad={[null, 'XS', null, null]}>
          <Pattern>
            <Pattern.Span size={4}>
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
            <Pattern.Span size={8}>
              <Adjust pad={[null, null, null, 'X2S']}>
                <Horizon>
                  <Box className={cn(css.dateFieldWrapper, Adjust.getPadClass([null, 'X2S', null, null]))}>
                    {/* Дата от. */}
                    <Fields.Date extraSmall name={FORM_FIELDS.DATE_FROM} onChange={handleChangeDate} />
                  </Box>
                  <Typography.Text className={css.dateDelimiter}>–</Typography.Text>
                  <Box className={cn(css.dateFieldWrapper, Adjust.getPadClass([null, null, null, 'X2S']))}>
                    {/* Дата по. */}
                    <Fields.Date extraSmall name={FORM_FIELDS.DATE_TO} onChange={handleChangeDate} />
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
          <AccountsField
            accounts={accounts}
            name={FORM_FIELDS.ACCOUNTS}
            placeholder={locale.historyScroller.filter.placeholders.accounts}
          />
        </Adjust>
      </Pattern.Span>
    </Pattern>
  );
};

FilterPanel.displayName = 'FilterPanel';
