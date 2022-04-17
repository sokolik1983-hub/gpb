import React, { useCallback } from 'react';
import { Dash } from 'components/form/dash';
import { DATE_PERIODS } from 'interfaces';
import { useForm } from 'react-final-form';
import { FORM_FIELDS } from 'stream-constants/form';
import { Box, Fields } from '@platform/ui';
import css from './styles.scss';

/** Компонент выбора дат. */
export const Dates: React.FC = () => {
  const { change } = useForm();

  const onChangeDate = useCallback(() => change(FORM_FIELDS.PERIOD_TYPE, DATE_PERIODS.SELECT_PERIOD), [change]);

  return (
    <>
      <Box className={css.date}>
        <Fields.Date extraSmall name={FORM_FIELDS.DATE_FROM} onChange={onChangeDate} />
      </Box>
      <Dash />
      <Box className={css.date}>
        <Fields.Date extraSmall name={FORM_FIELDS.DATE_TO} onChange={onChangeDate} />
      </Box>
    </>
  );
};

Dates.displayName = 'Dates';
