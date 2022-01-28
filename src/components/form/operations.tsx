import React from 'react';
import { Row } from 'components/form/row';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { operationOptions } from 'interfaces/form/operation';
import { locale } from 'localization';
import { Fields } from '@platform/ui';

/** Компонент выбора допустимой операции. */
export const Operations: React.FC = () => (
  <Row label={locale.common.operations.label}>
    <Fields.SwitchBar extraSmall name={FORM_FIELDS.OPERATION} options={operationOptions} />
  </Row>
);

Operations.displayName = 'Operations';
