import React, { useMemo, useEffect, useCallback, useRef } from 'react';
import { locale } from 'localization';
import { useTable, useSortBy, usePagination, useRowSelect, useExpanded, useResizeColumns, useBlockLayout } from 'react-table';
import type { IColumnsStorageObject } from '@platform/core';
import type { IBaseEntity, ISortSettings } from '@platform/services/client';
import { FractalSelectedRowsInfo, Placeholder, Box, SORT_DIRECTION, LoaderOverlay } from '@platform/ui';
import { CellSelectionAndExpand, HeaderSelectionAndExpand, TableHeader } from '../components';
import { SCROLLER_SETTING_TYPE, useColumnsWithDefaultValues, useDataManager, useDefaultHiddenColumns, useStorageSettings } from '../hooks';
import css from '../styles.scss';
import type { InfiniteScrollDataTableProps, RecordCell } from '../types';
import '../react-table-config';
import { TableBody } from './table-body';

/** Таблица бесконечного скроллирования данных. */
export const InfiniteDataTable = <T extends IBaseEntity>({
  columns,
  fetchData,
  expandedRowComponent,
  onSelectedRowsChange,
  executor: originalExecuter,
  onRowDoubleClick,
  fastActions,
  expandedRowActionsGetter,
  selectedRows,
  footerActionsGetter,
  defaultSort,
  footerContent,
  placeholderTitle = locale.scroller.placeholder.header,
  placeholderMessage = locale.scroller.placeholder.text,
  showSettingsButton = true,
  storageKey,
  onRowClick,
  rowCaptionComponent,
  visibleOnlySelectedRows,
}: InfiniteScrollDataTableProps<T>) => {
  const tableHeaderRef = useRef<HTMLElement>();

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

  /** Колонки таблицы. */
  const columnsWithDefaultValues = useColumnsWithDefaultValues<T>(columns, settingColumns);

  /** Список скрытых по умолчанию колонок по признаку isVisible === false. */
  const defaultHiddenColumns = useDefaultHiddenColumns<T>(settingColumns);

  const { values: settingSort, setValues: setSettingsSort } = useStorageSettings<ISortSettings>({
    value: { ...defaultSort },
    settingsName: SCROLLER_SETTING_TYPE.SORT,
    storageKey,
  });

  /** Массив данных для сортировки. */
  const defaultSortBy = useMemo(
    () =>
      Object.keys({ ...settingSort }).map(key => ({
        id: key,
        desc: settingSort[key] === SORT_DIRECTION.DESC,
      })),
    [settingSort]
  );

  const {
    executer,
    fetch,
    loading,
    loadingMore,
    needScrollToTop,
    onLoadMoreRows,
    pageCount,
    paginationState,
    rows,
    serviceColumnWidth,
    showCheckbox,
    showExpanded,
  } = useDataManager<T>({
    fetchData,
    expandedRowComponent,
    multiSort: settingSort,
    onSelectedRowsChange,
    originalExecuter,
  });

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
      pageCount,
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
      hooks.visibleColumns.push(item => [
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
        ...item,
      ]);
    }
  );

  const {
    getTableProps,
    state: { sortBy, selectedRowIds },
    selectedFlatRows,
  } = tableInstance;

  useEffect(() => {
    const multiSort =
      sortBy.length > 0
        ? sortBy.reduce((acc: Record<string, SORT_DIRECTION>, { id, desc }) => {
            acc[id.toString()] = desc ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC;

            return acc;
          }, {})
        : {};

    setSettingsSort(multiSort);
  }, [setSettingsSort, sortBy]);

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

  const handleTableHeaderRef = useCallback((element: HTMLElement) => {
    tableHeaderRef.current = element;
  }, []);

  return (
    <>
      <Box className={css.wrapper}>
        <Box {...getTableProps({ style: { height: '100%' } })}>
          <TableHeader
            refCallback={handleTableHeaderRef}
            setSettingsColumns={setSettingsColumns}
            settingColumns={settingColumns}
            showSettingsButton={showSettingsButton}
            tableInstance={tableInstance}
          />

          <TableBody<T>
            executor={executer}
            expandedRowActionsGetter={expandedRowActionsGetter}
            expandedRowComponent={expandedRowComponent}
            fastActions={fastActions}
            headerHeight={tableHeaderRef.current?.clientHeight || 0}
            loading={loading}
            loadingMore={loadingMore}
            needScrollToTop={needScrollToTop}
            refetch={fetch}
            rowCaptionComponent={rowCaptionComponent}
            tableInstance={tableInstance}
            visibleOnlySelectedRows={visibleOnlySelectedRows}
            onLoadMoreRows={onLoadMoreRows}
            onRowClick={onRowClick}
            onRowDoubleClick={onRowDoubleClick}
          />
        </Box>
        {!loading && rows.length === 0 && <Placeholder height={540} message={placeholderMessage} title={placeholderTitle} />}

        <LoaderOverlay opened={loading} />
      </Box>
      {selectedRows && footerActionsGetter && footerContent && selectedRows.length > 0 && (
        <Box className={css.footer}>
          <FractalSelectedRowsInfo<RecordCell>
            actionsGetter={footerActionsGetter(executer)}
            content={footerContent}
            selectedRows={selectedRows}
          />
        </Box>
      )}
    </>
  );
};

InfiniteDataTable.displayName = 'InfiniteDataTable';
