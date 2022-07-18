import { act, renderHook } from '@testing-library/react-hooks';
import { locale } from 'localization';
import type { UsePaginationState } from 'react-table';
import { usePaginationController, DEFAULT_PAGINATION_STATE } from '../hooks';

interface HookProps {
  paginationState: UsePaginationState<any> | undefined;
  defaultPaginationState: UsePaginationState<any> | undefined;
}

describe('DataTable', () => {
  describe('usePaginationController', () => {
    it('должен запрещать менять режим uncontrollable <-> controllable во время работы', () => {
      const { result, rerender } = renderHook<HookProps, ReturnType<typeof usePaginationController>>(
        ({ paginationState, defaultPaginationState }) => usePaginationController(paginationState, defaultPaginationState, () => null),
        { initialProps: { paginationState: { pageIndex: 25, pageSize: 25 }, defaultPaginationState: undefined } }
      );

      rerender({ paginationState: undefined, defaultPaginationState: { pageIndex: 50, pageSize: 50 } });

      expect(result.error?.message).toBe(locale.errors.datatable.paginationModeError);
    });

    describe('Uncontrollable режим', () => {
      it('по-умолчанию должен использовать uncontrolled режим с дефолтными параметрами', () => {
        const { result } = renderHook(() => usePaginationController(undefined, undefined, () => null));

        expect(result.current.paginationState).toStrictEqual(DEFAULT_PAGINATION_STATE);
      });

      it('должен использовать переданные значения по-умолчанию', () => {
        const { result } = renderHook(() => usePaginationController(undefined, { pageIndex: 20, pageSize: 100 }, () => null));

        expect(result.current.paginationState).toStrictEqual({ pageIndex: 20, pageSize: 100 });
      });

      it('должен изменять стартовый индекс страницы с помощью goToPage', () => {
        const { result } = renderHook(() => usePaginationController(undefined, undefined, () => null));

        act(() => {
          result.current.goToPage(20);
        });

        expect(result.current.paginationState?.pageIndex).toBe(20);
      });

      it('должен изменять размер страницы с помощью goToPage', () => {
        const { result } = renderHook(() => usePaginationController(undefined, { pageIndex: 25, pageSize: 50 }, () => null));

        act(() => {
          result.current.setPageSize(100);
        });

        // Изменение размера страницы сбрасывает pageIndex на 0
        expect(result.current.paginationState).toStrictEqual({ pageIndex: 0, pageSize: 100 });
      });

      it('должен сообщать об изменениях пейджинации после вызова goToPage', () => {
        const onPaginationChange = jest.fn();
        const { result } = renderHook(() => usePaginationController(undefined, undefined, onPaginationChange));

        act(() => {
          result.current.goToPage(20);
        });

        expect(onPaginationChange).toHaveBeenCalledWith({ ...DEFAULT_PAGINATION_STATE, pageIndex: 20 });
      });

      it('должен сообщать об изменениях пейджинации после вызова setPageSize', () => {
        const onPaginationChange = jest.fn();
        const { result } = renderHook(() => usePaginationController(undefined, undefined, onPaginationChange));

        act(() => {
          result.current.setPageSize(100);
        });

        expect(onPaginationChange).toHaveBeenCalledWith({ ...DEFAULT_PAGINATION_STATE, pageSize: 100 });
      });
    });

    describe('Controllable режим', () => {
      it('должен включаться при передаче paginationState', () => {
        const { result } = renderHook(() => usePaginationController({ pageIndex: 25, pageSize: 120 }, undefined, () => null));

        expect(result.current.paginationState).toStrictEqual({ pageIndex: 25, pageSize: 120 });
      });

      it('должен сообщать об изменениях пейджинации после вызова goToPage, но не изменять состояние', () => {
        const onPaginationChange = jest.fn();
        const { result } = renderHook(() => usePaginationController({ pageIndex: 50, pageSize: 50 }, undefined, onPaginationChange));

        act(() => {
          result.current.goToPage(100);
        });

        expect(onPaginationChange).toHaveBeenCalledWith({ pageIndex: 100, pageSize: 50 });
        expect(result.current.paginationState).toStrictEqual({ pageIndex: 50, pageSize: 50 });
      });

      it('должен сообщать об изменениях пейджинации после вызова setPageSize, но не изменять состояние', () => {
        const onPaginationChange = jest.fn();
        const { result } = renderHook(() => usePaginationController({ pageIndex: 50, pageSize: 50 }, undefined, onPaginationChange));

        act(() => {
          result.current.setPageSize(25);
        });

        // Изменение размера страницы сбрасывает pageIndex на 0
        expect(onPaginationChange).toHaveBeenCalledWith({ pageIndex: 0, pageSize: 25 });
        expect(result.current.paginationState).toStrictEqual({ pageIndex: 50, pageSize: 50 });
      });
    });
  });
});
