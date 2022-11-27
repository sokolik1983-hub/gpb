import type { ReactElement } from 'react';
import React from 'react';
import type { DataTableProps, InfiniteScrollDataTableProps } from 'platform-copies/services';
import type { IBaseEntity } from '@platform/services';
import { Box, Gap, Horizon, Typography } from '@platform/ui';

/** Свойства компонента рендера переданной таблицы с отображением общего количества записей. */
interface DataTableWithTotalProps<T extends IBaseEntity> {
  /** Таблица. */
  children: ReactElement<DataTableProps<T> | InfiniteScrollDataTableProps<T>>;
  /** Лейбл. */
  label: string;
  /** Общее количество записей. */
  total?: number;
}

/** Рендер переданной таблицы с выводом общего количества записей. */
export const DataTableWithTotal = <T extends IBaseEntity>({ children, label, total }: DataTableWithTotalProps<T>) => (
  <>
    <Box>
      <Gap.XS />
      <Horizon>
        <Gap />
        <Gap />
        <Typography.TextBold>{label}</Typography.TextBold>
        <Gap.SM />
        <Typography.Text data-field={'total'}>{total}</Typography.Text>
      </Horizon>
      <Gap.XS />
    </Box>

    {children}
  </>
);

DataTableWithTotal.displayName = 'DataTableWithTotal';
