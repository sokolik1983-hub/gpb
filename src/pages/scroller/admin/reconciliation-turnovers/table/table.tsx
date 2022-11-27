import type { FC } from 'react';
import React from 'react';
import { executor } from 'actions/admin';
import { ContentLoader, DataTableWithTotal } from 'components/common';
import { useDataTable } from 'hooks/common';
import type { ScrollerTable } from 'interfaces';
import type { ReconciliationTurnoverRow } from 'interfaces/admin';
import { locale } from 'localization';
import { AdditionalInfo } from 'pages/scroller/admin/reconciliation-turnovers/table/additional-info';
import { columns } from 'pages/scroller/admin/reconciliation-turnovers/table/columns';
import { DEFAULT_SORT, STORAGE_KEY } from 'pages/scroller/admin/reconciliation-turnovers/table/constants';
import { InfiniteDataTable } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { Box } from '@platform/ui';

/** Таблица журнала сверки остатков/оборотов. */
export const Table: FC<ScrollerTable> = ({ filter, height }) => {
  const { fetch, initialed, total } = useDataTable<ReconciliationTurnoverRow>({
    apiMethod: statementService.getReconciliationTurnovers,
    filter,
  });

  return (
    <>
      <ContentLoader height={height} loading={!initialed}>
        <Box />
      </ContentLoader>

      <DataTableWithTotal label={locale.admin.reconciliationTurnoversScroller.table.total} total={total}>
        <InfiniteDataTable<ReconciliationTurnoverRow>
          columns={columns}
          defaultSort={DEFAULT_SORT}
          executor={executor}
          expandedRowComponent={AdditionalInfo}
          fetchData={fetch}
          showSettingsButton={false}
          storageKey={STORAGE_KEY}
        />
      </DataTableWithTotal>
    </>
  );
};
