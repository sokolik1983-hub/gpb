import type { FC } from 'react';
import React from 'react';
import { executor } from 'actions/admin';
import { ContentLoader, DataTableWithTotal } from 'components/common';
import { useDataTable } from 'hooks/common';
import type { ScrollerTable } from 'interfaces';
import type { CurrencyRateRow } from 'interfaces/admin';
import { locale } from 'localization';
import { columns } from 'pages/scroller/admin/currency-rates/table/columns';
import { DEFAULT_SORT, STORAGE_KEY } from 'pages/scroller/admin/currency-rates/table/constants';
import { InfiniteDataTable } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { Box } from '@platform/ui';

/** Таблица справочника курсов валют. */
export const Table: FC<ScrollerTable> = ({ filter, height }) => {
  const { fetch, initialed, total } = useDataTable<CurrencyRateRow>({ apiMethod: statementService.getCurrencyRates, filter });

  return (
    <>
      <ContentLoader height={height} loading={!initialed}>
        <Box />
      </ContentLoader>

      <DataTableWithTotal label={locale.admin.currencyRatesScroller.table.total} total={total}>
        <InfiniteDataTable<CurrencyRateRow>
          columns={columns}
          defaultSort={DEFAULT_SORT}
          executor={executor}
          fetchData={fetch}
          showSettingsButton={false}
          storageKey={STORAGE_KEY}
        />
      </DataTableWithTotal>
    </>
  );
};
