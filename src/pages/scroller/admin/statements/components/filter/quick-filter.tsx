import type { FC } from 'react';
import React, { useContext, useMemo } from 'react';
import { SelectWithSearch } from 'components/common';
import { AccountOption } from 'components/common/accounts-field/account-option';
import { useDatePeriod, useSubmitScrollerFilter } from 'hooks/common';
import type { QuickFilterPanelProps } from 'interfaces/admin';
import { locale } from 'localization';
import { FORM_FIELDS } from 'pages/scroller/admin/statements/components/filter/constants';
import { FilterContext } from 'pages/scroller/admin/statements/components/filter/context';
import type { FilterValues } from 'pages/scroller/admin/statements/components/filter/types';
import { useFormState } from 'react-final-form';
import { statementService } from 'services/admin';
import { getAccountOption } from 'utils/common';
import { Pattern } from '@platform/ui';

/**
 * Основной фильтр, который всегда виден.
 * Изменения значений этих полей вызывают обновление скроллера, без нажатия кнопки применения фильтра.
 */
export const QuickFilter: FC<QuickFilterPanelProps> = ({ applyMixValuesFormAndStorage }) => {
  const { accounts, selectedAccounts, setAccountSearchValue, setDatePeriodFetched } = useContext(FilterContext);

  const { values } = useFormState<FilterValues>();

  const { accountIds, dateFrom, dateTo } = values;

  const { DateRange, DatePeriodType } = useDatePeriod({
    fetch: statementService.getDatePeriod,
    fieldName: { dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO, periodType: FORM_FIELDS.PERIOD_TYPE },
    onCalculateFinal: setDatePeriodFetched,
  });

  useSubmitScrollerFilter({ applyMixValuesFormAndStorage, submitDep: { accountIds, dateFrom, dateTo } });

  const accountOptions = useMemo(() => accounts.map(getAccountOption), [accounts]);
  const selectedAccountOptions = useMemo(() => selectedAccounts.map(getAccountOption), [selectedAccounts]);

  return (
    <Pattern gap={'MD'}>
      <Pattern.Span size={8}>
        <Pattern gap={'MD'}>
          <Pattern.Span size={4}>
            <DatePeriodType />
          </Pattern.Span>
          <Pattern.Span size={8}>
            <DateRange />
          </Pattern.Span>
        </Pattern>
      </Pattern.Span>
      <Pattern.Span size={4}>
        <SelectWithSearch
          multi
          name={FORM_FIELDS.ACCOUNT_IDS}
          optionTemplate={AccountOption}
          placeholder={locale.admin.statementScroller.filter.placeholder.account}
          searchOptions={accountOptions}
          selectedOptions={selectedAccountOptions}
          setSearchValue={setAccountSearchValue}
        />
      </Pattern.Span>
    </Pattern>
  );
};

QuickFilter.displayName = 'QuickFilter';
