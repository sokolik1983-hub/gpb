import type { FC } from 'react';
import React, { useCallback, useState } from 'react';
import { executor } from 'actions/admin';
import { ContentLoader, SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT } from 'components/common';
import { useStreamContentHeight } from 'hooks/common';
import type { ReconciliationTurnoverRow } from 'interfaces/admin';
import { locale } from 'localization';
import { AdditionalInfo } from 'pages/scroller/admin/reconciliation-turnovers/table/additional-info';
import { columns } from 'pages/scroller/admin/reconciliation-turnovers/table/columns';
import { DEFAULT_SORT, STORAGE_KEY } from 'pages/scroller/admin/reconciliation-turnovers/table/constants';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { InfiniteDataTable } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { convertTablePaginationToMetaData, getPageCount } from 'utils/common';
import type { IFilters } from '@platform/core';
import type { IMetaData } from '@platform/services/admin';
import { Box, Gap, Horizon, Typography } from '@platform/ui';

/** Свойства таблицы журнала сверки остатков/оборотов. */
interface TableProps {
  /** Значения формы фильтрации. */
  filter: IFilters;
}

/** Таблица журнала сверки остатков/оборотов. */
export const Table: FC<TableProps> = ({ filter }) => {
  const [total, setTotal] = useState(0);
  const [tableInitialed, setTableInitialed] = useState(false);

  /** Метод срабатывает при получении данных таблицы.
   * Устанавливает признак инициализации таблицы (получение первых данных). */
  const setDataTableFetched = useCallback(() => {
    if (!tableInitialed) {
      setTableInitialed(true);
    }
  }, [tableInitialed]);

  /** Метод делает запрос сверки остатков/оборотов на сервер. */
  const fetch = useCallback(
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<ReconciliationTurnoverRow>> => {
      try {
        const metaData: IMetaData = {
          filters: filter,
          multiSort,
          ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
        };

        const { data: rows, total: totalItems } = await statementService.getReconciliationTurnovers(metaData);

        setTotal(totalItems);

        return { rows, pageCount: getPageCount(totalItems, pageSize) };
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

  const height = useStreamContentHeight();
  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT;

  return (
    <>
      <ContentLoader height={tableHeight} loading={!tableInitialed}>
        <Box />
      </ContentLoader>

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

        <InfiniteDataTable<ReconciliationTurnoverRow>
          columns={columns}
          defaultSort={DEFAULT_SORT}
          executor={executor}
          expandedRowComponent={AdditionalInfo}
          fetchData={fetch}
          showSettingsButton={false}
          storageKey={STORAGE_KEY}
        />
      </>
    </>
  );
};
