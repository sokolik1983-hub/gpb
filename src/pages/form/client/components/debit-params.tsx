import React, { useContext, useEffect, useRef } from 'react';
import { defaultDebitParamsOptions } from 'pages/form/client/interfaces/debit-params';
import { FormContext } from 'pages/form/client/interfaces/form-context';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { useForm } from 'react-final-form';
import type { ICheckboxOption } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Компонент дебетового комплекта документов. */
export const DebitParams: React.FC = () => {
  const { change } = useForm();
  const options = useRef<ICheckboxOption[]>([]);
  const { onlyRequestsStatement, withSign } = useContext(FormContext);

  useEffect(() => {
    options.current = defaultDebitParamsOptions.reduce<ICheckboxOption[]>((acc, x) => {
      acc.push({ ...x, disabled: onlyRequestsStatement || withSign });

      return acc;
    }, []);
  }, [change, withSign, onlyRequestsStatement]);

  return <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FORM_FIELDS.DEBIT_PARAMS} options={options.current} />;
};

DebitParams.displayName = 'DebitParams';
