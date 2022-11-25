import type { FC } from 'react';
import React, { useContext } from 'react';
import { useDatePeriod, useSubmitScrollerFilter } from 'hooks/common';
import { locale } from 'localization';
import { FORM_FIELDS, MAINTENANCE_TYPE_OPTIONS } from 'pages/scroller/admin/maintenance/filter/constants';
import { FilterContext } from 'pages/scroller/admin/maintenance/filter/context';
import type { FilterValues } from 'pages/scroller/admin/maintenance/filter/types';
import { useFormState } from 'react-final-form';
import { getDatePeriod } from 'utils/common/get-date-period';
import { Fields, Pattern } from '@platform/ui';

/** Основной фильтр. Изменения значений этих полей вызывают обновление скроллера. */
export const QuickFilter: FC = () => {
  const { values } = useFormState<FilterValues>();


  useSubmitScrollerFilter<FilterValues>({
    submitDep: {
      dateTo: values.dateTo || '',
      dateFrom: values.dateFrom || '',
      maintenanceTypeDto: values.maintenanceTypeDto || '',
      periodType: values.periodType || '',
    },
  });

  const { setDatePeriodFetched } = useContext(FilterContext);

  const { DateRange, DatePeriodType } = useDatePeriod({
    fetch: getDatePeriod,
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
          name={FORM_FIELDS.MAINTENANCE_TYPE}
          options={MAINTENANCE_TYPE_OPTIONS}
          placeholder={locale.admin.maintenanceScroller.filter.placeholder.maintenanceType}
        />
      </Pattern.Span>
    </Pattern>
  );
};

QuickFilter.displayName = 'QuickFilter';
