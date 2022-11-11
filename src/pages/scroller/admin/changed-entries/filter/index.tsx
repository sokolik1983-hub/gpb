import React, { useEffect, useMemo } from 'react';
import { ContentLoader, FilterLayout } from 'components/common';
import { useIsFetchedData } from 'hooks/common';
import type { IUrlParams } from 'interfaces';
import { useDebounce } from 'platform-copies/hooks';
import { useLocation, useParams } from 'react-router-dom';
import { getDateRangeValidationScheme } from 'schemas';
import type { ENTRY_SOURCE_VIEW } from 'stream-constants';
import { LINE_HEIGHT } from 'stream-constants';
import type { IFilters } from '@platform/core';
import { useFilter } from '@platform/services/admin';
import { validate } from '@platform/validation';
import { useGetCounterparties, useGetClients } from '../hooks';
import { AdditionalFilter } from './additional-filter';
import { FORM_FIELDS, getFields, STORAGE_KEY, tagLabels, ADDITIONAL_FORM_FIELDS } from './constants';
import type { IFilterContext } from './filter-context';
import { FilterContext } from './filter-context';
import { QuickFilter } from './quick-filter';
import { TagsPanel } from './tags-panel';

/** Высота фильтра. Минус разделитель снизу и вверху фильтра. */
const FILTER_HEIGHT = 58 - LINE_HEIGHT * 2;

/** Задержка установки состояния фильтров. */
const SET_FILTER_STATE_DELAY = 500;

/**
 * Схема валидации формы фильтра ЭФ "Журнал проводок".
 */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.PAYMENT_DATE_FROM, dateTo: FORM_FIELDS.PAYMENT_DATE_TO });

/** Свойства для компонента с фильтром. */
interface IProps {
  /** Устанавливает новое состояние фильтров. Используется в потребителе фильтра (скроллер проводок). */
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  /** Признак окончания загрузки проводки. */
  fetchedNewTransactions: boolean;
}

/** Компонент с фильтром для скроллера. */
export const Filter: React.FC<IProps> = ({ setFilters }) => {
  const { id } = useParams<IUrlParams>();

  const { state: { entrySourceView } = {} } = useLocation<{ entrySourceView?: typeof ENTRY_SOURCE_VIEW }>();
  const fields = getFields(entrySourceView);
  const { filterPanel, filterValues, tagsPanel } = useFilter({
    fields,
    labels: tagLabels,
    storageKey: `${STORAGE_KEY}-${id}`,
  });

  const filterValuesDebounced = useDebounce(filterValues, SET_FILTER_STATE_DELAY);
  // Вызывается один раз.
  const { data: counterparties, isFetched: isCounterpartiesFetched } = useGetCounterparties();
  // Вызывается один раз.
  const { data: clients, isFetched: isClientsFetched } = useGetClients();

  const counterpartiesFetched = useIsFetchedData(isCounterpartiesFetched);
  const clientsFetched = useIsFetchedData(isClientsFetched);
  const dataFetched = counterpartiesFetched && clientsFetched;

  /** Функция передачи фильтров в родительский компонент. */
  useEffect(() => {
    setFilters(filterValuesDebounced);
  }, [setFilters, filterValuesDebounced]);

  const contextValue: IFilterContext = useMemo<IFilterContext>(
    () => ({
      clients,
      counterparties,
      filterPanel,
      tagsPanel,
    }),
    [clients, counterparties, filterPanel, tagsPanel]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      <ContentLoader height={FILTER_HEIGHT} loading={!dataFetched}>
        <FilterLayout
          AdditionalFilter={AdditionalFilter}
          QuickFilter={QuickFilter}
          TagsPanel={TagsPanel}
          additionalFilterFields={ADDITIONAL_FORM_FIELDS}
          filterFields={fields}
          filterState={filterPanel}
          tagsState={tagsPanel}
          validate={validate(validationSchema)}
        />
      </ContentLoader>
    </FilterContext.Provider>
  );
};
