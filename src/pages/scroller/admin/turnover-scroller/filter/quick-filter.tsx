import React, { useContext, useMemo } from 'react';
import { SelectWithSearch } from 'components/common';
import { DateRange } from 'components/common/form/date-range';
import { useSubmitScrollerFilter } from 'hooks/common';
import type { QuickFilterPanelProps } from 'interfaces/admin';
import { locale } from 'localization';
import { AccountOption } from 'pages/form/client/components/accounts-field/account-option';
import { useFormState } from 'react-final-form';
import { Box, Gap, Typography } from '@platform/ui';
import { FORM_FIELDS } from './constants';
import { FilterContext } from './context';
import { OrganizationOption } from './organization-option';
import css from './styles.scss';
import type { FilterValues } from './types';
import { getOrganizationOption, getAccountOption } from './utils';

/**
 * Основной фильтр, который всегда виден.
 * Изменения значений этих полей вызывают обновление скроллера, без нажатия кнопки применения фильтра.
 */
export const QuickFilter: React.FC<QuickFilterPanelProps> = ({ applyMixValuesFormAndStorage }) => {
  const {
    accounts,
    selectedAccounts,
    selectedOrganizations,
    organizations,
    setAccountSearchValue,
    setOrganizationSearchValue,
  } = useContext(FilterContext);

  const { values } = useFormState<FilterValues>();

  const { accountNumbers, dateFrom, dateTo, bankClientIds } = values;

  useSubmitScrollerFilter({ applyMixValuesFormAndStorage, submitDep: { accountNumbers, dateFrom, dateTo, bankClientIds } });

  const accountOptions = useMemo(() => accounts.map(getAccountOption), [accounts]);
  const selectedAccountOptions = useMemo(() => selectedAccounts.map(getAccountOption), [selectedAccounts]);
  const organizationOptions = useMemo(() => organizations.map(getOrganizationOption), [organizations]);
  const selectedOrganizationOptions = useMemo(() => selectedOrganizations.map(getOrganizationOption), [selectedOrganizations]);

  return (
    <Box className={css.container}>
      <Typography.P fill="FAINT" line="NOWRAP">
        {locale.admin.turnoverScroller.filter.labels.operationDate}
      </Typography.P>
      <Gap.XS />
      <DateRange name={[FORM_FIELDS.DATE_FROM, FORM_FIELDS.DATE_TO]} />
      <Gap />
      <Box className={css.org}>
        <SelectWithSearch
          multi
          name={FORM_FIELDS.BANK_CLIENT_IDS}
          optionTemplate={OrganizationOption}
          placeholder={locale.admin.turnoverScroller.filter.placeholders.organization}
          searchOptions={organizationOptions}
          selectedOptions={selectedOrganizationOptions}
          setSearchValue={setOrganizationSearchValue}
        />
      </Box>
      <Gap />
      <Box className={css.account}>
        <SelectWithSearch
          multi
          name={FORM_FIELDS.ACCOUNT_NUMBERS}
          optionTemplate={AccountOption}
          placeholder={locale.admin.turnoverScroller.filter.placeholders.account}
          searchOptions={accountOptions}
          selectedOptions={selectedAccountOptions}
          setSearchValue={setAccountSearchValue}
        />
      </Box>
    </Box>
  );
};

QuickFilter.displayName = 'QuickFilter';
