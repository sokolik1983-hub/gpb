import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import { ContentLoader, FilterLayout } from 'components/common';
import { useCurrencies, useDebounceFilter } from 'hooks/admin';
import { useIsFetchedData } from 'hooks/common';
import type { ScrollerFilter } from 'interfaces';
import { FORM_FIELDS, STORAGE_KEY, fields } from 'pages/scroller/admin/currency-rates/filter/constants';
import { FilterContext } from 'pages/scroller/admin/currency-rates/filter/context';
import type { FilterContextProps } from 'pages/scroller/admin/currency-rates/filter/context';
import { QuickFilter } from 'pages/scroller/admin/currency-rates/filter/quick-filter';
import { useDebounce } from 'platform-copies/hooks';
import { getDateRangeValidationScheme } from 'schemas';
import { DELAY, QUICK_FILTER_HEIGHT } from 'stream-constants';
import { useFilter } from '@platform/services';
import { validate } from '@platform/validation';

/** Схема валидации формы фильтра. */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO });

/** Форма фильтрации скроллера закрытых дней. */
export const Filter: FC<ScrollerFilter> = ({ setFilter }) => {
  const [currencyCodeSearchValue, setCurrencyCodeSearchValue] = useState('');

  const { filterPanel, filterValues } = useFilter({ fields, labels: {}, storageKey: STORAGE_KEY });

  useDebounceFilter({ filterValues, setFilter });

  const selectedCurrencyCode = filterValues?.[FORM_FIELDS.CURRENCY_CODE]?.value;
  const { data: selectedCurrencies, isFetched: isSelectedCurrenciesFetched } = useCurrencies({
    code: selectedCurrencyCode,
    selected: true,
  });

  const currencyCodeSearchValueDebounced = useDebounce(currencyCodeSearchValue, DELAY);
  const { data: currencies, isFetched: isCurrenciesFetched } = useCurrencies({ code: currencyCodeSearchValueDebounced });

  const selectedCurrenciesFetched = useIsFetchedData(isSelectedCurrenciesFetched);
  const currenciesFetched = useIsFetchedData(isCurrenciesFetched);

  const contextValue: FilterContextProps = useMemo(() => ({ currencies, selectedCurrencies, setCurrencyCodeSearchValue }), [
    currencies,
    selectedCurrencies,
    setCurrencyCodeSearchValue,
  ]);

  return (
    <FilterContext.Provider value={contextValue}>
      <ContentLoader height={QUICK_FILTER_HEIGHT} loading={!(currenciesFetched && selectedCurrenciesFetched)}>
        <FilterLayout QuickFilter={QuickFilter} filterFields={fields} filterState={filterPanel} validate={validate(validationSchema)} />
      </ContentLoader>
    </FilterContext.Provider>
  );
};
