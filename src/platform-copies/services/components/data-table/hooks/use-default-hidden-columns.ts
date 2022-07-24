import { useMemo } from 'react';
import type { IBaseEntity } from '@platform/services';
import type { TableColumn } from '../types';

/**
 * Хук, возвращающий список скрытых по умолчанию колонок по признаку isVisible === false.
 *
 * @param savedColumns - Сохраненные колонки для отображения (в localStorage).
 * */
export const useDefaultHiddenColumns = <T extends IBaseEntity>(savedColumns: TableColumn<T>): string[] =>
  useMemo(
    () =>
      savedColumns.reduce((acc: string[], item) => {
        if (!item.isVisible) {
          acc.push(String(item.id));
        }

        return acc;
      }, []),
    [savedColumns]
  );
