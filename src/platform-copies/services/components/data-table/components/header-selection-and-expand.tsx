import React, { useCallback } from 'react';
import type { HeaderProps } from 'react-table';
import { Checkbox, Gap, Horizon, ServiceIcons } from '@platform/ui';
import type { RecordCell } from '../types';
import { StopPropagation } from './stop-propagation';

/** Компонент заголовка первой колонки. */
export const HeaderSelectionAndExpand = <T extends RecordCell>({
  column,
  getToggleAllPageRowsSelectedProps,
  getToggleAllRowsExpandedProps,
  isAllRowsExpanded,
}: React.PropsWithChildren<HeaderProps<T>>) => {
  const { checked, indeterminate, onChange } = getToggleAllPageRowsSelectedProps();

  const handleChange = useCallback((_, e) => onChange?.((e as unknown) as React.ChangeEvent), [onChange]);

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
};

HeaderSelectionAndExpand.displayName = 'HeaderSelectionAndExpand';
