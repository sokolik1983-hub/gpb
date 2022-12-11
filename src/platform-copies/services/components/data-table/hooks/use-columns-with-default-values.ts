import { useMemo } from 'react';
import type { IBaseEntity } from '@platform/services';
import type { TableColumn } from '../types';

/**
 * Хук, возвращающий колонки таблицы.
 *
 * @param columns - Колонки для отображения.
 * */
// @param savedColumns - Сохраненные колонки для отображения (в localStorage).
export const useColumnsWithDefaultValues = <T extends IBaseEntity>(
  columns: TableColumn<T>
): TableColumn<T> => // savedColumns: TableColumn<T>
  useMemo(
    () =>
      columns.map(item =>
        // const storageColumn = savedColumns.find(({ id }) => item.id === id);

        ({
          minWidth: item.disableResizing ? Number(item.width) : 0,
          maxWidth: item.disableResizing ? Number(item.width) : Number.POSITIVE_INFINITY,
          ...item,
          // width: storageColumn?.width,
        })
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns]
  );
