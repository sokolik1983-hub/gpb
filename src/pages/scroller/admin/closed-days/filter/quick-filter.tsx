import type { FC } from 'react';
import React, { useContext, useEffect, useMemo } from 'react';
import { useDatePeriod } from 'hooks/common';
import { locale } from 'localization';
import { ClosedDaysContext } from 'pages/scroller/admin/closed-days/context';
import { BranchOption } from 'pages/scroller/admin/closed-days/filter/branch-option';
import { FORM_FIELDS } from 'pages/scroller/admin/closed-days/filter/constants';
import { FilterContext } from 'pages/scroller/admin/closed-days/filter/context';
import type { FilterValues } from 'pages/scroller/admin/closed-days/filter/types';
import { getBranchOption } from 'pages/scroller/admin/closed-days/filter/utils';
import { useForm, useFormState } from 'react-final-form';
import { statementService } from 'services/admin';
import { Fields, Pattern } from '@platform/ui';

/** Основной фильтр. Изменения значений этих полей вызывают обновление скроллера. */
export const QuickFilter: FC = () => {
  const { branches } = useContext(FilterContext);
  const { setDatePeriodFetched } = useContext(ClosedDaysContext);

  const branchOptions = useMemo(() => branches.map(getBranchOption), [branches]);

  const { submit } = useForm();
  const { valid, values } = useFormState<FilterValues>();

  useEffect(() => {
    if (valid) {
      void submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

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