import React, { useCallback, useState } from 'react';
import { executor } from 'actions/admin';
import type { ITurnoverMockDto } from 'interfaces/admin/dto/turnover-mock-dto';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { InfiniteDataTable } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { convertTablePaginationToMetaData } from 'utils/common';
import type { IMetaData } from '@platform/services';
import { AggregateRow } from '../aggregate-row';
import { columns } from './columns';
import { DEFAULT_SORT, STORAGE_KEY } from './constants';

/** Таблица скроллера. */
export const Table: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<ITurnoverMockDto[]>([]);

  const fetchData = useCallback(
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<ITurnoverMockDto>> => {
      try {
        const metaData: IMetaData = {
          filters: {},
          multiSort,
          ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
        };

        const { page: rows, size } = await statementService.getTurnovers(metaData);

        return { rows, pageCount: Math.ceil(size / pageSize) };
      } catch {
        return { rows: [], pageCount: 0 };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <InfiniteDataTable<ITurnoverMockDto>
      columns={columns}
      defaultSort={DEFAULT_SORT}
      executor={executor}
      expandedRowComponent={AggregateRow}
      fetchData={fetchData}
      selectedRows={selectedRows}
      storageKey={STORAGE_KEY}
      onSelectedRowsChange={setSelectedRows}
    />
  );
};

Table.displayName = 'Table';
