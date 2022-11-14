import type { FC } from 'react';
import React, { useContext, useMemo } from 'react';
import { useDatePeriod, useSubmitScrollerFilter } from 'hooks/common';
import { locale } from 'localization';
import { ClosedDaysContext } from 'pages/scroller/admin/closed-days/context';
import { BranchOption } from 'pages/scroller/admin/closed-days/filter/branch-option';
import { FORM_FIELDS } from 'pages/scroller/admin/closed-days/filter/constants';
import { FilterContext } from 'pages/scroller/admin/closed-days/filter/context';
import type { FilterValues } from 'pages/scroller/admin/closed-days/filter/types';
import { getBranchOption } from 'pages/scroller/admin/closed-days/filter/utils';
import { useFormState } from 'react-final-form';
import { statementService } from 'services/admin';
import { Fields, Pattern } from '@platform/ui';

/** Основной фильтр. Изменения значений этих полей вызывают обновление скроллера. */
export const QuickFilter: FC = () => {
  const { values } = useFormState<FilterValues>();

  useSubmitScrollerFilter<FilterValues>({ submitDep: values });

  const { branches } = useContext(FilterContext);
  const { setDatePeriodFetched } = useContext(ClosedDaysContext);

  const branchOptions = useMemo(() => branches.map(getBranchOption), [branches]);

  const { DateRange, DatePeriodType } = useDatePeriod({
    fetch: statementService.getDatePeriod,
    fieldName: { dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO, periodType: FORM_FIELDS.PERIOD_TYPE },
    onCalculateFinal: setDatePeriodFetched,
  });

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
          withSearch
          name={FORM_FIELDS.BRANCH_ID}
          optionTemplate={BranchOption}
          options={branchOptions}
          placeholder={locale.admin.closedDaysScroller.filter.placeholder.branch}
        />
      </Pattern.Span>
    </Pattern>
  );
};

QuickFilter.displayName = 'QuickFilter';
