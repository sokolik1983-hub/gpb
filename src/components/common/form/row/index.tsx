import React from 'react';
import type { IHorizonProps } from '@platform/ui';
import { Gap, Horizon, Typography } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента "Row". */
export interface IRowProps {
  /** Название строки формы. */
  label: string;
  /** Выравнивание. */
  align?: IHorizonProps['align'];
}

/** Компонент строки формы. */
export const Row: React.FC<IRowProps> = ({ label, children, align }) => (
  <>
    <Horizon align={align}>
      <Typography.Text className={css.rowLabel}>{label}</Typography.Text>
      {children}
    </Horizon>
    <Gap.XL />
  </>
);

Row.displayName = 'Row';
