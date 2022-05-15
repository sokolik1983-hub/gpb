import React from 'react';
import { Dash } from 'components/form/dash';
import { Horizon, Fields } from '@platform/ui';

/** Свойства выбора диапазона дат. */
interface DatesProps {
  name: [string, string];
  onChange?(): void;
}

/** Компонент выбора диапазона дат. */
export const DateRange: React.FC<DatesProps> = ({ name, onChange }) => (
  <Horizon>
    <Fields.Date extraSmall name={name[0]} width={178} onChange={onChange} />
    <Dash />
    <Fields.Date extraSmall name={name[1]} width={178} onChange={onChange} />
  </Horizon>
);

DateRange.displayName = 'DateRange';
