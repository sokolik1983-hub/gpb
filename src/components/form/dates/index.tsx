import React, { useCallback } from 'react';
import { Dash } from 'components/form/dash';
import { DATE_PERIODS } from 'interfaces';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { useForm } from 'react-final-form';
import { Box, Fields } from '@platform/ui';
import css from './styles.scss';

/** Компонент выбора дат. */
export const Dates: React.FC = () => {
  const { change } = useForm();

  const onDateChange = useCallback(() => change(FORM_FIELDS.PERIOD_TYPE, DATE_PERIODS.SELECT_PERIOD), [change]);

  return (
    <>
      <Box className={css.date}>
        <Fields.Date extraSmall name={FORM_FIELDS.DATE_FROM} onChange={onDateChange} />
      </Box>
      <Dash />
      <Box className={css.date}>
        <Fields.Date extraSmall name={FORM_FIELDS.DATE_TO} onChange={onDateChange} />
      </Box>
    </>
  );
};

Dates.displayName = 'Dates';
