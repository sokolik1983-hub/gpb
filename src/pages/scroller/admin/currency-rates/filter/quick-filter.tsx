import type { FC } from 'react';
import React, { useContext } from 'react';
import { SelectWithSearch } from 'components/common';
import { DateRange } from 'components/common/form/date-range';
import { useSubmitScrollerFilter } from 'hooks/common';
import { locale } from 'localization';
import { FORM_FIELDS } from 'pages/scroller/admin/currency-rates/filter/constants';
import { FilterContext } from 'pages/scroller/admin/currency-rates/filter/context';
import type { FilterValues } from 'pages/scroller/admin/currency-rates/filter/types';
import { getCurrencyCodeOption } from 'pages/scroller/admin/currency-rates/filter/utils';
import { useFormState } from 'react-final-form';
import { Gap, Horizon, Pattern, Typography } from '@platform/ui';

/** Основной фильтр. Изменения значений этих полей вызывают обновление скроллера. */
export const QuickFilter: FC = () => {
  const { values } = useFormState<FilterValues>();

  useSubmitScrollerFilter<FilterValues>({ submitDep: values });

  const { currencies, selectedCurrencies, setCurrencyCodeSearchValue } = useContext(FilterContext);

  const currentCodeOptions = currencies.map(getCurrencyCodeOption);
  const selectedCurrenciesOptions = selectedCurrencies.map(getCurrencyCodeOption);

  return (
    <Pattern gap={'MD'}>
      <Pattern.Span size={7}>
        <Horizon>
          <Typography.P fill={'FAINT'}>{locale.admin.currencyRatesScroller.filter.label.rateDate}</Typography.P>
          <Gap.XS />
          <DateRange itemWidth={220} name={[FORM_FIELDS.DATE_FROM, FORM_FIELDS.DATE_TO]} />
        </Horizon>
      </Pattern.Span>
      <Pattern.Span size={5}>
        <SelectWithSearch
          name={FORM_FIELDS.CURRENCY_CODE}
          placeholder={locale.admin.currencyRatesScroller.filter.placeholder.currencyCode}
          searchOptions={currentCodeOptions}
          selectedOptions={selectedCurrenciesOptions}
          setSearchValue={setCurrencyCodeSearchValue}
        />
      </Pattern.Span>
    </Pattern>
  );
};

QuickFilter.displayName = 'QuickFilter';
