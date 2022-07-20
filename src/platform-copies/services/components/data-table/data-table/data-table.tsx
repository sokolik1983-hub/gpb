import React, { useMemo, useState, useEffect } from 'react';
import { FocusNode } from 'components/focus-tree';
import { locale } from 'localization';
import { AutoFocusInside } from 'react-focus-lock';
import { useTable, useSortBy, usePagination, useRowSelect, useExpanded, useResizeColumns, useBlockLayout } from 'react-table';
import { COMMON_SCROLLER_NODE, DATA_TABLE_HEADER_NODE, DATA_TABLE_PAGINATION_NODE } from 'stream-constants/a11y-nodes';
import type { IColumnsStorageObject } from '@platform/core';
import { applyMiddlewares, onSuccessMiddleware } from '@platform/core';
import type { IBaseEntity, ISortSettings } from '@platform/services/client';
import { FractalPagination, Placeholder, SORT_DIRECTION, Box, Gap, useDebounce, LoaderOverlay } from '@platform/ui';
import { FractalSelectedRowsInfo } from '../../fractal-selected-rows-info';
import { CellSelectionAndExpand, HeaderSelectionAndExpand, TableHeader } from '../components';
import {
  DEFAULT_PAGINATION_STATE,
  SCROLLER_SETTING_TYPE,
  useColumnsWithDefaultValues,
  useDefaultHiddenColumns,
  usePaginationController,
  useStorageSettings,
} from '../hooks';
import css from '../styles.scss';
import type { DataTableProps, RecordCell } from '../types';
import '../react-table-config';
import { getServiceColumnWidth } from '../utils';
import { TableBody } from './table-body';

/** Таблица данных. */
export const DataTable = <T extends IBaseEntity>({
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
}: DataTableProps<T>) => {
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
  const columnsWithDefaultValues = useColumnsWithDefaultValues<T>(columns, settingColumns);

  /** Список скрытых по умолчанию колонок по признаку isVisible === false. */
  const defaultHiddenColumns = useDefaultHiddenColumns<T>(settingColumns);

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

  const tableInstance = useTable<T>(
    {
      columns: columnsWithDefaultValues,
      getRowId: original => original.id,
      autoResetSelectedRows: false,
      data: rows,
      manualSortBy: true,
      manualPagination: true,
      maxMultiSortColCount: 2,
      initialState: {
        hiddenColumns: defaultHiddenColumns,
        sortBy: defaultSortBy,
        ...paginationState,
      },
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

  return (
    <>
      <Box className={css.wrapper}>
        <Box {...getTableProps()}>
          <AutoFocusInside>
            <FocusNode nodeId={DATA_TABLE_HEADER_NODE} parentId={COMMON_SCROLLER_NODE}>
              <TableHeader
                setSettingsColumns={setSettingsColumns}
                settingColumns={settingColumns}
                showSettingsButton={showSettingsButton}
                tableInstance={tableInstance}
              />
            </FocusNode>
          </AutoFocusInside>
          <TableBody<T>
            executor={executor}
            expandedRowActionsGetter={expandedRowActionsGetter}
            expandedRowComponent={expandedRowComponent}
            fastActions={fastActions}
            refetch={refetch}
            rowCaptionComponent={rowCaptionComponent}
            tableInstance={tableInstance}
            visibleOnlySelectedRows={visibleOnlySelectedRows}
            onRowClick={onRowClick}
            onRowDoubleClick={onRowDoubleClick}
          />
        </Box>

        {!isLoading && rows.length === 0 && <Placeholder height={540} message={placeholderMessage} title={placeholderTitle} />}

        {pageCount > 1 && (
          <FocusNode nodeId={DATA_TABLE_PAGINATION_NODE} parentId={COMMON_SCROLLER_NODE}>
            <Box className={css.pagination}>
              <FractalPagination
                page={paginationState.pageIndex + 1}
                pageCount={pageCount}
                pageSize={paginationState.pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={setPageSize}
              />
            </Box>
          </FocusNode>
        )}

        <LoaderOverlay opened={isLoading} />

        <Gap.X3L />
        <Gap.X3L />
      </Box>
      {selectedRows && footerActionsGetter && footerContent && selectedRows.length > 0 && (
        <Box className={css.footer}>
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

DataTable.displayName = 'DataTable';
