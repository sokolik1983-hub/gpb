import type { FC } from 'react';
import React, { useMemo } from 'react';
import { ContentLoader, FilterLayout } from 'components/common';
import { useDebounceFilter, useServiceBranches } from 'hooks/admin';
import type { ScrollerFilter } from 'interfaces';
import { FORM_FIELDS, STORAGE_KEY, fields } from 'pages/scroller/admin/closed-days/filter/constants';
import type { FilterContextProps } from 'pages/scroller/admin/closed-days/filter/context';
import { FilterContext } from 'pages/scroller/admin/closed-days/filter/context';
import { QuickFilter } from 'pages/scroller/admin/closed-days/filter/quick-filter';
import { getDateRangeValidationScheme } from 'schemas';
import { QUICK_FILTER_HEIGHT } from 'stream-constants';
import { useFilter } from '@platform/services';
import { validate } from '@platform/validation';

/** Схема валидации формы фильтра. */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO });

/** Форма фильтрации скроллера закрытых дней. */
export const Filter: FC<ScrollerFilter> = ({ setFilter }) => {
  const { filterPanel, filterValues } = useFilter({ fields, labels: {}, storageKey: STORAGE_KEY });

  useDebounceFilter({ filterValues, setFilter });

  const { data: branches, isFetching: isBranchesFetching } = useServiceBranches();

  const contextValue: FilterContextProps = useMemo(() => ({ branches }), [branches]);

  return (
    <FilterContext.Provider value={contextValue}>
      <ContentLoader height={QUICK_FILTER_HEIGHT} loading={isBranchesFetching}>
        <FilterLayout QuickFilter={QuickFilter} filterFields={fields} filterState={filterPanel} validate={validate(validationSchema)} />
      </ContentLoader>
    </FilterContext.Provider>
  );
};
