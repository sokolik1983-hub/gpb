import React, { useCallback, useContext, useState } from 'react';
import { executor, viewEntry } from 'actions/admin';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import { InfiniteDataTable } from 'platform-copies/services';
import { Box, Gap, Horizon, Typography } from '@platform/ui';
import { columns } from '../columns';
import { STORAGE_KEY } from '../constants';
import { TransactionsScrollerContext } from '../context';
import { Footer } from './footer-content';
import { SettingsForm } from './settings-form';

export const Table = () => {
  const [selectedRows, setSelectedRows] = useState<BankAccountingEntryCard[]>([]);
  const { fetch, total } = useContext(TransactionsScrollerContext);
  /** Обработчик клика по строке скроллера. */
  const handleRowClick = useCallback((statement: BankAccountingEntryCard) => {
    void executor.execute(viewEntry, [statement]);
  }, []);

  return (
    <>
      <Box>
        <Gap.XS />
        <Horizon>
          <Gap />
          <Gap />
          <Typography.TextBold>{locale.admin.transactionsScroller.table.total}</Typography.TextBold>
          <Gap.SM />
          <Typography.Text data-field={'total'}>{total}</Typography.Text>
        </Horizon>
        <Gap.XS />
      </Box>
      <InfiniteDataTable<BankAccountingEntryCard>
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
  );
};

Table.displayName = 'Table';
