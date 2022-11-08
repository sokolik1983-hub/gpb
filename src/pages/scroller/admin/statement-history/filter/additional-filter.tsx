import type { FC } from 'react';
import React, { useContext, useMemo } from 'react';
import { FilterFormElement, MultiselectWithOptionAllField, SelectWithSearch } from 'components/common';
import { locale } from 'localization';
import { StatementHistoryScrollerContext } from 'pages/scroller/admin/statement-history/context';
import { DATE_PERIOD_OPTIONS } from 'stream-constants';
import { Pattern, Fields } from '@platform/ui';
import { FORM_FIELDS, REQUEST_STATUS_OPTIONS, STATEMENT_STATUS_OPTIONS, STATEMENT_TYPE_OPTIONS } from './constants';
import { OrganizationOption } from './organization-option';
import { getOrganizationOption, getServiceBranchOption, getUserOption } from './utils';

/** Дополнительный фильтр, который виден при раскрытии формы. */
export const AdditionalFilter: FC = () => {
  const {
    organizations,
    serviceBranches,
    selectedOrganizations,
    selectedUsers,
    setOrganizationSearchValue,
    setUserSearchValue,
    users,
  } = useContext(StatementHistoryScrollerContext);

  const organizationOptions = useMemo(() => organizations.map(getOrganizationOption), [organizations]);
  const selectedOrganizationOptions = useMemo(() => selectedOrganizations.map(getOrganizationOption), [selectedOrganizations]);

  const userOptions = useMemo(() => users.map(getUserOption), [users]);
  const selectedUserOptions = useMemo(() => selectedUsers.map(getUserOption), [selectedUsers]);

  const serviceBranchOptions = useMemo(() => serviceBranches.map(getServiceBranchOption), [serviceBranches]);

  return (
    <>
      <Pattern gap={'XL'}>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.organization}>
            <SelectWithSearch
              multi
              name={FORM_FIELDS.ORGANIZATION_IDS}
              optionTemplate={OrganizationOption}
              placeholder={locale.admin.historyScroller.filter.placeholder.organization}
              searchOptions={organizationOptions}
              selectedOptions={selectedOrganizationOptions}
              setSearchValue={setOrganizationSearchValue}
            />
          </FilterFormElement>
        </Pattern.Span>

        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.period}>
            <Fields.MultiSelect extraSmall name={FORM_FIELDS.PERIOD} options={DATE_PERIOD_OPTIONS} />
          </FilterFormElement>
        </Pattern.Span>
      </Pattern>

      <Pattern gap={'XL'}>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.requestStatus}>
            <MultiselectWithOptionAllField name={FORM_FIELDS.REQUEST_STATUS} options={REQUEST_STATUS_OPTIONS} />
          </FilterFormElement>
        </Pattern.Span>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.signaturePresence}>
            <Fields.Checkbox name={FORM_FIELDS.SIGNED} />
          </FilterFormElement>
        </Pattern.Span>
      </Pattern>

      <Pattern gap={'XL'}>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.statementStatus}>
            <MultiselectWithOptionAllField name={FORM_FIELDS.STATEMENT_STATUS} options={STATEMENT_STATUS_OPTIONS} />
          </FilterFormElement>
        </Pattern.Span>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.statementType}>
            <Fields.Select extraSmall name={FORM_FIELDS.STATEMENT_TYPE} options={STATEMENT_TYPE_OPTIONS} />
          </FilterFormElement>
        </Pattern.Span>
      </Pattern>

      <Pattern gap={'XL'}>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.user}>
            <SelectWithSearch
              multi
              name={FORM_FIELDS.USER_IDS}
              searchOptions={userOptions}
              selectedOptions={selectedUserOptions}
              setSearchValue={setUserSearchValue}
            />
          </FilterFormElement>
        </Pattern.Span>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.serviceBranch}>
            <Fields.MultiSelect extraSmall withSearch name={FORM_FIELDS.SERVICE_BRANCH_IDS} options={serviceBranchOptions} />
          </FilterFormElement>
        </Pattern.Span>
      </Pattern>
    </>
  );
};

AdditionalFilter.displayName = 'AdditionalFilter';
