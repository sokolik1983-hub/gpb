import React from 'react';
import { Dash } from 'components/common/form/dash';
import type { OnChangeType } from '@platform/ui';
import { Horizon, Fields } from '@platform/ui';

/** Свойства выбора диапазона дат. */
interface DatesProps {
  /** Признак недоступности компонента. */
  disabled?: boolean;
  /** Ширина поля с датой (начало или конец периода). */
  itemWidth?: number;
  /** Имена полей формы даты начала и конца периода. */
  name: [string, string];
  /** Коллбек при измении поля "Дата с" . */
  onChangeFrom?: OnChangeType<string>;
  /** Коллбек при измении поля "Дата по" . */
  onChangeTo?: OnChangeType<string>;
}

/** Компонент выбора диапазона дат. */
export const DateRange: React.FC<DatesProps> = ({ disabled, itemWidth, name, onChangeFrom, onChangeTo }) => (
  <Horizon>
    <Fields.Date extraSmall disabled={disabled} name={name[0]} width={itemWidth || 178} onChange={onChangeFrom} />
    <Dash />
    <Fields.Date extraSmall disabled={disabled} name={name[1]} width={itemWidth || 178} onChange={onChangeTo} />
  </Horizon>
);

DateRange.displayName = 'DateRange';
