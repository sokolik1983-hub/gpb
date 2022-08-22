import React, { useContext } from 'react';
import { DatePeriodField, AccountsField } from 'components';
import { DateRange } from 'components/form/date-range';
import { DATE_PERIODS } from 'interfaces';
import type { IGetDatePeriodResponseDto } from 'interfaces/dto';
import { locale } from 'localization';
import { useForm } from 'react-final-form';
import { Pattern, Adjust } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { FORM_FIELDS } from './constants';

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
    void submit();
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
                <DateRange name={[FORM_FIELDS.DATE_FROM, FORM_FIELDS.DATE_TO]} onChange={handleChangeDate} />
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
