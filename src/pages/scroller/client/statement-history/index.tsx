import React, { useMemo, useState } from 'react';
import { ContentLoader, FilterLayout, SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components';
import {
  useAccounts,
  useIsFetchedData,
  useScrollerPagination,
  useScrollerTabsProps,
  useStreamContentHeight,
  useTurnoverScrollerHeaderProps,
} from 'hooks';
import { useMetricPageListener } from 'hooks/metric/use-metric-page-listener';
import type { IFilterPanel } from 'interfaces';
import { Table } from 'pages/scroller/client/statement-history/table';
import { getDateRangeValidationScheme } from 'schemas';
import { DEFAULT_PAGINATION, TAB_HEIGHT } from 'stream-constants';
import type { ISortSettings } from '@platform/services';
import { FatalErrorContent, MainLayout } from '@platform/services/client';
import { Line } from '@platform/ui';
import { validate } from '@platform/validation';
import type { IFormState } from './filter';
import { ADDITIONAL_FORM_FIELDS, fields, FORM_FIELDS, QuickFilter, STORAGE_KEY, tagLabels } from './filter';
import { AdditionalFilter } from './filter/additional-filter';
import { TagsPanel } from './filter/tags-panel';
import type { IHistoryScrollerContext } from './history-scroller-context';
import { DEFAULT_SORTING, HistoryScrollerContext } from './history-scroller-context';
import { useGetStatementList } from './hooks';

/**
 * Схема валидации формы фильтра скроллера "История оборотов".
 */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO });

/** Высота фильтра. */
const FILTER_HEIGHT = 58;

/**
 * Страница скроллера выписок, вкладка: "Обороты (ОСВ)".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34448309
 */
export const StatementHistoryScrollerPage = () => {
  useMetricPageListener();

  const tabsProps = useScrollerTabsProps();

  // region элементы стейта контекста скроллера.
  const [hasError, setHasError] = useState<boolean>(false);
  const [sorting, setSorting] = useState<ISortSettings>(DEFAULT_SORTING);
  const { pagination, setPagination, filterPanel, tagsPanel, filterValues } = useScrollerPagination({
    fields,
    labels: tagLabels,
    storageKey: STORAGE_KEY,
    defaultPagination: DEFAULT_PAGINATION,
  });
  // endregion

  // Для улучшения типизации. Типу Record<string, unknown> нельзя присвоить интерфейс
  // у которого не определена "index signatures".
  const properlyTypedFilterPanel = (filterPanel as unknown) as IFilterPanel<IFormState>;

  const headerProps = useTurnoverScrollerHeaderProps();

  // Вызывается один раз.
  const { data: accounts, isError: isAccountsError, isFetched: isAccountsFetched } = useAccounts();

  const {
    data: { data: statements, total: totalStatementsAmount },
    isError: isStatementsError,
    isFetched: isStatementsFetched,
    isFetching: isStatementsFetching,
  } = useGetStatementList({ filters: filterValues, sorting, pagination });

  const accountsFetched = useIsFetchedData(isAccountsFetched);
  const statementsFetched = useIsFetchedData(isStatementsFetched);
  const dataFetched = accountsFetched && statementsFetched;

  const contextValue: IHistoryScrollerContext = useMemo(
    () => ({
      hasError: hasError || isAccountsError || isStatementsError,
      setHasError,
      statementsUpdating: statementsFetched && isStatementsFetching,
      filterPanel: properlyTypedFilterPanel,
      tagsPanel,
      accounts,
      statements,
      totalStatementsAmount,
      sorting,
      setSorting,
      pagination,
      setPagination,
      isStatementsError,
      isStatementsFetched,
    }),
    [
      accounts,
      hasError,
      isAccountsError,
      isStatementsError,
      isStatementsFetching,
      pagination,
      properlyTypedFilterPanel,
      setPagination,
      sorting,
      statements,
      statementsFetched,
      tagsPanel,
      totalStatementsAmount,
      isStatementsFetched,
    ]
  );

  const height = useStreamContentHeight();

  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT - TAB_HEIGHT - FILTER_HEIGHT;

  if (hasError || isAccountsError || isStatementsError) {
    return (
      <MainLayout>
        <FatalErrorContent />
      </MainLayout>
    );
  }

  return (
    <HistoryScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <ScrollerPageLayout categoryTabs={tabsProps} headerProps={{ ...headerProps }} loading={!dataFetched}>
          <ContentLoader height={FILTER_HEIGHT} loading={!accountsFetched}>
            <Line fill="FAINT" />
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
          <ContentLoader height={tableHeight} loading={!statementsFetched}>
            <Table />
          </ContentLoader>
        </ScrollerPageLayout>
      </MainLayout>
    </HistoryScrollerContext.Provider>
  );
};

StatementHistoryScrollerPage.displayName = 'StatementHistoryScrollerPage';
