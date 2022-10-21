import React, { useEffect, useMemo, useState } from 'react';
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
import { mapClientBankResponseToFieldData } from './utils';

/** Высота фильтра. Минус разделитель снизу и вверху фильтра. */
const FILTER_HEIGHT = 58 - LINE_HEIGHT * 2;

/**
 * Схема валидации формы фильтра ЭФ "Журнал проводок".
 */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.PAYMENT_DATE_FROM, dateTo: FORM_FIELDS.PAYMENT_DATE_TO });

/** Поля фильтра для ручного ввода (необходимо для определения задержки запроса). */
const manualEntryFields = [FORM_FIELDS.TABLE_SEARCH, FORM_FIELDS.DOC_NUMBER, FORM_FIELDS.AMOUNT_FROM, FORM_FIELDS.AMOUNT_TO];

/** Свойства для компонента с фильтром. */
interface IProps {
  /** Устанавливает новое состояние фильтров. Используется в потребителе фильтра (скроллер проводок). */
  setFilters: React.Dispatch<React.SetStateAction<IFilters | undefined>>;
  /** Признак окончания загрузки проводки. */
  fetchedNewTransactions: boolean;
}

/** Компонент с фильтром для скроллера. */
export const Filter: React.FC<IProps> = ({ setFilters, fetchedNewTransactions }) => {
  const { id } = useParams<IUrlParams>();

  const { state: { entrySourceView } = {} } = useLocation<{ entrySourceView?: typeof ENTRY_SOURCE_VIEW }>();
  const [activeFieldAndValue, setActiveFieldAndValue] = useState<[string, unknown]>();
  const fields = getFields(entrySourceView);
  const { filterPanel, filterValues, tagsPanel } = useFilter({
    fields,
    labels: tagLabels,
    storageKey: `${STORAGE_KEY}-${id}`,
  });

  const delay = activeFieldAndValue && manualEntryFields.includes(activeFieldAndValue[0]) && activeFieldAndValue[1] ? 1500 : 200;
  const filterValuesDebounced = useDebounce(filterValues, delay);
  // Вызывается один раз.
  const { data: counterpartiesResponse, isError: isCounterpartiesError, isFetched: isCounterpartiesFetched } = useGetCounterparties();
  // Вызывается один раз.
  const { data: clientsResponse, isError: isClientsError, isFetched: isClientsFetched } = useGetClients();

  const counterpartiesFetched = useIsFetchedData(isCounterpartiesFetched);
  const clientsFetched = useIsFetchedData(isClientsFetched);
  const dataFetched = counterpartiesFetched && clientsFetched;

  /** Функция передачи фильтров в родительский компонент. */
  useEffect(() => {
    setFilters(filterValuesDebounced);
  }, [setFilters, filterValuesDebounced]);

  const counterpartiesData = mapClientBankResponseToFieldData(counterpartiesResponse);
  const clientsData = mapClientBankResponseToFieldData(clientsResponse);

  const contextValue: IFilterContext = useMemo<IFilterContext>(
    () => ({
      counterparties: counterpartiesData.bankClients,
      counterpartiesAccounts: counterpartiesData.accounts,
      clients: clientsData.bankClients,
      clientsAccounts: clientsData.accounts,
      filterPanel,
      tagsPanel,
    }),
    [clientsData.accounts, clientsData.bankClients, counterpartiesData.accounts, counterpartiesData.bankClients, filterPanel, tagsPanel]
  );

  if (isClientsError || isCounterpartiesError) {
    // FIXME: разобраться в 500 ошибке
    // return null;
  }

  return (
    <FilterContext.Provider value={contextValue}>
      <ContentLoader height={FILTER_HEIGHT} loading={!dataFetched}>
        <FilterLayout
          AdditionalFilter={AdditionalFilter}
          QuickFilter={props => <QuickFilter {...props} fetchedNewTransactions={fetchedNewTransactions} />}
          TagsPanel={TagsPanel}
          additionalFilterFields={ADDITIONAL_FORM_FIELDS}
          filterFields={fields}
          filterState={filterPanel}
          setActiveFieldAndValue={setActiveFieldAndValue}
          tagsState={tagsPanel}
          validate={validate(validationSchema)}
        />
      </ContentLoader>
    </FilterContext.Provider>
  );
};
