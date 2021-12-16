import React from 'react';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { Box, Fields } from '@platform/ui';
import css from './styles.scss';

export const Email: React.FC = () => (
  <Box className={css.email}>
    <Fields.Text extraSmall name={FORM_FIELDS.EMAIL} />
  </Box>
);

Email.displayName = 'Email';
