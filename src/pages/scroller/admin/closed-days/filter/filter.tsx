import type { FC } from 'react';
import React, { useEffect, useMemo } from 'react';
import { ContentLoader, FilterLayout } from 'components/common';
import { useServiceBranches } from 'hooks/admin';
import type { FilterProps } from 'interfaces';
import { FORM_FIELDS, STORAGE_KEY, fields } from 'pages/scroller/admin/closed-days/filter/constants';
import type { FilterContextProps } from 'pages/scroller/admin/closed-days/filter/context';
import { FilterContext } from 'pages/scroller/admin/closed-days/filter/context';
import { QuickFilter } from 'pages/scroller/admin/closed-days/filter/quick-filter';
import { useDebounce } from 'platform-copies/hooks';
import { getDateRangeValidationScheme } from 'schemas';
import { useFilter } from '@platform/services';
import { validate } from '@platform/validation';

/** Высота фильтра. */
export const FILTER_HEIGHT = 58;

/** Схема валидации формы фильтра. */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO });

/** Форма фильтрации скроллера закрытых дней. */
export const Filter: FC<FilterProps> = ({ setFilter }) => {
  const { filterPanel, filterValues } = useFilter({ fields, labels: {}, storageKey: STORAGE_KEY });

  const filterValuesDebounced = useDebounce(filterValues, 300);

  useEffect(() => {
    setFilter(filterValuesDebounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValuesDebounced]);

  const { data: branches, isFetching: isBranchesFetching } = useServiceBranches();

  const contextValue: FilterContextProps = useMemo(() => ({ branches }), [branches]);

  return (
    <FilterContext.Provider value={contextValue}>
      <ContentLoader height={FILTER_HEIGHT} loading={isBranchesFetching}>
        <FilterLayout QuickFilter={QuickFilter} filterFields={fields} filterState={filterPanel} validate={validate(validationSchema)} />
      </ContentLoader>
    </FilterContext.Provider>
  );
};
