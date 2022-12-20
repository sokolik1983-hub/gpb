import type { FC } from 'react';
import React, { useCallback, useContext } from 'react';
import { executor } from 'actions/client';
import type { IStatementScheduleRow } from 'interfaces/client';
import { locale } from 'localization';
import { STORAGE_KEY } from 'pages/scroller/client/statement-transaction/filter';
import { DEFAULT_SORTING } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import type { IFetchDataResponse } from 'platform-copies/services';
import { InfiniteDataTable } from 'platform-copies/services';
import { SettingsForm, Box, Gap, Horizon, Typography } from '@platform/ui';
import { ScheduleScrollerContext } from '../schedule-scroller-context';
import { columns } from './columns';
import css from './styles.scss';

/** Таблица выписок по расписанию. */
export const Table: FC = () => {
  const { statements, isStatementsFetched, pagination, totalStatementsAmount, isStatementsError } = useContext(ScheduleScrollerContext);

  const sendHistoryToDataTable = useCallback(
    (): Promise<IFetchDataResponse<IStatementScheduleRow>> =>
      new Promise((resolve, reject) => {
        if (isStatementsFetched) {
          resolve({ rows: statements, pageCount: Math.ceil(totalStatementsAmount / pagination.pageSize) });
        }

        if (isStatementsError) {
          reject();
        }
      }),
    [isStatementsError, isStatementsFetched, pagination.pageSize, statements, totalStatementsAmount]
  );

  return (
    <>
      <Box className={css.totalWrapper}>
        <Gap.SM />
        <Horizon>
          <Typography.TextBold>{locale.client.pages.sheduleRequestHistoryPage.total}</Typography.TextBold>
          <Gap.SM />
          <Typography.TextBold>{statements.length}</Typography.TextBold>
        </Horizon>
        <Gap.LG />
      </Box>
      <Box style={{ height: '500px' }}>
        <InfiniteDataTable<IStatementScheduleRow>
          columns={columns}
          customSettingsForm={SettingsForm}
          defaultSort={DEFAULT_SORTING}
          executor={executor}
          fetchData={sendHistoryToDataTable}
          storageKey={STORAGE_KEY}
        />
      </Box>
    </>
  );
};
Table.displayName = 'Table';
