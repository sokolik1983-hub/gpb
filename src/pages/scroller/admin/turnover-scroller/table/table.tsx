import React, { useCallback, useContext, useState } from 'react';
import { executor } from 'actions/admin';
import { DataTableWithTotal } from 'components/common';
import type { TurnoverCard } from 'interfaces/admin/dto/turnover';
import { locale } from 'localization';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { InfiniteDataTable } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { convertTablePaginationToMetaData, getActiveActionButtons } from 'utils/common';
import type { IMetaData } from '@platform/services';
import { useAuth } from '@platform/services/admin';
import { FOOTER_ACTIONS } from '../action-config';
import { STORAGE_KEY } from '../constants';
import { ScrollerContext } from '../context';
import { FORM_FIELDS } from '../filter/constants';
import { Footer } from '../footer';
import { SummaryRow } from '../summary-row';
import { columns } from './columns';
import { DEFAULT_SORT } from './constants';

/** Таблица скроллера. */
export const Table: React.FC = () => {
  const { getAvailableActions } = useAuth();
  const { selectedRows, setSelectedRows, filters } = useContext(ScrollerContext);
  const [total, setTotal] = useState<number>();

  const fetchData = useCallback(
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<TurnoverCard>> => {
      try {
        const metaData: IMetaData = {
          filters,
          sort: multiSort ? multiSort : DEFAULT_SORT,
          ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
        };

        const { data, total: totalCount } = await statementService.turnover.page(metaData);

        setTotal(totalCount);

        return { rows: data, pageCount: Math.ceil(totalCount / pageSize) };
      } catch {
        return { rows: [], pageCount: 0 };
      }
    },
    [filters]
  );

  const footerActions = useCallback(
    scrollerExecutor => (rows: TurnoverCard[]) =>
      getActiveActionButtons(getAvailableActions(FOOTER_ACTIONS), scrollerExecutor, [
        rows,
        filters[FORM_FIELDS.DATE_FROM]?.value,
        filters[FORM_FIELDS.DATE_TO]?.value,
      ]),
    [filters, getAvailableActions]
  );

  return (
    <DataTableWithTotal label={locale.admin.transactionsScroller.table.total} total={total}>
      <InfiniteDataTable<TurnoverCard>
        columns={columns}
        defaultSort={DEFAULT_SORT}
        executor={executor}
        expandedRowComponent={SummaryRow}
        fetchData={fetchData}
        footerActionsGetter={footerActions}
        footerContent={Footer}
        selectedRows={selectedRows}
        storageKey={STORAGE_KEY}
        onSelectedRowsChange={setSelectedRows}
      />
    </DataTableWithTotal>
  );
};

Table.displayName = 'Table';
