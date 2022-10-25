import React from 'react';
import { FilterLine, Typography } from '@platform/ui';

/** Свойства компонента FilterFormElement. */
interface IFilterFormElementProps {
  /** Лейбл элемента формы. */
  label: string;
  /** Ширина места под лейбл. */
  labelWidth?: number;
  /** Поле формы. */
  children: React.ReactNode;
}

/** Элемент фильтра. Помогает выровнять левую границу полей формы. */
export const FilterFormElement: React.FC<IFilterFormElementProps> = ({ label, children, labelWidth = 174 }) => (
  <FilterLine labelWidth={labelWidth} text={<Typography.P>{label}</Typography.P>}>
    {children}
  </FilterLine>
);

FilterFormElement.displayName = 'FilterFormElement';
