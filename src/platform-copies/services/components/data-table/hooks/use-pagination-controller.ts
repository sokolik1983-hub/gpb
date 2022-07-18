import React from 'react';
import { locale } from 'localization';
import type { UsePaginationState } from 'react-table';

export const DEFAULT_PAGE_SIZE = 25;
export const DEFAULT_PAGINATION_STATE: UsePaginationState<any> = { pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE };

/**
 * Хук для удобства управлением пейджинацией в DataGrid.
 * Сделан для возможности расшаривания управления пейджинации вне компонента.
 * Добавляет 2 варианта работы с пейджинацией: controlled и uncontrolled.
 *
 * @param paginationState Состояние пейджинации в controlled режиме.
 * @param defaultPaginationState Дефолтное состояние пейджинации в uncontrolled режиме.
 * @param onPaginationChange Обработчик изменения состояния пейджинации.
 * @returns Состояние пейджинации и методы для его изменения.
 * @throws Error Ошибка о смене режима работы пейджинации во время работы компонента.
 */
export const usePaginationController = <T extends Record<string, unknown>>(
  paginationState: UsePaginationState<T> | undefined,
  defaultPaginationState: UsePaginationState<T> | undefined = DEFAULT_PAGINATION_STATE,
  onPaginationChange: (paginationState: UsePaginationState<T>) => void = () => null
) => {
  const { current: controlledPagination } = React.useRef(!!paginationState);

  if (controlledPagination && !paginationState) {
    throw new Error(locale.errors.datatable.paginationModeError);
  }

  const [internalPaginationState, setInternalPaginationState] = React.useState(defaultPaginationState);
  const resultPaginationState = controlledPagination ? paginationState : internalPaginationState;

  const goToPage = React.useCallback(
    (newPageIndex: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const newState: UsePaginationState<T> = { ...resultPaginationState!, pageIndex: newPageIndex };

      if (!controlledPagination) {
        setInternalPaginationState(newState);
      }

      if (onPaginationChange) onPaginationChange(newState);
    },
    [controlledPagination, resultPaginationState, onPaginationChange, setInternalPaginationState]
  );

  const setPageSize = React.useCallback(
    (newPageSize: number) => {
      const newState: UsePaginationState<T> = { pageIndex: DEFAULT_PAGINATION_STATE.pageIndex, pageSize: newPageSize };

      if (!controlledPagination) {
        setInternalPaginationState(newState);
      }

      if (onPaginationChange) onPaginationChange(newState);
    },
    [controlledPagination, onPaginationChange, setInternalPaginationState]
  );

  return {
    paginationState: resultPaginationState,
    goToPage,
    setPageSize,
  };
};
