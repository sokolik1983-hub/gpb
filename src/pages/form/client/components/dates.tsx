import React, { useEffect } from 'react';
import { useDateRangeRestriction } from 'hooks';
import { DATE_PERIODS } from 'interfaces';
import { Dash } from 'pages/form/client/components/dash';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { useForm } from 'react-final-form';
import { useFormValues } from 'utils/hooks/use-form-values';
import { Box, Fields } from '@platform/ui';
import css from './styles.scss';

export const Dates: React.FC = () => {
  const { change } = useForm();
  const values = useFormValues();

  useEffect(() => {
    change(FORM_FIELDS.PERIOD_TYPE, DATE_PERIODS.SELECT_PERIOD);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.dateFrom, values.dateTo]);

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
