import type { FC, ChangeEvent } from 'react';
import React from 'react';
import { StopPropagation } from 'components/stop-propagation';
import { COLUMN_PADDING_TYPES } from 'interfaces';
import type { HeaderProps, CellProps, Hooks } from 'react-table';
import { Checkbox } from '@platform/ui';
import { FIELD_NAMES } from './constants';

/** Компонент заголовка колонки с чекбоксами. */
const Header: FC<HeaderProps<Record<string, any>>> = ({ getToggleAllPageRowsSelectedProps }) => {
  const { checked, indeterminate, onChange } = getToggleAllPageRowsSelectedProps();

  return (
    <Checkbox
      extraSmall
      dimension="SM"
      indeterminate={indeterminate}
      name={FIELD_NAMES.HEADER_CHECKBOX}
      value={checked}
      onChange={(_, e) => e && onChange?.(e as ChangeEvent<HTMLInputElement>)}
    />
  );
};

Header.displayName = 'Header';

type CheckboxCellProps = CellProps<Record<string, any>>;

/** Ячейка с чекбоксом. */
const Cell: FC<CheckboxCellProps> = ({ row }) => {
  const { checked, indeterminate, onChange } = row.getToggleRowSelectedProps();

  return (
    <StopPropagation>
      <Checkbox
        extraSmall
        dimension="SM"
        indeterminate={indeterminate}
        name={'checkboxCell'}
        value={checked}
        onChange={(_, e) => e && onChange?.(e as ChangeEvent<HTMLInputElement>)}
      />
    </StopPropagation>
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
      paddingType: COLUMN_PADDING_TYPES.RIGHT_REDUCED,
    },
    ...columns,
  ]);
};

useCheckboxColumn.pluginName = 'useCheckboxColumn';
