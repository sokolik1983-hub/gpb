import type { FC } from 'react';
import React from 'react';
import { executor } from 'actions/admin';
import { ContentLoader, DataTableWithTotal } from 'components/common';
import { useDataTable } from 'hooks/common';
import type { ScrollerTable } from 'interfaces';
import type { MaintenanceRow } from 'interfaces/admin';
import { locale } from 'localization';
import { columns } from 'pages/scroller/admin/maintenance/table/columns';
import { DEFAULT_SORT, STORAGE_KEY } from 'pages/scroller/admin/maintenance/table/constants';
import { InfiniteDataTable } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { Box } from '@platform/ui';

/** Таблица журнала технических работ. */
export const Table: FC<ScrollerTable> = ({ filter, height, show }) => {
  const { fetch, initialed, total } = useDataTable<MaintenanceRow>({ apiMethod: statementService.getMaintenance, filter });

  return (
    <>
      <ContentLoader height={height} loading={!initialed}>
        <Box />
      </ContentLoader>

      {show && (
        <DataTableWithTotal label={locale.admin.maintenanceScroller.table.total} total={total}>
          <InfiniteDataTable<MaintenanceRow>
            columns={columns}
            defaultSort={DEFAULT_SORT}
            executor={executor}
            fetchData={fetch}
            placeholderMessage={locale.admin.maintenanceScroller.table.placeholder.message}
            placeholderTitle={locale.admin.maintenanceScroller.table.placeholder.title}
            showSettingsButton={false}
            storageKey={STORAGE_KEY}
          />
        </DataTableWithTotal>
      )}
    </>
  );
};

Table.displayName = 'Table';
