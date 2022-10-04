import React from 'react';
import { Row } from 'components/common/form/row';
import { locale } from 'localization';
import { FORM_FIELDS, operationOptions } from 'stream-constants/form';
import { Fields } from '@platform/ui';

/** Свойства компонента выбора допустимой операции. */
interface OperationsProps {
  /** Блокировка редактирования значений. */
  disabled?: boolean;
}

/** Компонент выбора допустимой операции. */
export const Operations: React.FC<OperationsProps> = ({ disabled }) => (
  <Row label={locale.common.operations.label}>
    <Fields.SwitchBar extraSmall disabled={disabled} name={FORM_FIELDS.OPERATION} options={operationOptions} />
  </Row>
);

Operations.displayName = 'Operations';
