import type { FC } from 'react';
import React from 'react';
import { executor } from 'actions/admin';
import { ContentLoader, DataTableWithTotal } from 'components/common';
import { useDataTable } from 'hooks/common';
import type { ScrollerTable } from 'interfaces';
import type { ClosedDayRow } from 'interfaces/admin';
import { locale } from 'localization';
import { columns } from 'pages/scroller/admin/closed-days/table/columns';
import { DEFAULT_SORT, STORAGE_KEY } from 'pages/scroller/admin/closed-days/table/constants';
import { InfiniteDataTable } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { Box } from '@platform/ui';

/** Таблица журнала закрытых дней. */
export const Table: FC<ScrollerTable> = ({ filter, height, show }) => {
  const { fetch, initialed, total } = useDataTable<ClosedDayRow>({ apiMethod: statementService.getClosedDays, filter });

  return (
    <>
      <ContentLoader height={height} loading={!initialed}>
        <Box />
      </ContentLoader>

      {show && (
        <DataTableWithTotal label={locale.admin.closedDaysScroller.table.total} total={total}>
          <InfiniteDataTable<ClosedDayRow>
            columns={columns}
            defaultSort={DEFAULT_SORT}
            executor={executor}
            fetchData={fetch}
            placeholderMessage={locale.admin.closedDaysScroller.table.placeholder.message}
            placeholderTitle={locale.admin.closedDaysScroller.table.placeholder.title}
            showSettingsButton={false}
            storageKey={STORAGE_KEY}
          />
        </DataTableWithTotal>
      )}
    </>
  );
};

Table.displayName = 'Table';
