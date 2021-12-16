import React from 'react';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { operationOptions } from 'pages/form/client/interfaces/operation';
import { noop } from 'utils';
import { Fields } from '@platform/ui';

export const Operations: React.FC = () => {
  const handleChangeOperation = noop;

  return <Fields.SwitchBar extraSmall name={FORM_FIELDS.OPERATION} options={operationOptions} onChange={handleChangeOperation} />;
};

Operations.displayName = 'Operations';
