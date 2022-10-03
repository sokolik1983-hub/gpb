import React from 'react';
import { Dash } from 'components/common/form/dash';
import type { OnChangeType } from '@platform/ui';
import { Horizon, Fields } from '@platform/ui';

/** Свойства выбора диапазона дат. */
interface DatesProps {
  name: [string, string];
  /** Коллбек при измении поля "Дата с" . */
  onChangeFrom?: OnChangeType<string>;
  /** Коллбек при измении поля "Дата по" . */
  onChangeTo?: OnChangeType<string>;
  disabled?: boolean;
}

/** Компонент выбора диапазона дат. */
export const DateRange: React.FC<DatesProps> = ({ name, onChangeFrom, onChangeTo, disabled }) => (
  <Horizon>
    <Fields.Date extraSmall disabled={disabled} name={name[0]} width={178} onChange={onChangeFrom} />
    <Dash />
    <Fields.Date extraSmall disabled={disabled} name={name[1]} width={178} onChange={onChangeTo} />
  </Horizon>
);

DateRange.displayName = 'DateRange';
