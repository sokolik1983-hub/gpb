import React from 'react';
import { Row } from 'components/form/row';
import { locale } from 'localization';
import { FORM_FIELDS, operationOptions } from 'stream-constants/form';
import { Fields } from '@platform/ui';

/** Компонент выбора допустимой операции. */
export const Operations: React.FC = () => (
  <Row label={locale.common.operations.label}>
    <Fields.SwitchBar extraSmall name={FORM_FIELDS.OPERATION} options={operationOptions} />
  </Row>
);

Operations.displayName = 'Operations';
