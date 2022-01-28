import React from 'react';
import { Box, Gap, Horizon, Typography } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента "Row". */
export interface IRowProps {
  /** Название строки формы. */
  label: string;
}

/** Компонент строки формы. */
export const Row: React.FC<IRowProps> = ({ label, children }) => (
  <>
    <Box className={css.row}>
      <Typography.Text className={css.rowLabel}>{label}</Typography.Text>
      <Gap />
      <Box className={css.rowChildren}>
        <Horizon>{children}</Horizon>
      </Box>
    </Box>
    <Gap.XL />
  </>
);

Row.displayName = 'Row';
