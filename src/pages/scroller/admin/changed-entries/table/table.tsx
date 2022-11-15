import React, { useCallback, useContext, useState } from 'react';
import { executor, viewEntry } from 'actions/admin';
import { DataTableWithTotal } from 'components/common';
import type { BankAccountingChangedEntry } from 'interfaces/admin/dto/bank-accounting-changed-entry';
import { locale } from 'localization';
import { InfiniteDataTable } from 'platform-copies/services';
import { columns } from '../columns';
import { STORAGE_KEY } from '../constants';
import { ChangedEntriesScrollerContext } from '../context';
import { Footer } from './footer-content';
import { SettingsForm } from './settings-form';

export const Table = () => {
  const [selectedRows, setSelectedRows] = useState<BankAccountingChangedEntry[]>([]);
  const { fetch, total } = useContext(ChangedEntriesScrollerContext);
  /** Обработчик клика по строке скроллера. */
  const handleRowClick = useCallback((statement: BankAccountingChangedEntry) => {
    void executor.execute(viewEntry, [statement]);
  }, []);

  return (
    <DataTableWithTotal label={locale.admin.transactionsScroller.table.total} total={total}>
      <>
        <InfiniteDataTable<BankAccountingChangedEntry>
          columns={columns}
          customSettingsForm={SettingsForm}
          executor={executor}
          fetchData={fetch}
          selectedRows={selectedRows}
          storageKey={STORAGE_KEY}
          onRowClick={handleRowClick}
          onSelectedRowsChange={setSelectedRows}
        />
        {selectedRows.length > 0 && <Footer selectedRows={selectedRows} />}
      </>
    </DataTableWithTotal>
  );
};

Table.displayName = 'Table';
