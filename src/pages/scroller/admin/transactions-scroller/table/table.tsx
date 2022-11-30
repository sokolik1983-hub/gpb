import type { FC } from 'react';
import React, { useCallback, useState } from 'react';
import { executor, viewEntry } from 'actions/admin';
import { ContentLoader, DataTableWithTotal } from 'components/common';
import type { ScrollerTable } from 'interfaces';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { InfiniteDataTable } from 'platform-copies/services';
import { Box } from '@platform/ui';
import { columns } from '../columns';
import { STORAGE_KEY } from '../constants';
import { Footer } from './footer-content';
import { SettingsForm } from './settings-form';

/** Свойства таблицы проводок. */
interface TableProps extends Omit<ScrollerTable, 'filter'> {
  /** Признак пустого фильтра. */
  emptyFilter: boolean;
  /** Метод получения проводок. */
  fetch(params: IFetchDataParams): Promise<IFetchDataResponse<BankAccountingEntryCard>>;
  /** Признак инициализации таблицы. */
  initialed?: boolean;
  /** Общее количество проводок. */
  total: number;
}

/** Таблица проводок. */
export const Table: FC<TableProps> = ({ emptyFilter, fetch, height, initialed, total }) => {
  const [selectedRows, setSelectedRows] = useState<BankAccountingEntryCard[]>([]);

  /** Обработчик клика по строке скроллера. */
  const handleRowClick = useCallback((statement: BankAccountingEntryCard) => {
    void executor.execute(viewEntry, [statement]);
  }, []);

  return (
    <>
      <ContentLoader height={height} loading={!initialed}>
        <Box />
      </ContentLoader>

      <DataTableWithTotal label={locale.admin.transactionsScroller.table.total} total={total}>
        <>
          <InfiniteDataTable<BankAccountingEntryCard>
            columns={columns}
            customSettingsForm={SettingsForm}
            executor={executor}
            fetchData={fetch}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            placeholderMessage={emptyFilter ? <b>{locale.admin.transactionsScroller.table.placeholder.message}</b> : undefined}
            placeholderTitle={emptyFilter ? locale.admin.transactionsScroller.table.placeholder.title : undefined}
            selectedRows={selectedRows}
            storageKey={STORAGE_KEY}
            onRowClick={handleRowClick}
            onSelectedRowsChange={setSelectedRows}
          />
          {selectedRows.length > 0 && <Footer selectedRows={selectedRows} />}
        </>
      </DataTableWithTotal>
    </>
  );
};

Table.displayName = 'Table';
