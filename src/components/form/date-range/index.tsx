import React from 'react';
import { Dash } from 'components/form/dash';
import { Box, Horizon, Fields } from '@platform/ui';
import css from './styles.scss';

/** Свойства выбора диапазона дат. */
interface DatesProps {
  name: [string, string];
  onChange?(): void;
}

/** Компонент выбора диапазона дат. */
export const DateRange: React.FC<DatesProps> = ({ name, onChange }) => (
  <Horizon>
    <Box className={css.date}>
      <Fields.Date extraSmall name={name[0]} onChange={onChange} />
    </Box>
    <Dash />
    <Box className={css.date}>
      <Fields.Date extraSmall name={name[1]} onChange={onChange} />
    </Box>
  </Horizon>
);

DateRange.displayName = 'DateRange';
