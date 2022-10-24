import React, { useEffect, useMemo, useState } from 'react';
import { locale } from 'localization';
import type { RecordCell } from 'platform-copies/services';
import { DEFAULT_PAGINATION_STATE, usePaginationController } from 'platform-copies/services';
import { CellSelectionAndExpand, HeaderSelectionAndExpand, TableHeader } from 'platform-copies/services/components/data-table/components';
import { SettingsButton } from 'platform-copies/services/components/data-table/components/settings-button';
import {
  SCROLLER_SETTING_TYPE,
  useColumnsWithDefaultValues,
  useDefaultHiddenColumns,
  useStorageSettings,
} from 'platform-copies/services/components/data-table/hooks';
import { getServiceColumnWidth } from 'platform-copies/services/components/data-table/utils';
import { FractalSelectedRowsInfo } from 'platform-copies/services/components/fractal-selected-rows-info';
import { useBlockLayout, useExpanded, usePagination, useResizeColumns, useRowSelect, useSortBy, useTable } from 'react-table';
import type { IColumnsStorageObject } from '@platform/core';
import { applyMiddlewares, onSuccessMiddleware } from '@platform/core';
import type { ISortSettings, IBaseEntity } from '@platform/services/client';
import { Box, FractalPagination, Gap, LoaderOverlay, Placeholder, SettingsForm, SORT_DIRECTION, useDebounce } from '@platform/ui';
import css from './styles.scss';
import { TableBodyWithGrouping } from './table-body-with-grouping';
import type { TableProps } from './types';

export const Table = <T extends IBaseEntity, R extends IBaseEntity>({
  columns,
  fetchData,
  expandedRowComponent,
  onSelectedRowsChange,
  executor: executerOriginal,
  onRowDoubleClick,
  fastActions,
  expandedRowActionsGetter,
  selectedRows,
  footerActionsGetter,
  defaultSort,
  footerContent,
  paginationState: propsPaginationState,
  defaultPaginationState = DEFAULT_PAGINATION_STATE,
  onPaginationChange,
  placeholderTitle = locale.scroller.placeholder.header,
  placeholderMessage = locale.scroller.placeholder.text,
  showSettingsButton = true,
  storageKey,
  onRowClick,
  rowCaptionComponent,
  visibleOnlySelectedRows,
  customSettingsForm = SettingsForm,
  getSubRows,
  withGrouping,
}: TableProps<T, R>) => {
  const { paginationState = DEFAULT_PAGINATION_STATE, goToPage, setPageSize } = usePaginationController(
    propsPaginationState,
    defaultPaginationState,
    onPaginationChange
  );

  const [controlledPageCount, setControlledPageCount] = useState(0);
  const [rows, setRows] = useState<T[]>([]);

  const { values: settingColumns, setValues: setSettingsColumns } = useStorageSettings<IColumnsStorageObject[]>({
    value: columns.reduce<IColumnsStorageObject[]>((acc, { id, width, isVisible }) => {
      if (id) {
        acc.push({ id, width, isVisible });
      }

      return acc;
    }, []),
    settingsName: SCROLLER_SETTING_TYPE.COLUMNS,
    storageKey,
  });

  const { values: settingSort, setValues: setSettingsSort } = useStorageSettings<ISortSettings>({
    value: { ...defaultSort },
    settingsName: SCROLLER_SETTING_TYPE.SORT,
    storageKey,
  });

  /** Колонки таблицы. */
  const columnsWithDefaultValues = useColumnsWithDefaultValues<R>(columns, settingColumns);

  /** Список скрытых по умолчанию колонок по признаку isVisible === false. */
  const defaultHiddenColumns = useDefaultHiddenColumns<R>(settingColumns);

  /** Массив данных для сортировки. */
  const defaultSortBy = useMemo(
    () =>
      Object.keys({ ...settingSort }).map(key => ({
        id: key,
        desc: settingSort[key] === SORT_DIRECTION.DESC,
      })),
    [settingSort]
  );

  const showExpanded = Boolean(expandedRowComponent);
  const showCheckbox = Boolean(onSelectedRowsChange);
  const serviceColumnWidth = getServiceColumnWidth(showExpanded, showCheckbox);

  const expanded = useMemo(
    () =>
      rows.reduce<Record<string, boolean>>((acc, el) => {
        acc[el.id] = true;

        return acc;
      }, {}),
    [rows]
  );

  const tableInstance = useTable<R>(
    {
      getSubRows,
      columns: columnsWithDefaultValues,
      getRowId: original => original.id,
      autoResetSelectedRows: false,
      data: (rows as unknown) as R[],
      manualSortBy: true,
      manualPagination: true,
      maxMultiSortColCount: 2,
      initialState: {
        hiddenColumns: defaultHiddenColumns,
        sortBy: defaultSortBy,
        expanded,
        ...paginationState,
      },
      customSettingsForm,
      pageCount: controlledPageCount,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useControlledState: state => React.useMemo(() => ({ ...state, ...paginationState }), [state, paginationState]),
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useResizeColumns,
    useBlockLayout,
    hooks => {
      hooks.visibleColumns.push(x => [
        {
          id: 'selectionAndExpand',
          width: serviceColumnWidth,
          minWidth: serviceColumnWidth,
          maxWidth: serviceColumnWidth,
          disableSortBy: true,
          disableResizing: true,
          Header: HeaderSelectionAndExpand,
          Cell: CellSelectionAndExpand,
          showExpanded,
          showCheckbox,
        },
        ...x,
      ]);
    }
  );

  const {
    getTableProps,
    headerGroups,
    pageCount,
    state: { sortBy, columnResizing, selectedRowIds },
    selectedFlatRows,
  } = tableInstance;

  useEffect(() => {
    if (columnResizing.isResizingColumn === null) {
      setSettingsColumns(settingColumns.map(item => ({ ...item, width: columnResizing.columnWidths[item.id] || item.width })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnResizing, setSettingsColumns]);

  const [isLoading, setLoading] = useState<boolean>(false);

  /** Обертка над функцией запроса на сервер. */
  const refetch = React.useCallback(async () => {
    setLoading(true);

    const multiSort =
      sortBy.length > 0
        ? sortBy.reduce((acc: Record<string, SORT_DIRECTION>, { id, desc }) => {
            acc[id.toString()] = desc ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC;

            return acc;
          }, {})
        : {};

    setSettingsSort(multiSort);

    try {
      const data = await fetchData({
        pageSize: paginationState.pageSize,
        page: paginationState.pageIndex,
        multiSort,
      });

      if (data) {
        setRows(data.rows);
        setControlledPageCount(data.pageCount);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchData, paginationState.pageIndex, paginationState.pageSize, setSettingsSort, sortBy]);

  // Используем debounce для исключения повторных запросов
  // value в useDebounce уходит в setState, поэтому используем сеттер
  const refetchDebounced = useDebounce(() => refetch, 100);

  useEffect(() => {
    void refetchDebounced();
  }, [refetchDebounced]);

  const executor = applyMiddlewares(
    onSuccessMiddleware(() => {
      void refetchDebounced();
    })
  )(executerOriginal);

  /**
   * Обработчик смены страницы.
   *
   * @param pageNumber - Номер страницы.
   * */
  const handlePageChange = React.useCallback((pageNumber: number) => goToPage(pageNumber - 1), [goToPage]);

  useEffect(() => {
    if (onSelectedRowsChange) {
      onSelectedRowsChange(
        Object.keys(selectedRowIds).map(
          key => selectedRows?.find(({ id }) => key === id) || selectedFlatRows?.find(({ id }) => String(key) === String(id))!.original
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSelectedRowsChange, selectedRowIds]);

  const tableProps = getTableProps();

  return (
    <>
      <Box className={css.wrapper}>
        <Box className={css.table} {...tableProps}>
          {showSettingsButton && (
            <SettingsButton<R>
              originalColumns={columns}
              setSettingsColumns={setSettingsColumns}
              settingColumns={settingColumns}
              tableInstance={tableInstance}
            />
          )}

          <TableHeader headerGroups={headerGroups} />

          {rows.length > 0 && (
            <TableBodyWithGrouping<R>
              executor={executor}
              expandedRowActionsGetter={expandedRowActionsGetter}
              expandedRowComponent={expandedRowComponent}
              fastActions={fastActions}
              refetch={refetch}
              rowCaptionComponent={rowCaptionComponent}
              tableInstance={tableInstance}
              visibleOnlySelectedRows={visibleOnlySelectedRows}
              withGrouping={withGrouping}
              onRowClick={onRowClick}
              onRowDoubleClick={onRowDoubleClick}
              onSelectedRowsChange={onSelectedRowsChange}
            />
          )}

          {!isLoading && rows.length === 0 && <Placeholder height={540} message={placeholderMessage} title={placeholderTitle} />}

          {pageCount > 1 && (
            <Box className={css.pagination}>
              <FractalPagination
                page={paginationState.pageIndex + 1}
                pageCount={pageCount}
                pageSize={paginationState.pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={setPageSize}
              />
            </Box>
          )}

          <LoaderOverlay opened={isLoading} />
          <Gap />
        </Box>
      </Box>
      {selectedRows && footerActionsGetter && footerContent && selectedRows.length > 0 && (
        <Box className={css.footer} role="footer">
          <FractalSelectedRowsInfo<RecordCell>
            actionsGetter={footerActionsGetter(executor)}
            content={footerContent}
            selectedRows={selectedRows}
          />
        </Box>
      )}
    </>
  );
};

Table.displayName = 'Table';
