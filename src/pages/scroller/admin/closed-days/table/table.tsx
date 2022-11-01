import type { FC } from 'react';
import React, { useContext } from 'react';
import { executor } from 'actions/admin';
import type { ClosedDayRow } from 'interfaces/admin';
import { locale } from 'localization';
import { STORAGE_KEY } from 'pages/scroller/admin/closed-days/constants';
import { ClosedDaysContext } from 'pages/scroller/admin/closed-days/context';
import { columns } from 'pages/scroller/admin/closed-days/table/columns';
import { DEFAULT_SORT } from 'pages/scroller/admin/closed-days/table/constants';
import { InfiniteDataTable } from 'platform-copies/services';
import { Box, Gap, Horizon, Typography } from '@platform/ui';

/** Таблица журнала закрытых дней. */
export const Table: FC = () => {
  const { fetch, total } = useContext(ClosedDaysContext);

  return (
    <>
      <Box>
        <Gap.XS />
        <Horizon>
          <Gap />
          <Gap />
          <Typography.TextBold>{locale.admin.closedDaysScroller.table.total}</Typography.TextBold>
          <Gap.SM />
          <Typography.Text data-field={'total'}>{total}</Typography.Text>
        </Horizon>
        <Gap.XS />
      </Box>

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
    </>
  );
};

Table.displayName = 'Table';
