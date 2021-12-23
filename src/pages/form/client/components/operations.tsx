import React from 'react';
import { locale } from 'localization';
import { Row } from 'pages/form/client/components/row';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { operationOptions } from 'pages/form/client/interfaces/operation';
import { Fields } from '@platform/ui';

/** Компонент выбора допустимой операции. */
export const Operations: React.FC = () => (
  <Row label={locale.common.operations.label}>
    <Fields.SwitchBar extraSmall name={FORM_FIELDS.OPERATION} options={operationOptions} />
  </Row>
);

Operations.displayName = 'Operations';
