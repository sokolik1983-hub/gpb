import React from 'react';
import { useCreditParams } from 'pages/form/client/hooks/use-credit-params';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { Fields } from '@platform/ui';

export const CreditParams: React.FC = () => {
  const [options] = useCreditParams();

  return <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FORM_FIELDS.CREDIT_PARAMS} options={options} />;
};

CreditParams.displayName = 'CreditParams';
