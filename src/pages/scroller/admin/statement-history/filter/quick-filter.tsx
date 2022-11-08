import type { FC } from 'react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DatePeriodField, SelectWithSearch } from 'components/common';
import { AccountOption } from 'components/common/accounts-field/account-option';
import { DateRange } from 'components/common/form/date-range';
import { usePrevious } from 'hooks/common';
import { DATE_PERIODS } from 'interfaces';
import type { QuickFilterPanelProps } from 'interfaces/admin';
import type { IGetDatePeriodResponseDto } from 'interfaces/dto';
import { locale } from 'localization';
import type { FilterValues } from 'pages/scroller/admin/statement-history/filter/types';
import { useForm, useFormState } from 'react-final-form';
import { statementService } from 'services/admin';
import { getAccountOption } from 'utils/common';
import { Pattern } from '@platform/ui';
import { StatementHistoryScrollerContext } from '../context';
import { FORM_FIELDS } from './constants';

/**
 * Основной фильтр, который всегда виден.
 * Изменения значений этих полей вызывают обновление скроллера, без нажатия кнопки применения фильтра.
 */
export const QuickFilter: FC<QuickFilterPanelProps> = ({ applyMixValuesFormAndStorage }) => {
  const [datePeriodLoading, setDatePeriodLoading] = useState(false);

  const { batch, change, submit } = useForm();
  const { valid, values } = useFormState<FilterValues>();

  const { accountIds, dateFrom, dateTo } = values;

  const { accounts, selectedAccounts, setAccountSearchValue, setDatePeriodFetched } = useContext(StatementHistoryScrollerContext);

  const prevValid = usePrevious(valid);

  useEffect(() => {
    change(FORM_FIELDS.PERIOD_TYPE, DATE_PERIODS.YESTERDAY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (valid) {
      applyMixValuesFormAndStorage(Boolean(prevValid));

      void submit();
    }

    // values не включён в массив зависимостей хука т.к запрос на сервер при изменении значения фильтра
    // необходимо делать только при изменении полей в быстрых фильтрах.
    // Они перечисленны в пассиве зависимостей.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountIds, dateFrom, dateTo, valid]);

  const accountOptions = useMemo(() => accounts.map(getAccountOption), [accounts]);
  const selectedAccountOptions = useMemo(() => selectedAccounts.map(getAccountOption), [selectedAccounts]);

  /** Обработчик перед запросом временного периода. */
  const handleStartPeriodFetching = useCallback(() => setDatePeriodLoading(true), []);

  /** Обработчик ошибки запроса временного периода. */
  const handleErrorPeriodFetching = useCallback(() => {
    setDatePeriodFetched();

    setDatePeriodLoading(false);
  }, [setDatePeriodFetched]);

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

      setDatePeriodLoading(false);

      // Необходимо, чтобы данные на форме обновились
      setTimeout(() => setDatePeriodFetched(), 0);
    },
    [batch, change, setDatePeriodFetched, submit]
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
              fetchDatePeriod={statementService.getDatePeriod}
              name={FORM_FIELDS.PERIOD_TYPE}
              onErrorFetching={handleErrorPeriodFetching}
              onStartFetching={handleStartPeriodFetching}
              onSuccessFetching={handleSuccessPeriodFetching}
            />
          </Pattern.Span>
          <Pattern.Span size={8}>
            <DateRange
              disabled={datePeriodLoading}
              name={[FORM_FIELDS.DATE_FROM, FORM_FIELDS.DATE_TO]}
              onChangeFrom={handleChangeDateRange}
              onChangeTo={handleChangeDateRange}
            />
          </Pattern.Span>
        </Pattern>
      </Pattern.Span>
      <Pattern.Span size={4}>
        <SelectWithSearch
          multi
          name={FORM_FIELDS.ACCOUNT_IDS}
          optionTemplate={AccountOption}
          placeholder={locale.admin.historyScroller.filter.placeholder.account}
          searchOptions={accountOptions}
          selectedOptions={selectedAccountOptions}
          setSearchValue={setAccountSearchValue}
        />
      </Pattern.Span>
    </Pattern>
  );
};

QuickFilter.displayName = 'QuickFilter';
