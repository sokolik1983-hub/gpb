import React from 'react';
import { debitParamsOptions } from 'pages/form/client/interfaces/debit-params';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { noop } from 'utils';
import { Fields } from '@platform/ui';

export const DebitParams: React.FC = () => {
  const handleDebitParamsChange = noop;

  return (
    <Fields.CheckboxGroup
      extraSmall
      columns={12}
      indent="MD"
      name={FORM_FIELDS.DEBIT_PARAMS}
      options={debitParamsOptions}
      onChange={handleDebitParamsChange}
    />
  );
};

DebitParams.displayName = 'DebitParams';
