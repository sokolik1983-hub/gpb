import React, { useCallback, useContext } from 'react';
import { executor } from 'actions/admin';
import type { TurnoverCard } from 'interfaces/admin/dto/turnover';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { InfiniteDataTable } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { convertTablePaginationToMetaData, getActiveActionButtons } from 'utils/common';
import type { IMetaData } from '@platform/services';
import { useAuth } from '@platform/services/admin';
import { FOOTER_ACTIONS } from '../action-config';
import { AggregateRow } from '../aggregate-row';
import { STORAGE_KEY } from '../constants';
import { ScrollerContext } from '../context';
import { Footer } from '../footer';
import { columns } from './columns';
import { DEFAULT_SORT } from './constants';

/** Таблица скроллера. */
export const Table: React.FC = () => {
  const { getAvailableActions } = useAuth();
  const { selectedRows, setSelectedRows, filters } = useContext(ScrollerContext);

  const fetchData = useCallback(
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<TurnoverCard>> => {
      try {
        const metaData: IMetaData = {
          filters,
          sort: multiSort ? multiSort : DEFAULT_SORT,
          ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
        };

        const { data, total } = await statementService.turnover.page(metaData);

        return { rows: data, pageCount: Math.ceil(total / pageSize) };
      } catch {
        return { rows: [], pageCount: 0 };
      }
    },
    [filters]
  );

  const footerActions = useCallback(
    scrollerExecutor => (rows: TurnoverCard[]) =>
      getActiveActionButtons(getAvailableActions(FOOTER_ACTIONS), scrollerExecutor, [rows, '', '']),
    [getAvailableActions]
  );

  return (
    <InfiniteDataTable<TurnoverCard>
      columns={columns}
      defaultSort={DEFAULT_SORT}
      executor={executor}
      expandedRowComponent={AggregateRow}
      fetchData={fetchData}
      footerActionsGetter={footerActions}
      footerContent={Footer}
      selectedRows={selectedRows}
      storageKey={STORAGE_KEY}
      onSelectedRowsChange={setSelectedRows}
    />
  );
};

Table.displayName = 'Table';
