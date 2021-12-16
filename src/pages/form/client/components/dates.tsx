import React from 'react';
import { Dash } from 'pages/form/client/components/dash';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { Box, Fields } from '@platform/ui';
import css from './styles.scss';

export const Dates: React.FC = () => (
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

Dates.displayName = 'Date';
