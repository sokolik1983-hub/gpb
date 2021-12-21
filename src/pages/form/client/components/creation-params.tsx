import React from 'react';
import { locale } from 'localization';
import { Row } from 'pages/form/client/components/row';
import { useCreationParams } from 'pages/form/client/hooks/use-creation-params';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { Fields } from '@platform/ui';

export const CreationParams: React.FC = () => {
  const [value, options] = useCreationParams();

  return (
    <Row label={locale.common.creationParams.label}>
      <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FORM_FIELDS.CREATION_PARAMS} options={options} value={value} />
    </Row>
  );
};

CreationParams.displayName = 'CreationParams';
