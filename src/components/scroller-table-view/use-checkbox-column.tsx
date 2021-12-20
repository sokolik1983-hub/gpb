import type { FC, ChangeEvent } from 'react';
import React from 'react';
import type { HeaderProps, CellProps, Hooks } from 'react-table';
import { Checkbox } from '@platform/ui';

/** Компонент заголовка колонки с чекбоксами. */
const Header: FC<HeaderProps<Record<string, any>>> = ({ getToggleAllPageRowsSelectedProps }) => {
  const { checked, indeterminate, onChange } = getToggleAllPageRowsSelectedProps();

  return (
    <Checkbox
      extraSmall
      dimension="SM"
      indeterminate={indeterminate}
      value={checked}
      onChange={(_, e) => e && onChange?.(e as ChangeEvent<HTMLInputElement>)}
    />
  );
};

Header.displayName = 'Header';

/** Ячейка с чекбоксом. */
const Cell: FC<CellProps<Record<string, any>>> = ({ row }) => {
  const { checked, indeterminate, onChange } = row.getToggleRowSelectedProps();

  return (
    <Checkbox
      extraSmall
      dimension="SM"
      indeterminate={indeterminate}
      value={checked}
      onChange={(_, e) => e && onChange?.(e as ChangeEvent<HTMLInputElement>)}
    />
  );
};

Cell.displayName = 'Cell';

const SELECTION_COLUMN_DEFAULT_WIDTH = 32;

export const SELECT_COLUMN_ID = 'SELECT_COLUMN_ID';

/** Плагин для react-table. Добавляет колонку с чекбоксами. */
export const useCheckboxColumn = <T extends Record<string, any>>(hooks: Hooks<T>) => {
  hooks.visibleColumns.push(columns => [
    {
      id: SELECT_COLUMN_ID,
      width: SELECTION_COLUMN_DEFAULT_WIDTH,
      minWidth: SELECTION_COLUMN_DEFAULT_WIDTH,
      maxWidth: SELECTION_COLUMN_DEFAULT_WIDTH,
      disableSortBy: true,
      disableResizing: true,
      Header,
      Cell,
    },
    ...columns,
  ]);
};

useCheckboxColumn.pluginName = 'useCheckboxColumn';
