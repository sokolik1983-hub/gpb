import React from 'react';
import { locale } from 'localization';
import { Row } from 'pages/form/client/components/row';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { Box, Fields } from '@platform/ui';
import css from './styles.scss';

export const Email: React.FC = () => (
  <Row label={locale.common.email.label}>
    <Box className={css.email}>
      <Fields.Text extraSmall name={FORM_FIELDS.EMAIL} />
    </Box>
  </Row>
);

Email.displayName = 'Email';
