import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import { ContentLoader, FilterLayout } from 'components/common';
import { FocusNode } from 'components/common/focus-tree';
import {
  useAccounts,
  useAccountsByIds,
  useDebounceFilter,
  useOrganizations,
  useOrganizationsByIds,
  useServiceBranches,
  useUsers,
  useUsersByFio,
} from 'hooks/admin';
import { useIsFetchedData } from 'hooks/common';
import type { IFilterPanel, ScrollerFilter } from 'interfaces';
import { AdditionalFilter } from 'pages/scroller/admin/statements/components/filter/additional-filter';
import { ADDITIONAL_FORM_FIELDS, fields, FORM_FIELDS, tagLabels } from 'pages/scroller/admin/statements/components/filter/constants';
import type { FilterContextProps } from 'pages/scroller/admin/statements/components/filter/context';
import { FilterContext } from 'pages/scroller/admin/statements/components/filter/context';
import { QuickFilter } from 'pages/scroller/admin/statements/components/filter/quick-filter';
import { TagsPanel } from 'pages/scroller/admin/statements/components/filter/tags-panel';
import type { FilterValues } from 'pages/scroller/admin/statements/components/filter/types';
import { useDebounce } from 'platform-copies/hooks';
import { getDateRangeValidationScheme } from 'schemas/admin';
import { DELAY, QUICK_FILTER_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE, HISTORY_SCROLLER_FILTER_NODE } from 'stream-constants/a11y-nodes';
import { getAccountSearchFilter, getOrganizationSearchFilter } from 'utils/admin';
import { useFilter } from '@platform/services';
import { validate } from '@platform/validation';

/** Свойства фильтра. */
interface FilterProps extends ScrollerFilter {
  /** Устанавливает признак завершения расчитывания периода. */
  setDatePeriodFetched(): void;
  /** Ключ в Session Storage, по которому хранится состояние фильтра. */
  storageKey: string;
}

/** Схема валидации формы фильтра. */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO });

/** Форма фильтрации. */
export const Filter: FC<FilterProps> = ({ setFilter, setDatePeriodFetched, storageKey }) => {
  const [accountSearchValue, setAccountSearchValue] = useState('');
  const [organizationSearchValue, setOrganizationSearchValue] = useState('');
  const [userSearchValue, setUserSearchValue] = useState('');

  const { filterPanel, filterValues, tagsPanel } = useFilter({ fields, labels: tagLabels, storageKey });

  useDebounceFilter({ filterValues, setFilter });

  // Получение счетов.
  const selectedAccountIds = filterValues?.[FORM_FIELDS.ACCOUNT_IDS]?.value || [];
  const { data: selectedAccounts, isFetched: isSelectedAccountsFetched } = useAccountsByIds(selectedAccountIds);

  const accountSearchValueDebounced = useDebounce(accountSearchValue, DELAY);
  const { data: accounts, isFetched: isAccountsFetched } = useAccounts({ filter: getAccountSearchFilter(accountSearchValueDebounced) });

  const accountsFetched = useIsFetchedData(isAccountsFetched);
  const selectedAccountsFetched = useIsFetchedData(isSelectedAccountsFetched);

  // Получение организаций.
  const selectedOrganizationIds = filterValues?.[FORM_FIELDS.ORGANIZATION_IDS]?.value || [];
  const { data: selectedOrganizations } = useOrganizationsByIds(selectedOrganizationIds);

  const organizationSearchValueDebounced = useDebounce(organizationSearchValue, DELAY);
  const { data: organizations } = useOrganizations(getOrganizationSearchFilter(organizationSearchValueDebounced));

  // Получение пользователей.
  const selectedUserIds = filterValues?.[FORM_FIELDS.USER_IDS]?.value || [];
  const { data: selectedUsers } = useUsers({ ids: selectedUserIds });

  const userSearchValueDebounced = useDebounce(userSearchValue, DELAY);
  const { data: users } = useUsersByFio(userSearchValueDebounced);

  // Получение подразделений обслуживания.
  const { data: serviceBranches } = useServiceBranches();

  const loading = selectedAccountIds.length > 0 ? !(selectedAccountsFetched && accountsFetched) : !accountsFetched;

  const contextValue: FilterContextProps = useMemo(
    () => ({
      accounts,
      filterPanel: (filterPanel as unknown) as IFilterPanel<FilterValues>,
      organizations,
      selectedAccounts,
      selectedOrganizations,
      selectedUsers,
      serviceBranches,
      setAccountSearchValue,
      setDatePeriodFetched,
      setOrganizationSearchValue,
      setUserSearchValue,
      tagsPanel,
      users,
    }),
    [
      accounts,
      filterPanel,
      organizations,
      selectedAccounts,
      selectedOrganizations,
      selectedUsers,
      serviceBranches,
      setDatePeriodFetched,
      tagsPanel,
      users,
    ]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      <FocusNode hidden nodeId={HISTORY_SCROLLER_FILTER_NODE} parentId={COMMON_SCROLLER_NODE}>
        <ContentLoader height={QUICK_FILTER_HEIGHT} loading={loading}>
          <FilterLayout
            AdditionalFilter={AdditionalFilter}
            QuickFilter={QuickFilter}
            TagsPanel={TagsPanel}
            additionalFilterFields={ADDITIONAL_FORM_FIELDS}
            filterFields={fields}
            filterState={filterPanel}
            tagsState={tagsPanel}
            validate={validate(validationSchema)}
          />
        </ContentLoader>
      </FocusNode>
    </FilterContext.Provider>
  );
};

Filter.displayName = 'Filter';
