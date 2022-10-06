import type { FC } from 'react';
import React, { useCallback, useContext } from 'react';
import { AccountsField, DatePeriodField } from 'components/common';
import { DateRange } from 'components/common/form/date-range';
import { DATE_PERIODS } from 'interfaces';
import type { IGetDatePeriodResponseDto } from 'interfaces/dto';
import { locale } from 'localization';
import { useForm } from 'react-final-form';
import { Pattern } from '@platform/ui';
import { StatementHistoryScrollerContext } from '../context';
import { FORM_FIELDS } from './constants';

/**
 * Основной фильтр, который всегда виден.
 * Изменения значений этих полей вызывают обновление скроллера, без нажатия кнопки применения фильтра.
 */
export const QuickFilter: FC = () => {
  const { batch, change, submit } = useForm();

  const { accounts, setLoading } = useContext(StatementHistoryScrollerContext);

  /** Обработчик перед запросом временного периода. */
  const handleStartPeriodFetching = useCallback(() => setLoading(true), [setLoading]);

  /** Обработчик ошибки запроса временного периода. */
  const handleErrorPeriodFetching = useCallback(() => setLoading(false), [setLoading]);

  /**
   * Обработчик успешного получения временного периода.
   *
   * @param period - Временной период.
   */
  const handleSuccessPeriodFetching = useCallback(
    (period?: IGetDatePeriodResponseDto) => {
      if (!period) {
        return;
      }

      batch(() => {
        change(FORM_FIELDS.DATE_FROM, period.dateFrom);
        change(FORM_FIELDS.DATE_TO, period.dateTo);
      });

      void submit();

      setLoading(false);
    },
    [batch, change, setLoading, submit]
  );

  /** Обработчик изменения полей периода дат. */
  const handleChangeDateRange = useCallback(() => {
    change(FORM_FIELDS.PERIOD_TYPE, DATE_PERIODS.SELECT_PERIOD);
  }, [change]);

  return (
    <Pattern gap={'MD'}>
      <Pattern.Span size={8}>
        <Pattern gap={'MD'}>
          <Pattern.Span size={4}>
            <DatePeriodField
              name={FORM_FIELDS.PERIOD_TYPE}
              onErrorFetching={handleErrorPeriodFetching}
              onStartFetching={handleStartPeriodFetching}
              onSuccessFetching={handleSuccessPeriodFetching}
            />
          </Pattern.Span>
          <Pattern.Span size={8}>
            <DateRange
              name={[FORM_FIELDS.DATE_FROM, FORM_FIELDS.DATE_TO]}
              onChangeFrom={handleChangeDateRange}
              onChangeTo={handleChangeDateRange}
            />
          </Pattern.Span>
        </Pattern>
      </Pattern.Span>
      <Pattern.Span size={4}>
        <AccountsField
          accounts={accounts}
          name={FORM_FIELDS.ACCOUNT_IDS}
          placeholder={locale.admin.historyScroller.filter.placeholders.account}
        />
      </Pattern.Span>
    </Pattern>
  );
};
