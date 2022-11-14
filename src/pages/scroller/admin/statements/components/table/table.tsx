import type { FC } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { executor, viewStatementRequestCard } from 'actions/admin';
import { ContentLoader, DataTableWithTotal } from 'components/common';
import { useDataTable, usePrevious } from 'hooks/common';
import type { ScrollerTable } from 'interfaces';
import type { StatementHistoryRow } from 'interfaces/admin';
import { locale } from 'localization';
import { FOOTER_ACTIONS } from 'pages/scroller/admin/statements/action-configs';
import { columns } from 'pages/scroller/admin/statements/components/table/columns';
import { DEFAULT_SORT } from 'pages/scroller/admin/statements/components/table/constants';
import { Footer } from 'pages/scroller/admin/statements/components/table/footer';
import { InfiniteDataTable } from 'platform-copies/services';
import { getActiveActionButtons } from 'utils/common';
import type { ICollectionResponse, IMetaData } from '@platform/services';
import { useAuth } from '@platform/services';
import { Box } from '@platform/ui';

/** Свойства таблицы. */
interface TableProps extends ScrollerTable {
  /** Api-метод запроса данных на сервер. */
  apiMethod(metaData: IMetaData): Promise<ICollectionResponse<StatementHistoryRow>>;
  /** Подзаголовок плэйсхолдера. */
  placeholderMessage?: string;
  /** Заголовок плэйсхолдера. */
  placeholderTitle?: string;
  /** Признак, что можно показать таблицу. */
  show: boolean;
  /** Функция установки данных выписок. */
  setStatements(statements: StatementHistoryRow[]): void;
  /** Ключ в Session Storage, по которому хранится состояние колонок таблицы. */
  storageKey: string;
}

/** Таблица. */
export const Table: FC<TableProps> = ({
  apiMethod,
  filter,
  height,
  placeholderMessage,
  placeholderTitle,
  show,
  setStatements,
  storageKey,
}) => {
  const [selectedRows, setSelectedRows] = useState<StatementHistoryRow[]>([]);

  const { fetch, initialed, items, loading, total } = useDataTable<StatementHistoryRow>({
    apiMethod,
    filter,
  });

  const prevLoading = usePrevious(loading);

  useEffect(() => {
    if (prevLoading && !loading) {
      setStatements(items);
    }
  }, [items, loading, prevLoading, setStatements]);

  const { getAvailableActions } = useAuth();

  const footerActions = useCallback(
    scrollerExecutor => (statements: StatementHistoryRow[]) =>
      getActiveActionButtons(getAvailableActions(FOOTER_ACTIONS), scrollerExecutor, [
        { dateFrom: filter.dateFrom, dateTo: filter.dateTo, statements },
      ]),
    [filter.dateFrom, filter.dateTo, getAvailableActions]
  );

  /** Обработчик клика по строке. */
  const handRowClick = useCallback((statement: StatementHistoryRow) => {
    void executor.execute(viewStatementRequestCard, statement);
  }, []);

  return (
    <>
      <ContentLoader height={height} loading={!initialed}>
        <Box />
      </ContentLoader>

      {show && (
        <DataTableWithTotal label={locale.admin.statementScroller.table.total} total={total}>
          <InfiniteDataTable<StatementHistoryRow>
            columns={columns}
            defaultSort={DEFAULT_SORT}
            executor={executor}
            fetchData={fetch}
            footerActionsGetter={footerActions}
            footerContent={Footer}
            placeholderMessage={placeholderMessage}
            placeholderTitle={placeholderTitle}
            selectedRows={selectedRows}
            storageKey={storageKey}
            onRowClick={handRowClick}
            onSelectedRowsChange={setSelectedRows}
          />
        </DataTableWithTotal>
      )}
    </>
  );
};

Table.displayName = 'Table';
