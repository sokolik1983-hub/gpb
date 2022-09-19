import React from 'react';
import { Dash } from 'components/form/dash';
import type { OnChangeType } from '@platform/ui';
import { Horizon, Fields } from '@platform/ui';

/** Свойства выбора диапазона дат. */
interface DatesProps {
  name: [string, string];
  /** Коллбек при измении поля "Дата с" . */
  onChangeFrom?: OnChangeType<string>;
  /** Коллбек при измении поля "Дата по" . */
  onChangeTo?: OnChangeType<string>;
}

/** Компонент выбора диапазона дат. */
export const DateRange: React.FC<DatesProps> = ({ name, onChangeFrom, onChangeTo }) => (
  <Horizon>
    <Fields.Date extraSmall name={name[0]} width={178} onChange={onChangeFrom} />
    <Dash />
    <Fields.Date extraSmall name={name[1]} width={178} onChange={onChangeTo} />
  </Horizon>
);

DateRange.displayName = 'DateRange';
