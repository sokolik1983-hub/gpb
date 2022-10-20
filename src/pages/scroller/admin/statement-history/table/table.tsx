import type { FC } from 'react';
import React, { useCallback, useContext, useState } from 'react';
import { executor, viewStatementRequestCard } from 'actions/admin';
import type { StatementHistoryRow } from 'interfaces/admin';
import { locale } from 'localization';
import { InfiniteDataTable } from 'platform-copies/services';
import { getActiveActionButtons } from 'utils/common';
import { useAuth } from '@platform/services';
import { Box, Gap, Horizon, Typography } from '@platform/ui';
import { FOOTER_ACTIONS } from '../action-configs';
import type { StatementHistoryScrollerContextProps } from '../context';
import { StatementHistoryScrollerContext } from '../context';
import { FORM_FIELDS, STORAGE_KEY } from '../filter';
import { columns } from './columns';
import { Footer } from './footer';

/** Компонент таблицы "История запросов выписок". */
export const Table: FC = () => {
  const [selectedRows, setSelectedRows] = useState<StatementHistoryRow[]>([]);

  const {
    fetchStatements,
    filterPanel: { values },
    totalStatements,
  } = useContext<StatementHistoryScrollerContextProps>(StatementHistoryScrollerContext);

  const { getAvailableActions } = useAuth();

  const footerActions = useCallback(
    scrollerExecutor => (statements: StatementHistoryRow[]) =>
      getActiveActionButtons(getAvailableActions(FOOTER_ACTIONS), scrollerExecutor, [
        { dateFrom: values[FORM_FIELDS.DATE_FROM], dateTo: values[FORM_FIELDS.DATE_TO], statements },
      ]),
    [getAvailableActions, values]
  );

  /** Обработчик клика по строке скроллера. */
  const handRowClick = useCallback((statement: StatementHistoryRow) => {
    void executor.execute(viewStatementRequestCard, statement);
  }, []);

  return (
    <>
      <Box>
        <Gap.XS />
        <Horizon>
          <Gap />
          <Gap />
          <Typography.TextBold>{locale.admin.historyScroller.table.total}</Typography.TextBold>
          <Gap.SM />
          <Typography.Text data-field={'total'}>{totalStatements}</Typography.Text>
        </Horizon>
        <Gap.XS />
      </Box>

      <InfiniteDataTable<StatementHistoryRow>
        columns={columns}
        executor={executor}
        fetchData={fetchStatements}
        footerActionsGetter={footerActions}
        footerContent={Footer}
        selectedRows={selectedRows}
        storageKey={STORAGE_KEY}
        onRowClick={handRowClick}
        onSelectedRowsChange={setSelectedRows}
      />
    </>
  );
};

Table.displayName = 'Table';
