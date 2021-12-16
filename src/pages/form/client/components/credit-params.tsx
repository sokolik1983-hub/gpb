import React from 'react';
import { creditParamsOptions } from 'pages/form/client/interfaces/credit-params';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { noop } from 'utils';
import { Fields } from '@platform/ui';

export const CreditParams: React.FC = () => {
  const handleCreditParamsChange = noop;

  return (
    <Fields.CheckboxGroup
      extraSmall
      columns={12}
      indent="MD"
      name={FORM_FIELDS.CREDIT_PARAMS}
      options={creditParamsOptions}
      onChange={handleCreditParamsChange}
    />
  );
};

CreditParams.displayName = 'CreditParams';
