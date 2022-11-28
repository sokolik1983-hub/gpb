import type { FC } from 'react';
import React, { useMemo } from 'react';
import { FilterLayout } from 'components/common';
import { useDebounceFilter } from 'hooks/admin';
import type { ScrollerFilter } from 'interfaces';
import { FORM_FIELDS, STORAGE_KEY, fields } from 'pages/scroller/admin/maintenance/filter/constants';
import type { FilterContextProps } from 'pages/scroller/admin/maintenance/filter/context';
import { FilterContext } from 'pages/scroller/admin/maintenance/filter/context';
import { QuickFilter } from 'pages/scroller/admin/maintenance/filter/quick-filter';
import { getDateRangeValidationScheme } from 'schemas/admin';
import { useFilter } from '@platform/services';
import { validate } from '@platform/validation';

/** Свойства фильтра. */
interface FilterProps extends ScrollerFilter {
  /** Устанавливает признак завершения расчитывания периода. */
  setDatePeriodFetched(): void;
}

/** Схема валидации формы фильтра. */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO });

/** Форма фильтра журнала технических работ. */
export const Filter: FC<FilterProps> = ({ setDatePeriodFetched, setFilter }) => {
  const { filterPanel, filterValues } = useFilter({ fields, labels: {}, storageKey: STORAGE_KEY });

  useDebounceFilter({ filterValues, setFilter });

  const contextValue: FilterContextProps = useMemo(() => ({ setDatePeriodFetched }), [setDatePeriodFetched]);

  return (
    <FilterContext.Provider value={contextValue}>
      <FilterLayout QuickFilter={QuickFilter} filterFields={fields} filterState={filterPanel} validate={validate(validationSchema)} />
    </FilterContext.Provider>
  );
};
