import React, { useMemo, useState } from 'react';
import { ContentLoader, FilterLayout } from 'components/common';
import { FocusNode } from 'components/common/focus-tree';
import { useAccounts, useAccountsByIds, useDebounceFilter, useOrganizations, useOrganizationsByIds } from 'hooks/admin';
import { useIsFetchedData } from 'hooks/common';
import type { IFilterPanel, ScrollerFilter } from 'interfaces';
import { useDebounce } from 'platform-copies/hooks';
import { getDateRangeValidationScheme } from 'schemas';
import { DELAY, QUICK_FILTER_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE, HISTORY_SCROLLER_FILTER_NODE } from 'stream-constants/a11y-nodes';
import { getAccountSearchFilter, getOrganizationSearchFilter } from 'utils/admin';
import { useFilter } from '@platform/services';
import { validate } from '@platform/validation';
import { STORAGE_KEY } from '../constants';
import { FORM_FIELDS, fields } from './constants';
import { FilterContext } from './context';
import { QuickFilter } from './quick-filter';
import type { FilterValues } from './types';

/** Схема валидации формы фильтра. */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO });

/** Форма фильтрации. */
export const Filter: React.FC<ScrollerFilter> = ({ setFilter }) => {
  const [accountSearchValue, setAccountSearchValue] = useState('');
  const [organizationSearchValue, setOrganizationSearchValue] = useState('');

  const { filterPanel, filterValues } = useFilter({ fields, labels: {}, storageKey: STORAGE_KEY });

  useDebounceFilter({ filterValues, setFilter });

  // Получение счетов.
  const selectedAccountIds = filterValues?.[FORM_FIELDS.ACCOUNT_NUMBERS]?.value || [];
  const { data: selectedAccounts, isFetched: isSelectedAccountsFetched } = useAccountsByIds(selectedAccountIds);

  const accountSearchValueDebounced = useDebounce(accountSearchValue, DELAY);
  const { data: accounts, isFetched: isAccountsFetched } = useAccounts(getAccountSearchFilter(accountSearchValueDebounced));

  const accountsFetched = useIsFetchedData(isAccountsFetched);
  const selectedAccountsFetched = useIsFetchedData(isSelectedAccountsFetched);

  // Получение организаций.
  const selectedOrganizationIds = filterValues?.[FORM_FIELDS.BANK_CLIENT_IDS]?.value || [];
  const { data: selectedOrganizations } = useOrganizationsByIds(selectedOrganizationIds);

  const organizationSearchValueDebounced = useDebounce(organizationSearchValue, DELAY);
  const { data: organizations } = useOrganizations(getOrganizationSearchFilter(organizationSearchValueDebounced));

  const loading = selectedAccountIds.length > 0 ? !(selectedAccountsFetched && accountsFetched) : !accountsFetched;

  const contextValue = useMemo(
    () => ({
      accounts,
      filterPanel: (filterPanel as unknown) as IFilterPanel<FilterValues>,
      organizations,
      selectedAccounts,
      selectedOrganizations,
      setAccountSearchValue,
      setOrganizationSearchValue,
    }),
    [accounts, filterPanel, organizations, selectedAccounts, selectedOrganizations]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      <FocusNode hidden nodeId={HISTORY_SCROLLER_FILTER_NODE} parentId={COMMON_SCROLLER_NODE}>
        <ContentLoader height={QUICK_FILTER_HEIGHT} loading={loading}>
          <FilterLayout QuickFilter={QuickFilter} filterFields={fields} filterState={filterPanel} validate={validate(validationSchema)} />
        </ContentLoader>
      </FocusNode>
    </FilterContext.Provider>
  );
};

Filter.displayName = 'Filter';
