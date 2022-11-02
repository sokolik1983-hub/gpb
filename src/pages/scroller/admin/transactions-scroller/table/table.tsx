import React, { useCallback, useContext, useState } from 'react';
import { executor, viewEntry } from 'actions/admin';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import { InfiniteDataTable } from 'platform-copies/services';
import { FractalSelectedRowsInfo } from 'platform-copies/services/components/fractal-selected-rows-info';
import { getActiveActionButtons } from 'utils/common';
import { useAuth } from '@platform/services/admin';
import { Box, Gap, Horizon, Typography } from '@platform/ui';
import { FOOTER_ACTIONS } from '../action-configs';
import { columns } from '../columns';
import { STORAGE_KEY } from '../constants';
import { TransactionsScrollerContext } from '../context';
import { Footer } from './footer-content';
import css from './styles.scss';

export const Table = () => {
  const [selectedRows, setSelectedRows] = useState<BankAccountingEntryCard[]>([]);
  const { fetch, total } = useContext(TransactionsScrollerContext);
  /** Обработчик клика по строке скроллера. */
  const handRowClick = useCallback((statement: BankAccountingEntryCard) => {
    void executor.execute(viewEntry, statement);
  }, []);

  const { getAvailableActions } = useAuth();

  const footerActions = useCallback(
    scrollerExecutor => (rows: BankAccountingEntryCard[]) =>
      getActiveActionButtons(getAvailableActions(FOOTER_ACTIONS), scrollerExecutor, [rows]),
    [getAvailableActions]
  );

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
        executor={executor}
        fetchData={fetch}
        footerContent={Footer}
        selectedRows={selectedRows}
        storageKey={STORAGE_KEY}
        onRowClick={handRowClick}
        onSelectedRowsChange={setSelectedRows}
      />
      {selectedRows.length > 0 && (
        <Box className={css.footer} role="footer">
          <FractalSelectedRowsInfo<any> actionsGetter={footerActions(executor)} content={Footer} selectedRows={selectedRows} />
        </Box>
      )}
    </>
  );
};

Table.displayName = 'Table';
