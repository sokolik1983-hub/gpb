import type React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { CellAccessibilityProps, UseAccessibility, TabindexValue } from 'components/scroller-table-view/accessibility/types';
import { ARIA_SORT } from 'components/scroller-table-view/accessibility/types';
import type { RecordCell } from 'components/scroller-table-view/types';
import { uniqueId } from 'lodash';
import type { ColumnInstance, TableInstance } from 'react-table';

/** Тип фокуса ячейки. */
enum CELL_FOCUS_TYPE {
  /** На самой ячейке. */
  SELF = 'SELF',
  /** На интерактивном элементе внутри ячейки. */
  INNER = 'INNER',
  /** На интерактивном элементе (если их несколько) внутри ячейки. */
  INNER_LIST = 'INNER_LIST',
}

/** Список используемых системных клавиш для комбинации. */
const HOT_KEYS = ['Control', 'Shift'];

/** Хук ассебилити таблицы. */
export const useAccessibility = <Row extends RecordCell, Column extends RecordCell>({
  allColumns,
  headerGroups,
  rows,
  toggleSortBy,
  visibleColumns,
}: TableInstance<Column>): UseAccessibility<Row> => {
  /** Идентификатор таблицы. */
  const tableId = uniqueId('table_');

  /** В рефе хранится зажатая системная клавиша, например `Control`, `Shift`. */
  const pressedSystemKey = useRef('');

  const [focusedRow, setFocusedRow] = useState(0);
  const [focusedColumn, setFocusedColumn] = useState(0);
  const [focusedColumnId, setFocusedColumnId] = useState<keyof Row>();
  const [cellFocusType, setCellFocusType] = useState<CELL_FOCUS_TYPE>();
  const [focusesInsideCellCount, setFocusesInsideCellCount] = useState(0);
  const [focusesInsideCellIndex, setFocusesInsideCellIndex] = useState(0);

  /** Метод получения индекса колонки в таблице по ее идентификатору. */
  const getColumnIndex = useCallback((columnId: keyof Row) => visibleColumns.findIndex(({ id }) => id === columnId), [visibleColumns]);

  /** Получить значение свойства колонки по переданному ключу. */
  const getColumnProperty = useCallback((property: keyof ColumnInstance<Column>) => visibleColumns[focusedColumn][property], [
    visibleColumns,
    focusedColumn,
  ]);

  /** Метод получения идентификатора колонки сфокусированной ячейки. */
  const getColumnId = useCallback(() => getColumnProperty('id'), [getColumnProperty]);

  /** Количество строк таблицы (заголовки + данные). */
  const tableRowCount = useMemo(() => headerGroups.length + rows.length, [headerGroups.length, rows.length]);

  /** Метод получения индекса строки тела таблицы. */
  const getBodyRowIndex = useCallback((row: number) => row + headerGroups.length, [headerGroups.length]);

  /** Метод получения типа сортировки. */
  const getSortType = useCallback((descending?: boolean): ARIA_SORT => {
    if (descending === true) {
      return ARIA_SORT.DESCENDING;
    } else if (descending === false) {
      return ARIA_SORT.ASCENDING;
    }

    return ARIA_SORT.NONE;
  }, []);

  /**
   * Метод получения табиндекса ячейки таблицы.
   *
   * @param row - Номер строки таблицы.
   * @param columnId - Идентификатор колонки таблицы.
   */
  const getCellTabindex = useCallback(
    (row: number, columnId: keyof Row): TabindexValue => (getBodyRowIndex(row) === focusedRow && columnId === getColumnId() ? 0 : -1),
    [focusedRow, getBodyRowIndex, getColumnId]
  );

  /**
   * Метод получения DOM-элемента ячейки.
   */
  const getCellElement = useCallback(
    (row: number, column: number) => document.querySelector(`[data-table="${tableId}"][data-row="${row}"][data-column="${column}"]`),
    [tableId]
  );

  /**
   * Обработчик получения фокуса ячейки.
   *
   * @param columnId - Идентификатор колонки таблицы.
   */
  const handleFocus = useCallback((columnId: keyof Row) => () => setFocusedColumnId(columnId), []);

  /**
   * Метод установки фокуса на внутреннем элементе ячейки.
   */
  const setFocusInternalElement = useCallback(
    (index: number) => {
      const cellElement = getCellElement(focusedRow, focusedColumn) as HTMLElement;

      const focusedInternalElement = cellElement.querySelector(`[data-inner-focus][data-inner-focus-index="${index}"]`) as HTMLElement;

      focusedInternalElement.focus();
    },
    [focusedRow, focusedColumn, getCellElement]
  );

  /**
   * Устанавливает в реф зажатую системную клавишу и возвращает флаг.
   *
   * @param key - Ключ клавиши клавиатуры.
   */
  const isSystemKeyPressedAndSet = useCallback(
    (key: string) => {
      if (HOT_KEYS.includes(key)) {
        pressedSystemKey.current = key;

        return true;
      }

      return false;
    },
    [pressedSystemKey]
  );

  /**
   * Метод установки новых данных о сфокусированной ячейке.
   *
   * @param code - Код клавиши клавиатуры.
   */
  const setNewFocusedData = useCallback(
    (key: string): void => {
      let newFocusedRow = focusedRow;
      let newFocusedColumn = focusedColumn;
      let changed = false;

      if (pressedSystemKey.current) {
        if (pressedSystemKey.current === 'Control') {
          if (key === 'Home') {
            newFocusedColumn = 0;
            newFocusedRow = 0;
            changed = true;
          } else if (key === 'End') {
            newFocusedColumn = visibleColumns.length - 1;
            newFocusedRow = tableRowCount - 1;
            changed = true;
          }
        } else if (pressedSystemKey.current === 'Shift' && key === 'Tab') {
          if (focusedColumn === 0) {
            newFocusedColumn = visibleColumns.length - 1;
            newFocusedRow -= 1;

            if (newFocusedRow >= 0) {
              changed = true;
            }
          } else {
            newFocusedColumn -= 1;
            changed = true;
          }
        }
      } else if (key === 'Tab') {
        if (focusedColumn === visibleColumns.length - 1) {
          newFocusedColumn = 0;
          newFocusedRow += 1;

          if (newFocusedRow < tableRowCount) {
            changed = true;
          }
        } else {
          newFocusedColumn += 1;
          changed = true;
        }
      } else if (key === 'ArrowRight') {
        if (focusedColumn < visibleColumns.length - 1) {
          newFocusedColumn += 1;
          changed = true;
        }
      } else if (key === 'ArrowLeft') {
        if (focusedColumn > 0) {
          newFocusedColumn -= 1;
          changed = true;
        }
      } else if (key === 'ArrowDown') {
        if (focusedRow < tableRowCount - 1) {
          newFocusedRow += 1;
          changed = true;
        }
      } else if (key === 'ArrowUp') {
        if (focusedRow > 0) {
          newFocusedRow -= 1;
          changed = true;
        }
      } else if (key === 'PageDown') {
        if (focusedRow < tableRowCount - 1) {
          newFocusedRow = tableRowCount - 1;
          changed = true;
        }
      } else if (key === 'PageUp') {
        if (focusedRow > 0) {
          newFocusedRow = 0;
          changed = true;
        }
      } else if (key === 'Home') {
        if (focusedColumn > 0) {
          newFocusedColumn = 0;
          changed = true;
        }
      } else if (key === 'End' && focusedColumn < visibleColumns.length - 1) {
        newFocusedColumn = visibleColumns.length - 1;
        changed = true;
      }

      if (changed) {
        const cellElement = getCellElement(newFocusedRow, newFocusedColumn) as HTMLElement;

        if (cellElement) {
          const focusedInternalElements = cellElement.querySelectorAll('[data-inner-focus]');

          let newCellFocusType: CELL_FOCUS_TYPE;

          if (focusedInternalElements.length > 0) {
            newCellFocusType = CELL_FOCUS_TYPE.INNER_LIST;

            if (focusedInternalElements.length === 1 && focusedInternalElements[0]) {
              newCellFocusType = CELL_FOCUS_TYPE.INNER;

              (focusedInternalElements[0] as HTMLElement).focus();
            } else {
              cellElement.focus();
            }
          } else {
            newCellFocusType = CELL_FOCUS_TYPE.SELF;

            cellElement.focus();
          }

          setFocusedRow(newFocusedRow);
          setFocusedColumn(newFocusedColumn);
          setCellFocusType(newCellFocusType);
          setFocusesInsideCellCount(focusedInternalElements.length);
        }
      }
    },
    [
      focusedColumn,
      focusedRow,
      getCellElement,
      setCellFocusType,
      setFocusedColumn,
      setFocusesInsideCellCount,
      setFocusedRow,
      tableRowCount,
      visibleColumns,
    ]
  );

  /**
   * Обработчик нажатия клавиши клавиатуры на ячейке тела таблицы.
   *
   * @param event - События нажатия клавиши клавиатуры.
   */
  const handleKeyDownForCell: React.KeyboardEventHandler = useCallback(
    event => {
      event.preventDefault();

      if (isSystemKeyPressedAndSet(event.key)) {
        return;
      }

      if (cellFocusType === CELL_FOCUS_TYPE.INNER_LIST) {
        event.key === 'Enter' || event.key === 'F2' ? setFocusInternalElement(0) : setNewFocusedData(event.key);
      } else if (event.key === 'Enter' || event.key === ' ') {
        const element = event.target as HTMLElement;

        element.click();
      } else {
        setNewFocusedData(event.key);
      }
    },
    [cellFocusType, isSystemKeyPressedAndSet, setFocusInternalElement, setNewFocusedData]
  );

  /**
   * Обработчик нажатия клавиши клавиатуры на ячейке с внутресфокусированным элементом.
   *
   * @param event - События нажатия клавиши клавиатуры.
   */
  const handleKeyDownForCellInner: React.KeyboardEventHandler = useCallback(
    event => {
      event.preventDefault();

      if (cellFocusType === CELL_FOCUS_TYPE.INNER || cellFocusType === CELL_FOCUS_TYPE.INNER_LIST) {
        event.stopPropagation();

        if (cellFocusType === CELL_FOCUS_TYPE.INNER_LIST) {
          if (event.key === 'Space' || event.key === 'F2') {
            const cellElement = getCellElement(focusedRow, focusedColumn) as HTMLElement;

            cellElement.focus();
          } else if (event.key === 'Enter') {
            const element = event.target as HTMLElement;

            element.click();
          } else {
            let newInnerFocusIndex = focusesInsideCellIndex;

            if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
              newInnerFocusIndex = focusesInsideCellIndex === focusesInsideCellCount - 1 ? 0 : focusesInsideCellIndex + 1;
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
              newInnerFocusIndex = focusesInsideCellIndex === 0 ? focusesInsideCellCount - 1 : focusesInsideCellIndex - 1;
            }

            setFocusInternalElement(newInnerFocusIndex);
            setFocusesInsideCellIndex(newInnerFocusIndex);
          }
        } else if (event.key === 'Enter' || event.key === ' ') {
          const element = event.target as HTMLElement;

          element.click();
        } else {
          setNewFocusedData(event.key);
        }
      }
    },
    [
      cellFocusType,
      focusesInsideCellIndex,
      focusedColumn,
      focusedRow,
      focusesInsideCellCount,
      getCellElement,
      setFocusInternalElement,
      setFocusesInsideCellIndex,
      setNewFocusedData,
    ]
  );

  /**
   * Обработчик нажатия клавиши клавиатуры на ячейке шапки таблицы.
   *
   * @param event - События нажатия клавиши клавиатуры.
   */
  const handleKeyDownForHeaderCell: React.KeyboardEventHandler = useCallback(
    event => {
      event.preventDefault();

      if (isSystemKeyPressedAndSet(event.key)) {
        return;
      }

      if (event.key === 'Enter') {
        if (getColumnProperty('canSort') && focusedColumnId) {
          toggleSortBy(focusedColumnId);
        }
      } else {
        setNewFocusedData(event.key);
      }
    },
    [focusedColumnId, isSystemKeyPressedAndSet, getColumnProperty, setNewFocusedData, toggleSortBy]
  );

  /**
   * Обработчик отжатия клавиши клавиатуры на ячейке шапки и тела таблицы.
   *
   * @param event - События отжатия клавиши клавиатуры.
   */
  const handleKeyUp: React.KeyboardEventHandler = event => {
    if (HOT_KEYS.includes(event.key)) {
      pressedSystemKey.current = '';
    }
  };

  /**
   * Метод получения ассебилити-пропсов таблицы.
   */
  const getTableAccessibilityProps: UseAccessibility['getTableAccessibilityProps'] = useCallback(
    () => ({
      'aria-colcount': allColumns.length,
      'aria-rowcount': rows.length,
    }),
    [allColumns.length, rows.length]
  );

  /**
   * Метод получения ассебилити-пропсов строки.
   */
  const getRowAccessibilityProps: UseAccessibility['getRowAccessibilityProps'] = useCallback(
    () => ({
      'aria-rowindex': focusedRow + 1,
    }),
    [focusedRow]
  );

  /**
   * Метод получения ассебилити-пропсов ячейки тела таблицы.
   *
   * @param row - Номер текущей строки тела таблицы.
   * @param columnId - Идентификатор колонки.
   */
  const getCellAccessibilityProps: UseAccessibility['getCellAccessibilityProps'] = useCallback(
    (row, columnId): CellAccessibilityProps => ({
      onFocus: handleFocus(columnId),
      onKeyDown: handleKeyDownForCell,
      onKeyUp: handleKeyUp,
      tabindex: getCellTabindex(row, columnId),
      'aria-colindex': getColumnIndex(columnId) + 1,
      'data-table': tableId,
      'data-row': getBodyRowIndex(row),
      'data-column': getColumnIndex(columnId),
    }),
    [getBodyRowIndex, getColumnIndex, getCellTabindex, handleFocus, handleKeyDownForCell, tableId]
  );

  /**
   * Метод получения ассебилити-пропсов ячейки тела таблицы для сфокусированного элемента внутри ячейки.
   *
   * @param row - Номер текущей строки тела таблицы.
   * @param columnId - Идентификатор колонки.
   * @param index - Порядковый номер элемента для получения фокуса, если их несколько в ячейке.
   */
  const getCellAccessibilityInnerFocusProps: UseAccessibility['getCellAccessibilityInnerFocusProps'] = useCallback(
    (row, columnId, index) => ({
      onKeyDown: handleKeyDownForCellInner,
      tabindex: getCellTabindex(row, columnId),
      'data-inner-focus': true,
      'data-inner-focus-index': index,
    }),
    [handleKeyDownForCellInner, getCellTabindex]
  );

  /**
   * Метод получения ассебилити-пропсов ячейки шапки.
   *
   * @param columnId - Идентификатор колонки.
   * @param depth - Номер текущей строки шапки таблицы.
   * @param descending - Флаг сортировки по убыванию.
   */
  const getHeaderCellAccessibilityProps: UseAccessibility['getHeaderCellAccessibilityProps'] = useCallback(
    ({ columnId, depth = 0, descending }) => ({
      onFocus: handleFocus(columnId),
      onKeyDown: handleKeyDownForHeaderCell,
      onKeyUp: handleKeyUp,
      tabindex: depth === focusedRow && columnId === getColumnId() ? 0 : -1,
      'aria-colindex': getColumnIndex(columnId) + 1,
      'data-table': tableId,
      'data-row': depth,
      'data-column': getColumnIndex(columnId),
      'aria-sort': getSortType(descending),
    }),
    [focusedRow, getColumnId, getColumnIndex, getSortType, handleFocus, handleKeyDownForHeaderCell, tableId]
  );

  return {
    getCellAccessibilityProps,
    getHeaderCellAccessibilityProps,
    getCellAccessibilityInnerFocusProps,
    getRowAccessibilityProps,
    getTableAccessibilityProps,
  };
};
