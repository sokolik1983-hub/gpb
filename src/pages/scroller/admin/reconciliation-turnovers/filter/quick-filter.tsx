import type { FC } from 'react';
import React, { useContext, useMemo } from 'react';
import { AccountOption } from 'components/common/accounts-field/account-option';
import { DateRange } from 'components/common/form/date-range';
import { SelectWithSearch } from 'components/common/select-with-search';
import { useSubmitScrollerFilter } from 'hooks/common';
import { locale } from 'localization';
import { FORM_FIELDS, RECONCILIATION_STATUS_OPTIONS } from 'pages/scroller/admin/reconciliation-turnovers/filter/constants';
import { FilterContext } from 'pages/scroller/admin/reconciliation-turnovers/filter/context';
import type { FilterValues } from 'pages/scroller/admin/reconciliation-turnovers/filter/types';
import { useFormState } from 'react-final-form';
import { getAccountOption } from 'utils/common';
import { Fields, Gap, Horizon, Pattern, Typography } from '@platform/ui';

/** Основной фильтр. Изменения значений этих полей вызывают обновление скроллера. */
export const QuickFilter: FC = () => {
  const { accounts, selectedAccounts, setAccountSearchValue } = useContext(FilterContext);

  const accountOptions = useMemo(() => accounts.map(getAccountOption), [accounts]);
  const selectedAccountOptions = useMemo(() => selectedAccounts.map(getAccountOption), [selectedAccounts]);

  const { values } = useFormState<FilterValues>();

  useSubmitScrollerFilter<FilterValues>({ submitDep: values });

  return (
    <Pattern gap={'MD'}>
      <Pattern.Span size={6}>
        <Horizon>
          <Typography.P fill={'FAINT'}>{locale.admin.reconciliationTurnoversScroller.filter.label.operationDate}</Typography.P>
          <Gap.XS />
          <DateRange name={[FORM_FIELDS.DATE_FROM, FORM_FIELDS.DATE_TO]} />
        </Horizon>
      </Pattern.Span>
      <Pattern.Span size={3}>
        <Fields.Select
          extraSmall
          name={FORM_FIELDS.STATUS}
          options={RECONCILIATION_STATUS_OPTIONS}
          placeholder={locale.admin.reconciliationTurnoversScroller.filter.placeholder.status}
        />
      </Pattern.Span>
      <Pattern.Span size={3}>
        <SelectWithSearch
          name={FORM_FIELDS.ACCOUNT_ID}
          optionTemplate={AccountOption}
          placeholder={locale.admin.reconciliationTurnoversScroller.filter.placeholder.account}
          searchOptions={accountOptions}
          selectedOptions={selectedAccountOptions}
          setSearchValue={setAccountSearchValue}
        />
      </Pattern.Span>
    </Pattern>
  );
};

QuickFilter.displayName = 'QuickFilter';
