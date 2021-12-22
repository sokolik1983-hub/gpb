import React, { useEffect } from 'react';
import { useDateRangeRestriction } from 'hooks';
import { DATE_PERIODS } from 'interfaces';
import { Dash } from 'pages/form/client/components/dash';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { useForm, useFormState } from 'react-final-form';
import { Box, Fields } from '@platform/ui';
import css from './styles.scss';

/** Компонент выбора дат. */
export const Dates: React.FC = () => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();

  useEffect(() => {
    change(FORM_FIELDS.PERIOD_TYPE, DATE_PERIODS.SELECT_PERIOD);
  }, [change, values.dateFrom, values.dateTo]);

  useDateRangeRestriction({
    dateFromName: FORM_FIELDS.DATE_FROM,
    dateToName: FORM_FIELDS.DATE_TO,
    dateFrom: values.dateFrom,
    dateTo: values.dateTo,
  });

  return (
    <>
      <Box className={css.date}>
        <Fields.Date extraSmall name={FORM_FIELDS.DATE_FROM} />
      </Box>
      <Dash />
      <Box className={css.date}>
        <Fields.Date extraSmall name={FORM_FIELDS.DATE_TO} />
      </Box>
    </>
  );
};

Dates.displayName = 'Date';
