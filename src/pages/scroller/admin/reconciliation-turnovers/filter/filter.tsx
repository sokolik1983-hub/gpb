import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import { ContentLoader, FilterLayout } from 'components/common';
import { useAccounts, useAccountsByIds, useDebounceFilter } from 'hooks/admin';
import { useIsFetchedData } from 'hooks/common';
import type { ScrollerFilter } from 'interfaces';
import { FORM_FIELDS, STORAGE_KEY, fields } from 'pages/scroller/admin/reconciliation-turnovers/filter/constants';
import type { FilterContextProps } from 'pages/scroller/admin/reconciliation-turnovers/filter/context';
import { FilterContext } from 'pages/scroller/admin/reconciliation-turnovers/filter/context';
import { QuickFilter } from 'pages/scroller/admin/reconciliation-turnovers/filter/quick-filter';
import { useDebounce } from 'platform-copies/hooks';
import { getDateRangeValidationScheme } from 'schemas/admin';
import { DELAY, QUICK_FILTER_HEIGHT } from 'stream-constants';
import { getAccountSearchFilter } from 'utils/admin';
import { useFilter } from '@platform/services';
import { validate } from '@platform/validation';

/** Схема валидации формы фильтра. */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO });

/** Форма фильтрации скроллера закрытых дней. */
export const Filter: FC<ScrollerFilter> = ({ setFilter }) => {
  const [accountSearchValue, setAccountSearchValue] = useState('');

  const { filterPanel, filterValues } = useFilter({ fields, labels: {}, storageKey: STORAGE_KEY });

  useDebounceFilter({ filterValues, setFilter });

  // Получение счетов.
  const selectedAccountId = filterValues?.[FORM_FIELDS.ACCOUNT_ID]?.value;
  const { data: selectedAccounts, isFetched: isSelectedAccountsFetched } = useAccountsByIds(selectedAccountId ? [selectedAccountId] : []);

  const accountSearchValueDebounced = useDebounce(accountSearchValue, DELAY);
  const { data: accounts, isFetched: isAccountsFetched } = useAccounts(getAccountSearchFilter(accountSearchValueDebounced));

  const accountsFetched = useIsFetchedData(isAccountsFetched);
  const selectedAccountsFetched = useIsFetchedData(isSelectedAccountsFetched);

  const contextValue: FilterContextProps = useMemo(() => ({ accounts, selectedAccounts, setAccountSearchValue }), [
    accounts,
    selectedAccounts,
    setAccountSearchValue,
  ]);

  return (
    <FilterContext.Provider value={contextValue}>
      <ContentLoader height={QUICK_FILTER_HEIGHT} loading={!(accountsFetched && selectedAccountsFetched)}>
        <FilterLayout QuickFilter={QuickFilter} filterFields={fields} filterState={filterPanel} validate={validate(validationSchema)} />
      </ContentLoader>
    </FilterContext.Provider>
  );
};
