import React from 'react';
import type { CellProps } from 'react-table';
import { ACTIONS, Checkbox, Gap, Horizon, ServiceIcons } from '@platform/ui';
import type { RecordCell } from '../types';
import { StopPropagation } from './stop-propagation';

/** Компонент первой ячейки сроки. */
export const CellSelectionAndExpand = <T extends RecordCell>({ row, column }: React.PropsWithChildren<CellProps<T>>) => {
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
};

CellSelectionAndExpand.displayName = 'CellSelectionAndExpand';
