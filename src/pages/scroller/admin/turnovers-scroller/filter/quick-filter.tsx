import type { FC } from 'react';
import React, { useContext, useMemo } from 'react';
import { SelectWithSearch } from 'components/common';
import { AccountOption } from 'components/common/accounts-field/account-option';
import { DateRange } from 'components/common/form/date-range';
import { useSubmitScrollerFilter } from 'hooks/common';
import type { QuickFilterPanelProps } from 'interfaces/admin';
import { locale } from 'localization';
import { OrganizationOption } from 'pages/scroller/admin/statements/components/filter/organization-option';
import { getOrganizationOption } from 'pages/scroller/admin/statements/components/filter/utils';
import { useFormState } from 'react-final-form';
import { getAccountOption } from 'utils/common';
import { Gap, Horizon, Pattern, Typography } from '@platform/ui';
import { FORM_FIELDS } from './constants';
import { FilterContext } from './context';
import type { FilterValues } from './types';

/**
 * Основной фильтр, который всегда виден.
 * Изменения значений этих полей вызывают обновление скроллера, без нажатия кнопки применения фильтра.
 */
export const QuickFilter: FC<QuickFilterPanelProps> = ({ applyMixValuesFormAndStorage }) => {
  const {
    accounts,
    selectedAccounts,
    selectedOrganizations,
    organizations,
    setAccountSearchValue,
    setOrganizationSearchValue,
  } = useContext(FilterContext);

  const { values } = useFormState<FilterValues>();

  const { accountIds, dateFrom, dateTo } = values;

  useSubmitScrollerFilter({ applyMixValuesFormAndStorage, submitDep: { accountIds, dateFrom, dateTo } });

  const accountOptions = useMemo(() => accounts.map(getAccountOption), [accounts]);
  const selectedAccountOptions = useMemo(() => selectedAccounts.map(getAccountOption), [selectedAccounts]);
  const organizationOptions = useMemo(() => organizations.map(getOrganizationOption), [organizations]);
  const selectedOrganizationOptions = useMemo(() => selectedOrganizations.map(getOrganizationOption), [selectedOrganizations]);

  return (
    <Pattern gap={'MD'}>
      <Pattern.Span size={4}>
        <Horizon>
          <Typography.P fill="FAINT">{locale.admin.turnoverScroller.filter.labels.operationDate}</Typography.P>
          <Gap.XS />
          <DateRange name={[FORM_FIELDS.DATE_FROM, FORM_FIELDS.DATE_TO]} />
        </Horizon>
      </Pattern.Span>
      <Pattern.Span size={4}>
        <SelectWithSearch
          multi
          name={FORM_FIELDS.ORGANIZATION_IDS}
          optionTemplate={OrganizationOption}
          placeholder={locale.admin.turnoverScroller.filter.placeholders.organization}
          searchOptions={organizationOptions}
          selectedOptions={selectedOrganizationOptions}
          setSearchValue={setOrganizationSearchValue}
        />
      </Pattern.Span>
      <Pattern.Span size={4}>
        <SelectWithSearch
          multi
          name={FORM_FIELDS.ACCOUNT_IDS}
          optionTemplate={AccountOption}
          placeholder={locale.admin.turnoverScroller.filter.placeholders.account}
          searchOptions={accountOptions}
          selectedOptions={selectedAccountOptions}
          setSearchValue={setAccountSearchValue}
        />
      </Pattern.Span>
    </Pattern>
  );
};

QuickFilter.displayName = 'QuickFilter';
