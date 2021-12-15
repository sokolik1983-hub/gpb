import React, { useMemo, useState } from 'react';
import { ScrollerPageLayout, ScrollerHeader, FilterLayout } from 'components';
import type { IFilterPanel } from 'interfaces';
import { useFilter } from '@platform/services';
import { FatalErrorContent, MainLayout } from '@platform/services/client';
import type { IFormState } from './filter';
import { tagLabels, STORAGE_KEY, QuickFilter, AdditionalFilter, TagsPanel, fields } from './filter';
import { useGetCounterparties, useScrollerHeaderProps } from './hooks';
import type { ITransactionScrollerContext } from './transaction-scroller-context';
import { TransactionScrollerContext } from './transaction-scroller-context';

/**
 * Страница скроллера: [Выписки_ЗВ] ЭФ Клиента "Журнал проводок".
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=286756666}
 */
export const StatementTransactionScrollerPage = () => {
  // region элементы стейта контекста скроллера.
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // endregion

  // Вызывается один раз.
  const { counterparties, isCounterpartiesFetching, isCounterpartiesError } = useGetCounterparties();

  const headerProps = useScrollerHeaderProps(
    /* TODO: передавать реальные параметры при подключениирестов. */
    { dateFrom: '2021-11-01', dateTo: '2021-11-30' }
  );

  const { filterPanel, tagsPanel } = useFilter({ fields, labels: tagLabels, storageKey: STORAGE_KEY });

  // Для улучшения типизации. Типу Record<string, unknown> нельзя присвоить интерфейс
  // у которого не определена "index signatures".
  const properlyTypedFilterPanel = (filterPanel as unknown) as IFilterPanel<IFormState>;

  const contextValue: ITransactionScrollerContext = useMemo(
    () => ({
      hasError: hasError || isCounterpartiesError,
      setHasError,
      isLoading: isLoading || isCounterpartiesFetching,
      setIsLoading,
      filterPanel: properlyTypedFilterPanel,
      tagsPanel,
      counterparties,
    }),
    [counterparties, hasError, isCounterpartiesError, isCounterpartiesFetching, isLoading, properlyTypedFilterPanel, tagsPanel]
  );

  if (hasError || isCounterpartiesError) {
    return (
      <MainLayout>
        <FatalErrorContent />
      </MainLayout>
    );
  }

  return (
    <TransactionScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <ScrollerPageLayout isLoading={false} navigationLine={<ScrollerHeader {...headerProps} />}>
          <FilterLayout
            additionalFilter={AdditionalFilter}
            filterState={filterPanel}
            quickFilter={QuickFilter}
            tagsPanel={TagsPanel}
            tagsState={tagsPanel}
          />
        </ScrollerPageLayout>
      </MainLayout>
    </TransactionScrollerContext.Provider>
  );
};

StatementTransactionScrollerPage.displayName = 'StatementTransactionScrollerPage';
