import React from 'react';
import { Row } from 'components/form/row';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { Box, Fields } from '@platform/ui';
import css from './styles.scss';

/** Компонент ввода электронной почты. */
export const Email: React.FC = () => (
  <Row label={locale.common.email.label}>
    <Box className={css.email}>
      <Fields.Text extraSmall name={FORM_FIELDS.EMAIL} />
    </Box>
  </Row>
);

Email.displayName = 'Email';
