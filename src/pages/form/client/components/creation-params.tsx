import React from 'react';
import { useCreationParams } from 'pages/form/client/hooks/use-creation-params';
import { defaultCreationParamsOptions } from 'pages/form/client/interfaces/creation-params';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { Fields } from '@platform/ui';

export const CreationParams: React.FC = () => {
  const [value, options] = useCreationParams(defaultCreationParamsOptions);

  return <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FORM_FIELDS.CREATION_PARAMS} options={options} value={value} />;
};

CreationParams.displayName = 'CreationParams';
