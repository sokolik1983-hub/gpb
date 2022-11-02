import type { FC } from 'react';
import React, { useCallback, useState } from 'react';
import { executor } from 'actions/admin';
import type { ClosedDayRow } from 'interfaces/admin';
import { locale } from 'localization';
import { columns } from 'pages/scroller/admin/closed-days/table/columns';
import { DEFAULT_SORT, STORAGE_KEY } from 'pages/scroller/admin/closed-days/table/constants';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { InfiniteDataTable } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { convertTablePaginationToMetaData } from 'utils/common';
import type { IFilters } from '@platform/core';
import type { IMetaData } from '@platform/services/admin';
import { Box, Gap, Horizon, Typography } from '@platform/ui';

/** Свойства таблицы журнала закрытых дней. */
interface TableProps {
  /** Значения формы фильтрации. */
  filter: IFilters;
  /** Метод установки признака загрузки данных для таблицы. */
  setDataTableFetched(): void;
}

/** Таблица журнала закрытых дней. */
export const Table: FC<TableProps> = ({ filter, setDataTableFetched }) => {
  const [total, setTotal] = useState(0);

  /** Метод делает запрос закрытых дней на сервер. */
  const fetch = useCallback(
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<ClosedDayRow>> => {
      try {
        const metaData: IMetaData = {
          filters: filter,
          multiSort,
          ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
        };

        const { data: rows, total: totalItems } = await statementService.getClosedDays(metaData);

        setTotal(totalItems);

        return { rows, pageCount: totalItems };
      } catch {
        return { rows: [], pageCount: 0 };
      } finally {
        setDataTableFetched();
      }
    },
    // Должно срабатывать только при изменении фильтра.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter]
  );

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
