import React, { useMemo, useState, useEffect } from 'react';
import { locale } from 'localization';
import type { CellProps, HeaderProps, Row } from 'react-table';
import { useTable, useSortBy, usePagination, useRowSelect, useExpanded, useResizeColumns, useBlockLayout } from 'react-table';
import type { IColumnsStorageObject } from '@platform/core';
import { getActionButtons, applyMiddlewares, onSuccessMiddleware } from '@platform/core';
import type { ISortSettings } from '@platform/services';
import { DEFAULT_PAGINATION_STATE, useAuth, usePaginationController } from '@platform/services';
import type { ICheckboxOption } from '@platform/ui';
import {
  FastActionsPanel,
  IconButton,
  Icons,
  FractalPagination,
  FractalSelectedRowsInfo,
  Placeholder,
  SettingsForm,
  SORT_DIRECTION,
  Box,
  ServiceIcons,
  WithInfoTooltip,
  Horizon,
  Typography,
  Gap,
  Checkbox,
  WithClickable,
  Adjust,
  dialog,
  useDebounce,
  ACTIONS,
  ROLE,
  LoaderOverlay,
  noop,
} from '@platform/ui';
import type { IDataTableProps } from './interfaces';
import './react-table-config';
import { StopPropagation } from './stop-propagation';
import css from './styles.scss';
import { SCROLLER_SETTING_TYPE, useStorageSettings } from './use-setting-columns';

const SELECTION_AND_EXPAND_WIDTH = 66;
const SELECTION_WIDTH = 30;

const minWidth = '1000px';

const firstCellPadding = Adjust.getPadClass(['XS', null]);

const getServiceColumnWidth = (showExpanded: boolean, showCheckbox: boolean) => {
  if (showExpanded && showCheckbox) {
    return SELECTION_AND_EXPAND_WIDTH;
  }

  if (showCheckbox || showExpanded) {
    return SELECTION_WIDTH;
  }

  return 0;
};

/**
 * Компонент заголовка первой колонки.
 *
 * @example <HeaderSelectionAndExpand /> */
// eslint-disable-next-line react/function-component-definition, func-style
function HeaderSelectionAndExpand<T extends Record<string, unknown>>({
  getToggleAllPageRowsSelectedProps,
  getToggleAllRowsExpandedProps,
  isAllRowsExpanded,
  column,
}: React.PropsWithChildren<HeaderProps<T>>) {
  const { checked, indeterminate, onChange } = getToggleAllPageRowsSelectedProps();

  const handleChange = React.useCallback((_, e) => onChange?.((e as unknown) as React.ChangeEvent), [onChange]);

  const ToggleIcon = isAllRowsExpanded ? ServiceIcons.DoubleChevronUp : ServiceIcons.DoubleChevronDown;

  return (
    <Horizon>
      {column.showExpanded && (
        <ToggleIcon clickable data-action="collapse-all" fill="FAINT" scale="MD" {...getToggleAllRowsExpandedProps()} />
      )}
      {column.showExpanded && column.showCheckbox && <Gap.SM />}
      {column.showCheckbox && (
        <StopPropagation>
          <Checkbox extraSmall dimension="SM" indeterminate={indeterminate} name="collapse-all" value={checked} onChange={handleChange} />
        </StopPropagation>
      )}
    </Horizon>
  );
}

/**
 * Компонент первой ячейки сроки.
 *
 * @example <CellSelectionAndExpand /> */
// eslint-disable-next-line react/function-component-definition, func-style
function CellSelectionAndExpand<T extends Record<string, unknown>>({ row, column }: React.PropsWithChildren<CellProps<T>>) {
  const { checked, indeterminate, onChange } = row.getToggleRowSelectedProps();

  const handleChange = React.useCallback((_, e) => onChange?.((e as unknown) as React.ChangeEvent), [onChange]);

  const ToggleIcon = row.isExpanded ? ServiceIcons.ChevronUp : ServiceIcons.ChevronDown;

  return (
    <Horizon>
      {column.showExpanded && (
        <ToggleIcon clickable data-action={ACTIONS.SWITCH_EXPANDED} fill="FAINT" scale="MD" {...row.getToggleRowExpandedProps()} />
      )}
      {column.showExpanded && column.showCheckbox && <Gap.SM />}
      {column.showCheckbox && (
        <StopPropagation>
          <Checkbox extraSmall dimension="SM" indeterminate={indeterminate} name="collapse-all" value={checked} onChange={handleChange} />
        </StopPropagation>
      )}
    </Horizon>
  );
}

/**
 * Таблица DataTable.
 *
 * @example <DataTable />
 */
// eslint-disable-next-line react/function-component-definition
export const DataTable = function Table<T extends { id: string }>({
  columns,
  fetchData,
  expandedRowComponent: ExpandedRowComponent,
  onSelectedRowsChange,
  executor: executerOriginal,
  onRowDoubleClick = noop,
  fastActions = [],
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
  onRowClick = noop,
  rowCaptionComponent: RowCaptionComponent,
  visibleOnlySelectedRows,
}: IDataTableProps<T>) {
  const { paginationState = DEFAULT_PAGINATION_STATE, goToPage, setPageSize } = usePaginationController(
    propsPaginationState,
    defaultPaginationState,
    onPaginationChange
  );

  const [controlledPageCount, setControlledPageCount] = React.useState<number>(0);
  const [rows, setRows] = React.useState<T[]>([]);

  const { getAvailableActions } = useAuth();

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

  const columnsWithDefaultValues = React.useMemo(
    () =>
      columns.map(x => {
        const storageColumn = settingColumns.find(({ id }) => x.id === id);

        return {
          minWidth: x.disableResizing ? Number(x.width) : 0,
          maxWidth: x.disableResizing ? Number(x.width) : Number.POSITIVE_INFINITY,
          ...x,
          width: storageColumn?.width,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns]
  );

  /**
   * Получаем список скрытых по умолчанию колонок по признаку isVisible === false.
   */
  const defaultHiddenColumns = useMemo(
    () =>
      settingColumns.reduce((acc: string[], item) => {
        if (!item.isVisible) {
          acc.push(item.id);
        }

        return acc;
      }, []),
    [settingColumns]
  );

  const defaultSortBy = useMemo(
    () =>
      Object.keys({ ...settingSort }).map(key => ({
        id: key,
        desc: settingSort[key] === SORT_DIRECTION.DESC,
      })),
    [settingSort]
  );

  const showExpanded = Boolean(ExpandedRowComponent);
  const showCheckbox = Boolean(onSelectedRowsChange);
  const serviceColumnWidth = getServiceColumnWidth(showExpanded, showCheckbox);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    state: { sortBy, columnResizing },
    selectedFlatRows,
    visibleColumns,
    setHiddenColumns,
  } = useTable<T>(
    {
      columns: columnsWithDefaultValues,
      data: rows,
      manualSortBy: true,
      manualPagination: true,
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

  useEffect(() => {
    if (columnResizing.isResizingColumn === null) {
      setSettingsColumns(settingColumns.map(item => ({ ...item, width: columnResizing.columnWidths[item.id] || item.width })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnResizing, setSettingsColumns]);

  const [settingsFormOpen, setSettingsFormOpen] = useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(false);

  /**
   * Получаем список всех колонок скроллера.
   */
  const columnOptions = React.useMemo(
    () => columns.map(c => ({ value: c.id, label: c.optionLabel || c.Header })).filter(({ label }) => label),
    [columns]
  );

  /**
   * Получаем список id отображаемых на данный момент колонок, за исключением selectionAndExpand.
   */
  const values = React.useMemo(
    () =>
      visibleColumns.reduce((acc: string[], item) => {
        if (item.id !== 'selectionAndExpand') {
          acc.push(item.id);
        }

        return acc;
      }, []),
    [visibleColumns]
  );

  /**
   * Получаем список колонок, которые будут выбраны как дефолтные по признаку isVisible.
   */
  const defaultVisibleColumns = useMemo(
    () =>
      columns.reduce((acc: string[], item) => {
        if (item.id && item.isVisible) {
          acc.push(item.id);
        }

        return acc;
      }, []),
    [columns]
  );

  const openColumnsSettingsForm = React.useCallback(() => {
    const onSubmit = (columnList: string[]) => {
      /**
       * Поскольку в columnList нам приходит массив выбранных для отображения колонок,
       * а в setHiddenColumns надо передать те, которые требуется скрыть, то мы проходимся по всему массиву колонок и
       * извлекаем те, которые не встречаются в columnList.
       */
      const hiddenColumns = columns.reduce((acc: string[], item) => {
        if (item.id && !columnList.includes(item.id)) {
          acc.push(item.id);
        }

        return acc;
      }, []);

      setSettingsColumns(settingColumns.map(item => ({ ...item, isVisible: !!~columnList.indexOf(item.id) })));
      setHiddenColumns(hiddenColumns);
      setSettingsFormOpen(false);
    };

    dialog.show('Settings', SettingsForm, {
      columns: columnOptions.filter(column => column.label) as ICheckboxOption[],
      defaultColumns: defaultVisibleColumns,
      values,
      onSubmit,
      handleClose: () => setSettingsFormOpen(false),
    });
  }, [columnOptions, defaultVisibleColumns, values, columns, setSettingsColumns, settingColumns, setHiddenColumns]);

  const handleOpenSettingsForm = React.useCallback(() => {
    setSettingsFormOpen(true);
    openColumnsSettingsForm();
  }, [openColumnsSettingsForm]);

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
      const res = await fetchData({
        pageSize: paginationState.pageSize,
        page: paginationState.pageIndex,
        multiSort,
      });

      if (res) {
        setRows(res.rows);
        setControlledPageCount(res.pageCount);
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

  const handlePageChange = React.useCallback((pageNumber: number) => goToPage(pageNumber - 1), [goToPage]);

  useEffect(() => {
    if (onSelectedRowsChange) {
      onSelectedRowsChange(selectedFlatRows.map(x => x.original));
    }
  }, [onSelectedRowsChange, selectedFlatRows]);

  const handleRowDoubleClick = React.useCallback(
    (row: Row<T>) => () => {
      onRowDoubleClick(row.original);
    },
    [onRowDoubleClick]
  );

  const handleRowClick = React.useCallback(
    (row: Row<T>) => () => {
      onRowClick(row.original);
    },
    [onRowClick]
  );

  return (
    <>
      <Box className={css.wrapper}>
        <Box {...getTableProps()}>
          {rows.length > 0 &&
            headerGroups.map(headerGroup => (
              // eslint-disable-next-line react/jsx-key
              <Box
                {...headerGroup.getHeaderGroupProps({ role: ROLE.GRID_HEADER })}
                style={{ ...headerGroup.getHeaderGroupProps().style, minWidth, position: 'relative' }}
              >
                {headerGroup.headers.map((column, index) => {
                  const SortIcon = column.isSortedDesc ? ServiceIcons.ArrowDown : ServiceIcons.ArrowUp;

                  const isFirstColumn = index === 0;
                  const isSecondColumn = index === 1;
                  const isLastColumn = index === headerGroup.headers.length - 1;

                  const sortByToggleProps = column.getSortByToggleProps();

                  delete sortByToggleProps.title;

                  let sortDirection = '';

                  if (column.isSorted) {
                    sortDirection = column.isSortedDesc ? 'desc' : 'asc';
                  }

                  const columnResizerProps = column.getResizerProps ? column.getResizerProps() : { style: {} };

                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Box data-name={column.id} {...column.getHeaderProps()}>
                      <WithClickable>
                        {(ref, { hovered }) => (
                          <Horizon
                            ref={ref}
                            data-action={ACTIONS.SORT_DIRECTION}
                            data-direction={sortDirection}
                            data-role={ROLE.BUTTON}
                            {...sortByToggleProps}
                            align={'CENTER'}
                            className={css.header}
                          >
                            {!isFirstColumn && !isSecondColumn && <Gap.SM />}
                            <Typography.TextBold line="COLLAPSE">{column.render('Header')}</Typography.TextBold>
                            {!isFirstColumn && column.canSort && (
                              <WithInfoTooltip extraSmall text={locale.column.tooltip}>
                                {tooltipRef => (
                                  <Box ref={tooltipRef} className={css.sortIconWrapper}>
                                    {(hovered || column.isSorted) && <SortIcon fill={column.isSorted ? 'ACCENT' : 'FAINT'} scale="SM" />}
                                  </Box>
                                )}
                              </WithInfoTooltip>
                            )}
                            <Gap.SM />
                          </Horizon>
                        )}
                      </WithClickable>
                      {!isFirstColumn && !isLastColumn && (
                        <Box
                          border={['FAINT', 'SM']}
                          className={css.verticalSeparator}
                          {...columnResizerProps}
                          style={{
                            ...columnResizerProps.style,

                            borderTop: 'none',
                            borderRight: 'none',
                            borderBottom: 'none',
                          }}
                          title={''}
                        />
                      )}
                    </Box>
                  );
                })}
                {showSettingsButton && (
                  <Box className={css.settingIcon}>
                    <IconButton
                      data-action={ACTIONS.OPEN}
                      data-id="table-settings-button"
                      fill={settingsFormOpen ? 'BASE' : 'FAINT'}
                      icon={Icons.Gear}
                      isActive={settingsFormOpen}
                      onClick={handleOpenSettingsForm}
                    />
                  </Box>
                )}
              </Box>
            ))}

          <Box {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);

              const rowActionButtons = getActionButtons(getAvailableActions(fastActions), executor, [[row.original]]).filter(
                ({ disabled }) => !disabled
              );

              const extendedRowActionButtons = expandedRowActionsGetter
                ? getActionButtons(getAvailableActions(expandedRowActionsGetter(row.original)), executor, [[row.original]])
                : [];

              const visibleRow = visibleOnlySelectedRows ? row.isSelected : true;

              return (
                visibleRow && (
                  <WithClickable key={row.getRowProps().key}>
                    {(ref, { hovered }) => (
                      <React.Fragment key={`rowLayout_${row.getRowProps().key}`}>
                        <Box
                          ref={ref}
                          border={['FAINT', 'SM']}
                          className={css.row}
                          data-id={row.original.id}
                          {...row.getRowProps()}
                          key={`row_${row.getRowProps().key}`}
                          aria-expanded={row.isExpanded}
                          fill={hovered ? 'FAINT' : 'BASE'}
                          style={{
                            ...row.getRowProps().style,

                            borderRight: 'none',
                            borderBottom: 'none',
                            borderLeft: 'none',
                            minWidth,
                          }}
                          onClick={handleRowClick(row)}
                          onDoubleClick={handleRowDoubleClick(row)}
                        >
                          <Box className={css.rowContent} style={{ display: 'flex' }}>
                            {row.cells.map((cell, cellIndex) => (
                              // eslint-disable-next-line react/jsx-key
                              <Box
                                className={cellIndex === 0 || cellIndex === 1 ? firstCellPadding : css.cellPadding}
                                data-field={cell.column.id}
                                {...cell.getCellProps()}
                              >
                                {cell.render('Cell', { refetch })}
                              </Box>
                            ))}
                            {hovered && <FastActionsPanel actions={rowActionButtons} />}
                          </Box>
                          {RowCaptionComponent ? <RowCaptionComponent row={row.original} /> : null}
                          {ExpandedRowComponent && row.isExpanded ? (
                            <ExpandedRowComponent
                              actions={extendedRowActionButtons}
                              row={row.original}
                              {...row.getRowProps()}
                              key={`expanded_${row.getRowProps().key}`}
                              style={{
                                ...row.getRowProps().style,

                                minWidth,
                              }}
                            />
                          ) : null}
                        </Box>
                        {rowIndex === page.length - 1 ? (
                          <Box
                            border={['FAINT', 'SM']}
                            {...row.getRowProps()}
                            key={`divider_${row.getRowProps().key}`}
                            style={{
                              ...row.getRowProps().style,

                              borderTop: 'none',
                              borderRight: 'none',
                              borderLeft: 'none',
                              minWidth,
                            }}
                          />
                        ) : null}
                      </React.Fragment>
                    )}
                  </WithClickable>
                )
              );
            })}
          </Box>
        </Box>
        {!isLoading && rows.length === 0 && <Placeholder height={540} message={placeholderMessage} title={placeholderTitle} />}
        {pageCount > 1 && (
          <FractalPagination
            page={paginationState.pageIndex + 1}
            pageCount={pageCount}
            pageSize={paginationState.pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={setPageSize}
          />
        )}

        <LoaderOverlay opened={isLoading} />

        <Gap />
        <Gap.SM />
        <Gap.X3L />
      </Box>
      {selectedRows && footerActionsGetter && footerContent && selectedRows.length > 0 && (
        <Box className={css.footer}>
          <FractalSelectedRowsInfo actionsGetter={footerActionsGetter(executor)} content={footerContent} selectedRows={selectedRows} />
        </Box>
      )}
    </>
  );
};

DataTable.displayName = 'DataTable';
