import React, { useCallback, useContext } from 'react';
import { executor } from 'actions/admin';
import type { ITurnoverMockDto } from 'interfaces/admin/dto/turnover-mock-dto';
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
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<ITurnoverMockDto>> => {
      try {
        const metaData: IMetaData = {
          filters,
          multiSort,
          ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
        };

        const { page: rows, size } = await statementService.getTurnovers(metaData);

        return { rows, pageCount: Math.ceil(size / pageSize) };
      } catch {
        return { rows: [], pageCount: 0 };
      }
    },
    [filters]
  );

  const footerActions = useCallback(
    scrollerExecutor => (rows: ITurnoverMockDto[]) =>
      getActiveActionButtons(getAvailableActions(FOOTER_ACTIONS), scrollerExecutor, [rows, '', '']),
    [getAvailableActions]
  );

  return (
    <InfiniteDataTable<ITurnoverMockDto>
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
