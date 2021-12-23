import React from 'react';
import { useDebitParams } from 'pages/form/client/hooks/use-debit-params';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { Fields } from '@platform/ui';

/** Компонент дебетового комплекта документов. */
export const DebitParams: React.FC = () => {
  const [options] = useDebitParams();

  return <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FORM_FIELDS.DEBIT_PARAMS} options={options} />;
};

DebitParams.displayName = 'DebitParams';
