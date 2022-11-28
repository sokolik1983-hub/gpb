import type { FC } from 'react';
import React, { useCallback, useContext, useMemo } from 'react';
import { useDatePeriod, useSubmitScrollerFilter } from 'hooks/common';
import { locale } from 'localization';
import { BranchOption } from 'pages/scroller/admin/closed-days/filter/branch-option';
import { FORM_FIELDS } from 'pages/scroller/admin/closed-days/filter/constants';
import { FilterContext } from 'pages/scroller/admin/closed-days/filter/context';
import type { FilterValues } from 'pages/scroller/admin/closed-days/filter/types';
import { getBranchOption } from 'pages/scroller/admin/closed-days/filter/utils';
import { useForm, useFormState } from 'react-final-form';
import { getDatePeriod } from 'utils/common/get-date-period';
import { Fields, Pattern } from '@platform/ui';

/** Основной фильтр. Изменения значений этих полей вызывают обновление скроллера. */
export const QuickFilter: FC = () => {
  const { change } = useForm();
  const { values } = useFormState<FilterValues>();

  useSubmitScrollerFilter<FilterValues>({ submitDep: values });

  const { allBranches, setDatePeriodFetched } = useContext(FilterContext);

  const branchOptions = useMemo(() => allBranches.map(getBranchOption), [allBranches]);

  const { DateRange, DatePeriodType } = useDatePeriod({
    fetch: getDatePeriod,
    fieldName: { dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO, periodType: FORM_FIELDS.PERIOD_TYPE },
    onCalculateFinal: setDatePeriodFetched,
  });

  /** Метод очищения поля выбора филиала. */
  const handleClearBranch = useCallback(() => change(FORM_FIELDS.BRANCH_CODE, ''), [change]);

  /** Метод фильтрации списка выбора филилала. */
  const handleSearchBranch = useCallback(
    (searchValue: string) => {
      if (!searchValue) {
        return branchOptions;
      }

      return branchOptions.filter(({ branchCode, label }) => {
        const formatSearchValue = searchValue.toLowerCase();

        return label.toLowerCase().includes(formatSearchValue) || branchCode.toLowerCase().includes(formatSearchValue);
      });
    },
    [branchOptions]
  );

  return (
    <Pattern gap={'MD'}>
      <Pattern.Span size={7}>
        <Pattern gap={'MD'}>
          <Pattern.Span size={4}>
            <DatePeriodType />
          </Pattern.Span>
          <Pattern.Span size={8}>
            <DateRange />
          </Pattern.Span>
        </Pattern>
      </Pattern.Span>
      <Pattern.Span size={5}>
        <Fields.Select
          extraSmall
          useClearBtn
          useClearBtnInSearch
          withSearch
          filterFn={handleSearchBranch}
          name={FORM_FIELDS.BRANCH_CODE}
          optionTemplate={BranchOption}
          options={branchOptions}
          placeholder={locale.admin.closedDaysScroller.filter.placeholder.branch}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onClearClick={handleClearBranch}
        />
      </Pattern.Span>
    </Pattern>
  );
};

QuickFilter.displayName = 'QuickFilter';
